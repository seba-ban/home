package main

import (
	"context"
	"errors"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"

	pb "home/proto"

	"github.com/gin-gonic/gin"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

type server struct {
	pb.UnimplementedTagsServiceServer
}

func Hello(name string) string {
	result := "Hello " + name
	return result
}

func getTags(ids *[]int32) (error, []*pb.Tag) {
	conn, err := grpc.Dial("localhost:"+fmt.Sprint(50051), grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()
	c := pb.NewTagsServiceClient(conn)

	// Contact the server and print out its response.
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	r, err := c.GetTags(ctx, &pb.GetTagsRequest{TagIds: *ids})
	if err != nil {
		// log.Fatalf("could not greet: %v", err)
		return err, nil
	}
	if len(r.GetTags()) > 0 {
		return nil, r.GetTags()
	}

	return errors.New("tags not found"), nil
}

func main() {
	r := gin.Default()

	r.GET("/tags", func(c *gin.Context) {
		_ids := c.QueryArray("ids")
		if len(_ids) == 0 {
			c.AbortWithStatus(http.StatusBadRequest)
			return
		}
		ids := make([]int32, len(_ids))

		for i, val := range _ids {
			intVar, err := strconv.ParseInt(val, 10, 32)
			if err != nil {
				c.AbortWithStatus(http.StatusBadRequest)
				return
			}
			ids[i] = int32(intVar)
		}

		err, tags := getTags(&ids)

		if err != nil {
			c.AbortWithStatus(http.StatusNotFound)
			return
		}

		c.JSON(http.StatusOK, tags)
	})

	r.Run()
}
