/* eslint-disable */
import {
  CallOptions,
  ChannelCredentials,
  ChannelOptions,
  Client,
  ClientUnaryCall,
  handleUnaryCall,
  makeGenericClientConstructor,
  Metadata,
  ServiceError,
  UntypedServiceImplementation,
} from "@grpc/grpc-js";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "tags";

export interface Tag {
  id: number;
  name: string;
  description: string;
}

export interface GetTagsRequest {
  tagIds: number[];
}

export interface GetTagsResponse {
  tags: Tag[];
}

function createBaseTag(): Tag {
  return { id: 0, name: "", description: "" };
}

export const Tag = {
  encode(message: Tag, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Tag {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTag();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.int32();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.description = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<Tag, Uint8Array>
  async *encodeTransform(source: AsyncIterable<Tag | Tag[]> | Iterable<Tag | Tag[]>): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [Tag.encode(p).finish()];
        }
      } else {
        yield* [Tag.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, Tag>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<Tag> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [Tag.decode(p)];
        }
      } else {
        yield* [Tag.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): Tag {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      name: isSet(object.name) ? String(object.name) : "",
      description: isSet(object.description) ? String(object.description) : "",
    };
  },

  toJSON(message: Tag): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Tag>, I>>(object: I): Tag {
    const message = createBaseTag();
    message.id = object.id ?? 0;
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    return message;
  },
};

function createBaseGetTagsRequest(): GetTagsRequest {
  return { tagIds: [] };
}

export const GetTagsRequest = {
  encode(message: GetTagsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    writer.uint32(10).fork();
    for (const v of message.tagIds) {
      writer.int32(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetTagsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetTagsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.tagIds.push(reader.int32());
            }
          } else {
            message.tagIds.push(reader.int32());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<GetTagsRequest, Uint8Array>
  async *encodeTransform(
    source: AsyncIterable<GetTagsRequest | GetTagsRequest[]> | Iterable<GetTagsRequest | GetTagsRequest[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [GetTagsRequest.encode(p).finish()];
        }
      } else {
        yield* [GetTagsRequest.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, GetTagsRequest>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<GetTagsRequest> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [GetTagsRequest.decode(p)];
        }
      } else {
        yield* [GetTagsRequest.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): GetTagsRequest {
    return { tagIds: Array.isArray(object?.tagIds) ? object.tagIds.map((e: any) => Number(e)) : [] };
  },

  toJSON(message: GetTagsRequest): unknown {
    const obj: any = {};
    if (message.tagIds) {
      obj.tagIds = message.tagIds.map((e) => Math.round(e));
    } else {
      obj.tagIds = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetTagsRequest>, I>>(object: I): GetTagsRequest {
    const message = createBaseGetTagsRequest();
    message.tagIds = object.tagIds?.map((e) => e) || [];
    return message;
  },
};

function createBaseGetTagsResponse(): GetTagsResponse {
  return { tags: [] };
}

export const GetTagsResponse = {
  encode(message: GetTagsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.tags) {
      Tag.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetTagsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetTagsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tags.push(Tag.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<GetTagsResponse, Uint8Array>
  async *encodeTransform(
    source: AsyncIterable<GetTagsResponse | GetTagsResponse[]> | Iterable<GetTagsResponse | GetTagsResponse[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [GetTagsResponse.encode(p).finish()];
        }
      } else {
        yield* [GetTagsResponse.encode(pkt).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, GetTagsResponse>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<GetTagsResponse> {
    for await (const pkt of source) {
      if (Array.isArray(pkt)) {
        for (const p of pkt) {
          yield* [GetTagsResponse.decode(p)];
        }
      } else {
        yield* [GetTagsResponse.decode(pkt)];
      }
    }
  },

  fromJSON(object: any): GetTagsResponse {
    return { tags: Array.isArray(object?.tags) ? object.tags.map((e: any) => Tag.fromJSON(e)) : [] };
  },

  toJSON(message: GetTagsResponse): unknown {
    const obj: any = {};
    if (message.tags) {
      obj.tags = message.tags.map((e) => e ? Tag.toJSON(e) : undefined);
    } else {
      obj.tags = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetTagsResponse>, I>>(object: I): GetTagsResponse {
    const message = createBaseGetTagsResponse();
    message.tags = object.tags?.map((e) => Tag.fromPartial(e)) || [];
    return message;
  },
};

export type TagsServiceService = typeof TagsServiceService;
export const TagsServiceService = {
  getTags: {
    path: "/tags.TagsService/GetTags",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetTagsRequest) => Buffer.from(GetTagsRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetTagsRequest.decode(value),
    responseSerialize: (value: GetTagsResponse) => Buffer.from(GetTagsResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GetTagsResponse.decode(value),
  },
} as const;

export interface TagsServiceServer extends UntypedServiceImplementation {
  getTags: handleUnaryCall<GetTagsRequest, GetTagsResponse>;
}

export interface TagsServiceClient extends Client {
  getTags(
    request: GetTagsRequest,
    callback: (error: ServiceError | null, response: GetTagsResponse) => void,
  ): ClientUnaryCall;
  getTags(
    request: GetTagsRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GetTagsResponse) => void,
  ): ClientUnaryCall;
  getTags(
    request: GetTagsRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GetTagsResponse) => void,
  ): ClientUnaryCall;
}

export const TagsServiceClient = makeGenericClientConstructor(TagsServiceService, "tags.TagsService") as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ChannelOptions>): TagsServiceClient;
  service: typeof TagsServiceService;
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
