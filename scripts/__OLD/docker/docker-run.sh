#!/bin/bash

set -x

docker rm -f sbpro-node;

docker run -d \
    --name sbpro-node \
    --env-file ".env" \
    -e "TYPE_ORM_HOST=host.docker.internal" \
    -p 8200:8200 \
    sbpro-node:latest

# docker rm -f sbpro-node;
# docker run -d \
#     --name sbpro-node \
#     --env-file "./.env" \
#     -p 8200:8200 \
#     sbpro-node:latest sh -c "tail -f /etc/hosts"

# docker exec -it sbpro-node bash
