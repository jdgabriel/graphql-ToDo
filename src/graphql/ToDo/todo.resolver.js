const { withFilter } = require('apollo-server');
const data = require('lodash');

const TODO_SUBSCRIBE = 'TODO_SUBSCRIBE';

const Todo = [];

module.exports = {
	Query: {
		todos: (parent, args, ctx, info) => Todo
	},
	Mutation: {
		newTodo: (parent, args, { pubsub }, info) => {
			const { task, complete } = args.data;

			// new Todo
			const added = {
				mutation: 'CREATED',
				node: {
					id: Math.random()
						.toString(36)
						.substr(2, 9),
					task,
					complete
				}
			};

			// Push Todo
			Todo.push(added.node);

			// Publish Insert
			pubsub.publish(TODO_SUBSCRIBE, { todo: added });
			return added;
		},
		editTodo: (parent, args, { pubsub }, info) => {
			const {
				fields: { task, complete },
				where: { id }
			} = args;

			// Find by ID
			const edit = data.find(Todo, { id });

			// update
			edit.task = task;
			edit.complete = complete;

			const updated = {
				mutation: 'UPDATED',
				node: edit
			};

			// Publish Update
			pubsub.publish(TODO_SUBSCRIBE, { todo: updated });
			console.log('edit', edit);
			return updated;
		},
		removeTodo: (parent, args, { pubsub }, info) => {
			const {
				where: { id }
			} = args;

			// Find and Remove
			data.remove(Todo, todos => {
				return todos.id === id;
			});

			return true;
		}
	},
	Subscription: {
		todo: {
			subscribe: withFilter(
				(parent, args, { pubsub }, info) =>
					pubsub.asyncIterator(TODO_SUBSCRIBE),
				(payload, variables) => {
					return payload.todo.mutation === variables.mutation;
				}
			)
		}
	}
};
