#!/bin/bash
# starts docker container on server

location=$1
version=$2

if [ $location == "local" ]; then
    echo "Starting local docker container..."
    docker run -d --env-file ./docker.env -p 8081:8081 -v $(pwd)/files:/files wordfun:latest
    exit 0
else 
    echo "Starting remote docker container..."
    docker load --input wordfun_$version.tar.gz
    docker run -d --env-file ./docker.env --net=host -v $(pwd)/files:/files wordfun:$version
    exit 0
fi
