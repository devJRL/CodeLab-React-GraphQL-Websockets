# GraphQL Server

## Settings

```bash
# init project
mkdir server && cd server
yarn init -y

# add dependency
yarn add graphql-yoga
```

```json
// package.json
{
  "name": "server",
  "version": "1.0.0",
  "main": "server.js",
  "license": "MIT",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "graphql-yoga": "^1.18.3"
  }
}
```
