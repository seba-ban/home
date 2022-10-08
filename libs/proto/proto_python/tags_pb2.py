"""Generated protocol buffer code."""
from google.protobuf.internal import builder as _builder
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
_sym_db = _symbol_database.Default()
DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\ntags.proto\x12\x04tags"4\n\x03Tag\x12\n\n\x02id\x18\x01 \x01(\x05\x12\x0c\n\x04name\x18\x02 \x01(\t\x12\x13\n\x0bdescription\x18\x03 \x01(\t" \n\x0eGetTagsRequest\x12\x0e\n\x06tagIds\x18\x01 \x03(\x05"*\n\x0fGetTagsResponse\x12\x17\n\x04tags\x18\x01 \x03(\x0b2\t.tags.Tag2G\n\x0bTagsService\x128\n\x07GetTags\x12\x14.tags.GetTagsRequest\x1a\x15.tags.GetTagsResponse"\x00B%Z#github.com/seba-ban/home/proto/tagsb\x06proto3')
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'tags_pb2', globals())
if _descriptor._USE_C_DESCRIPTORS == False:
    DESCRIPTOR._options = None
    DESCRIPTOR._serialized_options = b'Z#github.com/seba-ban/home/proto/tags'
    _TAG._serialized_start = 20
    _TAG._serialized_end = 72
    _GETTAGSREQUEST._serialized_start = 74
    _GETTAGSREQUEST._serialized_end = 106
    _GETTAGSRESPONSE._serialized_start = 108
    _GETTAGSRESPONSE._serialized_end = 150
    _TAGSSERVICE._serialized_start = 152
    _TAGSSERVICE._serialized_end = 223