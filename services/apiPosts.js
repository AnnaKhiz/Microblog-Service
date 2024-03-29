const { Post, User, Comment, ObjectId } = require('../db');
const { verifyJwt } = require('../utils/auth');
const { JWTKEY } = require('../config/default');

async function getPosts(req, res, next) {
	const { token } = req.cookies;
	const posts = await Post.find();

	if (token) {
		const { userId: id } = await verifyJwt(token, JWTKEY);
		res.status(200).send({ id, posts });

	} else {
		res.status(200).send({ posts });
	}
}

async function getPostsId(req, res, next) {
	const { token } = req.cookies;
	const { userId: id } = await verifyJwt(token, JWTKEY);
	const posts = await Post.find().find( { author: new ObjectId(id)}).populate('author');
	res.render('index', { id, posts });
}

async function addNewPost(req, res, next) {
	const { body: post } = req;

	const { token } = req.cookies;
	const { userId: id } = verifyJwt(token, JWTKEY);
	post.author = new ObjectId(id);

	const user = User.find( { _id: new ObjectId(id) });

	const newPost = await new Post(post);
	const result = await newPost.save();

	res.status(201).redirect(`/`);
}

async function deleteOnePost(req, res, next) {
	const { date: postDate } = req.params;

	const { token } = req.cookies;
	const { userId: authorId, role } = await verifyJwt(token, JWTKEY);

	if (role === 'admin') {
		try {
			const deletedPost = await Post.findOneAndDelete( { date: postDate} );
			checkExistingPost( deletedPost , res)
		} catch (error) {
			res.status(404).send({"result": "Post did not found"});
		}

	} else {
		try {
			const deletedPost = await Post.findOneAndDelete( { date: postDate, author: new ObjectId(authorId)} );
			checkExistingPost( deletedPost , res)

		} catch (error) {
			res.status(404).send({"result": "Post did not found"});
		}
	}
}

async function checkExistingPost( deletedPost, res ) {
	if (deletedPost == '' || deletedPost == undefined) {
		res.status(404).send({"result": "Post did not found"});
	}
	res.status(200).send({"result": "Post was deleted successfully"});
}

async function updateOnePost(req, res, next) {
	const { body: post } = req;

	try {
		const updatedPost = await Post.findOneAndUpdate(
			{ _id: new ObjectId(post.id)},
			{ name: post.name, description: post.description}
		);

		if (!updatedPost) {
			res.status(404).send({"result": "Post did not found"});
		}

		res.status(200).send({"result": "Post was updated successfully"})

	} catch (error) {
		res.status(404).send({"result": "Post did not found"});
	}
}

module.exports = {
	getPosts,
	getPostsId,
	addNewPost,
	deleteOnePost,
	updateOnePost
}
