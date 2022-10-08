"""Client and server classes corresponding to protobuf-defined services."""
import grpc
from . import tags_pb2 as tags__pb2

class TagsServiceStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.GetTags = channel.unary_unary('/tags.TagsService/GetTags', request_serializer=tags__pb2.GetTagsRequest.SerializeToString, response_deserializer=tags__pb2.GetTagsResponse.FromString)

class TagsServiceServicer(object):
    """Missing associated documentation comment in .proto file."""

    def GetTags(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

def add_TagsServiceServicer_to_server(servicer, server):
    rpc_method_handlers = {'GetTags': grpc.unary_unary_rpc_method_handler(servicer.GetTags, request_deserializer=tags__pb2.GetTagsRequest.FromString, response_serializer=tags__pb2.GetTagsResponse.SerializeToString)}
    generic_handler = grpc.method_handlers_generic_handler('tags.TagsService', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))

class TagsService(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def GetTags(request, target, options=(), channel_credentials=None, call_credentials=None, insecure=False, compression=None, wait_for_ready=None, timeout=None, metadata=None):
        return grpc.experimental.unary_unary(request, target, '/tags.TagsService/GetTags', tags__pb2.GetTagsRequest.SerializeToString, tags__pb2.GetTagsResponse.FromString, options, channel_credentials, insecure, call_credentials, compression, wait_for_ready, timeout, metadata)