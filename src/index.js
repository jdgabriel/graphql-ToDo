const server = require('./server');

// The `listen` method launches a web server.
server.listen().then(({ url, subscriptionsUrl }) => {
	console.log(`Server ready at ${url}`);
	console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});
