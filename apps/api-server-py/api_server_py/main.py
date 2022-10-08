import grpc
from fastapi import FastAPI, Query, HTTPException, status
from proto_python.tags_pb2 import Tag, GetTagsRequest, GetTagsResponse
from proto_python.tags_pb2_grpc import TagsServiceStub

app = FastAPI()


def tag_to_dict(tag: Tag):
    return dict(
        name=tag.name,
        id=tag.id,
        description=tag.description,
    )

@app.get("/tags")
async def get_tags(
    ids: list[int] = Query([], description="tag ids")
):
    if not ids:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)
    
    async with grpc.aio.insecure_channel("localhost:50050") as channel:
        stub = TagsServiceStub(channel)

        try:
            res: GetTagsResponse = await stub.GetTags(GetTagsRequest(tagIds=ids))
            return [tag_to_dict(t) for t in res.tags]
        except grpc.aio.AioRpcError as err:
            print(err.code())
            if err.code() == grpc.StatusCode.NOT_FOUND:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)