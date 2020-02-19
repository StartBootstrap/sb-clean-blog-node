FROM node:12.13.0-stretch
EXPOSE 8200

WORKDIR /usr/app

ENV NODE_PATH /usr/app/dist/lib
ENV PORT 8200

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

RUN echo "deb http://security.debian.org/debian-security stretch/updates main" > /etc/apt/sources.security.only.list \
  && apt-get -y update -o Dir::Etc::SourceList=/etc/apt/sources.security.only.list -o Dir::Etc::Parts=/dev/null \
  && apt-get -y upgrade -o Dir::Etc::SourceList=/etc/apt/sources.security.only.list -o Dir::Etc::Parts=/dev/null

COPY .npmrc /usr/app/
COPY package.json /usr/app/
RUN npm install

COPY ormconfig.ts /usr/app/
COPY scripts /usr/app/scripts

COPY src/migrations /usr/app/src
COPY dist /usr/app/dist

CMD ["node", "dist/index.js"]
