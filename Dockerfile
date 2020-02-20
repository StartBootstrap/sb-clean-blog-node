FROM node:12.16.1-stretch
EXPOSE 80

WORKDIR /usr/app

ENV NODE_PATH /usr/app/dist/lib
ENV PORT 80

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

RUN echo "deb http://security.debian.org/debian-security stretch/updates main" > /etc/apt/sources.security.only.list \
  && apt-get -y update -o Dir::Etc::SourceList=/etc/apt/sources.security.only.list -o Dir::Etc::Parts=/dev/null \
  && apt-get -y upgrade -o Dir::Etc::SourceList=/etc/apt/sources.security.only.list -o Dir::Etc::Parts=/dev/null

COPY package.json /usr/app/
RUN npm install

COPY ormconfig.ts /usr/app/
COPY tsconfig.json /usr/app/
COPY scripts /usr/app/scripts

COPY src /usr/app/src

CMD ["npm", "run", "start"]
