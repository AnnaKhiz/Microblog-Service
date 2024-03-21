const { Post, User } = require('../db');

async function getPosts(req,res, next) {
	const { id } = req.cookie;

	const posts = await Post.find();

	resp.render('index', { id, posts });
}

function getPostsId() {

}

async function addNewPost(req,res,next) {

	const { body: metaData } = req;
	const newPost = await new Post(metaData)
	const result = await newPost.save()

	res.status(201).send(result);
	return result
}

function deleteOnePost() {

}

module.exports = {
	getPosts,
	getPostsId,
	addNewPost,
	deleteOnePost
}
