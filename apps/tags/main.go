package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"net"

	pb "home/proto"

	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var (
	port = flag.Int("port", 50051, "The server port")
)

var db *gorm.DB

type TagDb struct {
	gorm.Model
	Name        string
	Description string
}

type server struct {
	pb.UnimplementedTagsServiceServer
}

func (s *server) GetTags(ctx context.Context, req *pb.GetTagsRequest) (*pb.GetTagsResponse, error) {
	var tags []TagDb

	db.Where("id IN ?", req.GetTagIds()).Find(&tags)

	if len(tags) == 0 {
		return nil, status.Error(codes.NotFound, "tags not found")
	}

	foundTags := make([]*pb.Tag, len(tags))
	for i, tag := range tags {
		foundTags[i] = &pb.Tag{Id: int32(tag.ID), Name: tag.Name, Description: tag.Description}
	}

	return &pb.GetTagsResponse{Tags: foundTags}, nil
}

func main() {

	dsn := "host=localhost user=postgres password=secret dbname=postgres port=5432 sslmode=disable"
	_db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	db = _db

	db.AutoMigrate(&TagDb{})

	// Create
	db.Create(&TagDb{Name: "funny", Description: "funny stuf"})
	db.Create(&TagDb{Name: "sad", Description: "sad face"})
	db.Create(&TagDb{Name: "xxx", Description: "shhh..."})

	flag.Parse()
	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", *port))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterTagsServiceServer(s, &server{})
	log.Printf("server listening at %v", lis.Addr())

	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
