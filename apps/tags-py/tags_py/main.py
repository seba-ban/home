from typing import Optional
from sqlmodel import Field, SQLModel, create_engine, select
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from proto_python.tags_pb2 import Tag, GetTagsRequest, GetTagsResponse
from proto_python.tags_pb2_grpc import add_TagsServiceServicer_to_server, TagsServiceServicer
import grpc
import logging
import asyncio
from sqlalchemy.orm import sessionmaker

class TagDb(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    description: str

engine = create_async_engine(
    "postgresql+asyncpg://postgres:secret@localhost:5432/postgres",
    echo=True,
)
async_session = sessionmaker(engine, class_=AsyncSession)


class Servicer(TagsServiceServicer):
    async def GetTags(
        self, request: GetTagsRequest, context: grpc.aio.ServicerContext
    ) -> GetTagsResponse:
        async with async_session() as session:
            assert isinstance(session, AsyncSession)
            query = await session.execute(select(TagDb).where(TagDb.id.in_(request.tagIds)))
            res = GetTagsResponse(
                tags=[
                    Tag(
                        id=t.id,
                        name=t.name,
                        description=t.description,
                    ) 
                    for (t,) in query
                ]
            )
            if len(res.tags) == 0:
                await context.abort(
                    code=grpc.StatusCode.NOT_FOUND,
                    details="tags not found",
                )
            return res


async def serve() -> None:

    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)

    async with async_session() as session:
        assert isinstance(session, AsyncSession)
        for d in (
            { 'name': 'funny', 'description': 'funny stuf' },
            { 'name': 'sad', 'description': 'sad face' },
            { 'name': 'xxx', 'description': 'shhh...' },
        ):
            session.add(TagDb(**d))
        await session.commit()

    server = grpc.aio.server()
    add_TagsServiceServicer_to_server(Servicer(), server)
    listen_addr = "[::]:50050"
    server.add_insecure_port(listen_addr)
    logging.info("Starting server on %s", listen_addr)
    await server.start()
    await server.wait_for_termination()
    await engine.dispose()


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    asyncio.run(serve())