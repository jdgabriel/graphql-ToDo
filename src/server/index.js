const { ApolloServer, PubSub } = require('apollo-server');
const { typeDefs, resolvers } = require('../graphql');

const pubsub = new PubSub();

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: () => {
		return {
			pubsub
		};
	}
});

module.exports = server;
