PROTO_DIR := proto
GEN_PATH := code
GEN_PATH_GO := proto_go
GEN_PATH_PYTHON := proto_python
GEN_PATH_TS := proto_typescript

# TODO: add cleanup before regenerating

# .PHONY: generate
# generate: generate-go generate-python generate-ts

# # https://developers.google.com/protocol-buffers/docs/reference/go-generated
.PHONY: generate-go
generate-go:
	PATH="${PATH}:$(shell go env GOPATH)/bin" protoc \
		-I=$(PROTO_DIR) \
		--go_out=$(GEN_PATH_GO) \
		--go_opt=paths=source_relative \
		--go-grpc_out=$(GEN_PATH_GO) \
		--go-grpc_opt=paths=source_relative \
		$(PROTO_DIR)/*.proto

.PHONY: generate-python
generate-python:
	PATH="${PATH}:$(shell go env GOPATH)/bin" protoc \
		-I=$(PROTO_DIR) \
		--pyi_out=$(GEN_PATH_PYTHON) \
		--python_out=$(GEN_PATH_PYTHON) \
		$(PROTO_DIR)/*.proto

	poetry run python -m grpc_tools.protoc \
		-I=$(PROTO_DIR) \
		--grpc_python_out=$(GEN_PATH_PYTHON) \
		$(PROTO_DIR)/*.proto

	poetry run protol \
		--create-package \
		--in-place \
		--python-out $(GEN_PATH_PYTHON) \
		protoc --proto-path=$(PROTO_DIR) $(PROTO_DIR)/*.proto


# # downside is that we have to load the proto
# .PHONY: old-generate-ts
# old-generate-ts: clear-ts
# 	npx proto-loader-gen-types \
# 		--longs=String \
# 		--enums=String \
# 		--defaults \
# 		--oneofs \
# 		--grpcLib=@grpc/grpc-js \
# 		--outDir=$(GEN_PATH_TS) \
# 		$(PROTO_DIR)/*.proto

# # TODO: try out nest with grpc to use async natively...
.PHONY: generate-ts
generate-ts:
	protoc \
		-I=$(PROTO_DIR) \
		--plugin=../../node_modules/.bin/protoc-gen-ts_proto \
		--ts_proto_out=$(GEN_PATH_TS) \
		--ts_proto_opt=env=node \
		--ts_proto_opt=outputServices=grpc-js \
		--ts_proto_opt=useAsyncIterable=true \
		$(PROTO_DIR)/*.proto

# # https://grpc.io/docs/languages/go/quickstart/#prerequisites
# .PHONY: protoc-go-install
# protoc-go-install:
# 	go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.28
# 	go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.2