FROM node:12.16.1-stretch
EXPOSE 80

WORKDIR /usr/app

ENV PORT 80

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

RUN echo "deb http://security.debian.org/debian-security stretch/updates main" > /etc/apt/sources.security.only.list \
  && apt-get -y update -o Dir::Etc::SourceList=/etc/apt/sources.security.only.list -o Dir::Etc::Parts=/dev/null \
  && apt-get -y upgrade -o Dir::Etc::SourceList=/etc/apt/sources.security.only.list -o Dir::Etc::Parts=/dev/null

COPY package.json /usr/app/
RUN npm install

COPY ormconfig.ts /usr/app/
COPY scripts /usr/app/scripts

COPY src/migrations /usr/app/src
COPY build /usr/app/build

CMD ["node", "build/sb-clean-blog-node.js"]
