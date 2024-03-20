const { DBURL } = require('../config/default');
const { MongoClient, ObjectId } = require('mongodb');
const client = new MongoClient(DBURL);

async function init() {
	try {
		await client.connect();
		console.log('Mongo DB connected');
	} catch (error) {
		console.log('Mongo DB did not connected');
		console.log(error);
		process.exit(1);
	}
}

module.exports = {
	init
}