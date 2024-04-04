const { Post, User, ObjectId } = require('../db');

async function getPosts(req, res) {
	const posts = await Post.find();
	const { userId: id } = req._auth;

	id ? res.status(200).send({ id, posts }) : res.status(200).send({ posts });
}

async function getPostsByAuthorId(req, res) {
	const { userId: id } = req._auth;

	const posts = await Post.find().find( { author: new ObjectId(id)}).populate('author');
	res.render('index', { id, posts });
}

async function addNewPost(req, res) {
	const { body: post } = req;

	const { userId: id } = req._auth;
	const newPost = await new Post({
		...post,
		author: new ObjectId(id),
		date: Date.now().toString(),
		comments: []
	});

	await User.findOne( { _id: new ObjectId(id) });

	const result = await newPost.save();

	await User.findOneAndUpdate({ _id: new ObjectId(id) } , { $push: { posts: new ObjectId(result._id) }}, { new: true });

	res.status(201).redirect(`/user_home/${id}`);
}

async function deleteOnePost(req, res) {
	const { id } = req.params;

	const result = await Post.findOneAndDelete( { _id: new ObjectId(id)} );

	!result
		? res.status(404).send({ 'result': 'Post not found' })
		: res.status(200).send({ 'result': 'Post was deleted successfully' });
}

async function updateOnePost(req, res) {
	const { body: post } = req;

	try {
		const updatedPost = await Post.findOneAndUpdate(
			{ _id: new ObjectId(post.id)},
			{ name: post.name, description: post.description}
		);

		!updatedPost
			? res.status(404).send({'result': 'Post did not found'})
			: res.status(200).send({'result': 'Post was updated successfully'});

	} catch (error) {
		res.status(404).send({'result': 'Post did not found'});
	}
}

module.exports = {
	getPosts,
	getPostsByAuthorId,
	addNewPost,
	deleteOnePost,
	updateOnePost
};
