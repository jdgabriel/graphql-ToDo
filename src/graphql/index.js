const path = require('path');
const {
	fileLoader,
	mergeTypes,
	mergeResolvers
} = require('merge-graphql-schemas');

const typeDefs = mergeTypes(
	fileLoader(path.join(__dirname, './**/*.gql'), { recursive: true }),
	{ all: true }
);

const resolvers = mergeResolvers(
	fileLoader(path.join(__dirname, './**/*.js'), { recursive: true }),
	{ all: true }
);

module.exports = {
	typeDefs,
	resolvers
};
