# GraphQL Subscription Coding

Basic GraphQL TODO, for study library graphql subscription

## Installation

```
git clone https://github.com/jdgabriel/graphql-ToDo
cd graphql-ToDo
yarn install
```

# Queries

### [Query] All Todo

```
query all {
  todos {
    id
    task
    complete
  }
}

```

##### Response

```javascript
{
	"data": {
		"todos": [
			{
				"id": "1",
				"task": "Read About graphql",
				"complete": true
			}
		]
	}
}
```

### [Mutation] Create a new Todo

##### Query

```
mutation new {
  newTodo(data: { task: "Buy Coffe", complete: false }) {
    mutation
    node {
      id
      task
      complete
    }
  }
}
```

##### Response

```json
{
	"data": {
		"newTodo": {
			"mutation": "CREATED",
			"node": {
				"id": "2",
				"task": "Buy Coffe",
				"complete": false
			}
		}
	}
}
```

### [Mutation] Edit Todo

Use id field for update Todo

##### Query

```
mutation edit {
  editTodo(
    fields: { task: "Bath in the cat", complete: true }
    where: { id: "1" }
  ) {
    mutation
    node {
      id
      task
      complete
    }
  }
}
```

##### Response

```javascript
{
	"data": {
		"editTodo": {
			"mutation": "UPDATED",
			"node": {
				"id": "2",
				"task": "Bath in the cat",
				"complete": true
			}
		}
	}
}
```

### [Mutation] Remove Todo

Use id field for update Todo

```
mutation remove {
  removeTodo(where: {id: "2"})
}
```

##### Response

```javascript
{
	"data": {
		"removeTodo": true
	}
}
```

# Subscriptions

Subscriptions are based on three nodes

- CREATED
- UPDATED
- REMOVED

```
subscription {
  todo(mutation: UPDATED) {
    mutation
    node {
      id
      task
      complete
    }
  }
}
```

##### Response

```javascript
{
  "data": {
    "todo": {
      "mutation": "UPDATED",
      "node": [...]
    }
  }
}
```

### License MIT

Gabriel Duarte
