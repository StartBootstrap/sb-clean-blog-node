#!/bin/bash
set -x

version=$(node -e "var pj=require('./package.json'); console.log(\`\${pj.version}\`)");

docker build \
    -t sbpro-node:latest \
    -t sbpro-node:$version \
    .