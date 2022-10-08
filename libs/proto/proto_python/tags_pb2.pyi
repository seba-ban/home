from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Iterable as _Iterable, Mapping as _Mapping, Optional as _Optional, Union as _Union
DESCRIPTOR: _descriptor.FileDescriptor

class GetTagsRequest(_message.Message):
    __slots__ = ['tagIds']
    TAGIDS_FIELD_NUMBER: _ClassVar[int]
    tagIds: _containers.RepeatedScalarFieldContainer[int]

    def __init__(self, tagIds: _Optional[_Iterable[int]]=...) -> None:
        ...

class GetTagsResponse(_message.Message):
    __slots__ = ['tags']
    TAGS_FIELD_NUMBER: _ClassVar[int]
    tags: _containers.RepeatedCompositeFieldContainer[Tag]

    def __init__(self, tags: _Optional[_Iterable[_Union[Tag, _Mapping]]]=...) -> None:
        ...

class Tag(_message.Message):
    __slots__ = ['description', 'id', 'name']
    DESCRIPTION_FIELD_NUMBER: _ClassVar[int]
    ID_FIELD_NUMBER: _ClassVar[int]
    NAME_FIELD_NUMBER: _ClassVar[int]
    description: str
    id: int
    name: str

    def __init__(self, id: _Optional[int]=..., name: _Optional[str]=..., description: _Optional[str]=...) -> None:
        ...