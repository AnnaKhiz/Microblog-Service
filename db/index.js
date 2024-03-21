const { DBURL } = require('../config/default');
const { MongoClient, ObjectId } = require('mongodb');
// const client = new MongoClient(DBURL);
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
	name: String,
	description: String,
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users'
	}
})

const UserSchema = new mongoose.Schema({
	login: String,
	password: String,
	posts: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'posts'
	}]
})

const Post = mongoose.model('posts', PostSchema);
const User = mongoose.model('users', UserSchema);

async function init() {
	try {
		// await client.connect();
		await mongoose.connect(DBURL, { dbName: 'microblogService' })
		console.log('Mongo DB connected');
	} catch (error) {
		console.log('Mongo DB did not connected');
		console.log(error);
		process.exit(1);
	}
}
init()

module.exports = {
	ObjectId,
	Post,
	User
}