const TODO_CREATED = 'TODO_CREATED';

const ToDo = [];

module.exports = {
	Query: {
		todos: (parent, args, ctx, info) => ToDo
	},
	Mutation: {
		newTodo: (parent, args, { pubsub }, info) => {
			const { task } = args.data;
			// Push Todo
			ToDo.push({ task, complete: false });

			// Publish Todo
			pubsub.publish(TODO_CREATED, { newTodoAdded: { task, complete: false } });

			return { task, complete: false };
		}
	},
	Subscription: {
		newTodoAdded: {
			subscribe: (parent, args, { pubsub }, info) =>
				pubsub.asyncIterator([TODO_CREATED])
		}
	}
};
