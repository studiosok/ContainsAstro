ARG NODE_VERSION=20.17.0

FROM node:${NODE_VERSION}-alpine
WORKDIR /app

COPY . .

RUN yarn install
RUN yarn build

EXPOSE 4000
ENTRYPOINT [ "node" ]
# Run the application.
CMD ["./dist/server/entry.mjs"]