const { ApolloServer } = require('apollo-server');
const { typeDefs, resolvers } = require('../graphql');

const server = new ApolloServer({ typeDefs, resolvers });

module.exports = server;
