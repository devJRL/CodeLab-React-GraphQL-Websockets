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

## Simple handling GraphQL

```bash
# Run GraphQL Server
yarn start
```


```sql
# [GQL-Q1] Connect on localhost:4000 then type this
query {
  messages {
  	id
  	content
    user
	}
}

# [GQL-R1] Then you can receive like this
{
  "data": {
    "messages": []
  }
}
```

```sql
# [GQL-Q2] Open another tab and type this again
mutation {
  postMessage(user: "devJRL", content: "Hello")
}
mutation {
  postMessage(user: "devJRL", content: "Hello")
}

# [GQL-Q1] Then you can receive like this
{
  "data": {
    "postMessage": "0" # then "1"
  }
}
```

```sql
# [GQL-Q3] Then in previous tab, you type this
query {
  messages {
  	id
  	content
    user
	}
}

# [GQL-R3] Then you can receive like this
{
  "data": {
    "messages": [
      {
        "id": "0",
        "content": "Hello world",
        "user": "devJRL"
      },
      {
        "id": "1",
        "content": "Goodbye",
        "user": "devJRL"
      }
    ]
  }
}
```

```sql
# [GQL-Q4] In new tab, we can subscribe messages!
subscription {
  messages {
    id
    user
    content
  }
}
```