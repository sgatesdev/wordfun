#!/bin/bash
#builds and compresses docker image for release

version=$1
docker build . -t wordfun:latest -t wordfun:$version --platform linux/amd64
echo "Saving docker image to ./docker_images/wordfun_$version.tar.gz..."
docker save wordfun:$version | gzip > ./docker_images/wordfun_$version.tar.gz
echo "Done!"


# cache version number
touch ./docker_images/version.txt
echo "Version: $version, Timestamp: $(date)" > ./docker_images/version.txt

# docker rmi $(docker images -q 'wordfun') -f