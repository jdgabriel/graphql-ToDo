const server = require('./server');

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
	console.log(`Server online at url:  ${url}`);
});
