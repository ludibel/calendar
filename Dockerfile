ARG NODE_VERSION=16

FROM node:${NODE_VERSION}-alpine AS node

ARG USER_ID
ARG GROUP_ID
ARG USERNAME="ludivine"
ARG GROUPNAME="ludivine"

RUN addgroup -g $GROUP_ID $GROUPNAME \
    && adduser -u $USER_ID -G $GROUPNAME -D $USERNAME

RUN apk add --no-cache \
    libc6-compat \
    git

USER $USERNAME

RUN git config --global user.email "test@test.com" \
    && git config --global user.name "test"

WORKDIR /app

EXPOSE 3000

ENV PORT 3000