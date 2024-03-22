const { DBURL } = require('../config/default');
const { MongoClient, ObjectId } = require('mongodb');
// const client = new MongoClient(DBURL);
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
	name: String,
	description: String,
	date: String,
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users'
	},
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'comments'
	}]
})

const UserSchema = new mongoose.Schema({
	login: String,
	password: String,
	posts: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'posts'
	}],
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'comments'
	}]
})

const CommentSchema = new mongoose.Schema({
	text: String,
	date: String,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users'
	},
	post: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'posts'
	}
})

const Post = mongoose.model('posts', PostSchema);
const User = mongoose.model('users', UserSchema);
const Comment = mongoose.model('comments', CommentSchema);

async function init() {
	try {
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
	User,
	Comment
}