const { Post, User, Comment, ObjectId } = require('../db');

async function getPosts(req, res, next) {
	const { id } = req.cookies;

	const posts = await Post.find().find( { author: new ObjectId(id)}).populate('author')
	console.log(posts)
	res.status(200).send({ id, posts })
	// res.render('index', { id, posts });
}

async function getPostsId(req, res, next) {
	const { id } = req.cookies;
	const posts = await Post.find().find( { author: new ObjectId(id)}).populate('author')
	console.log(posts)
	// if (!posts) {
	// 	res.send({"result": "No posts"})
	// }
	// posts.sort((a,b) => b.date.localeCompare(a.date))
	res.render('index', { id, posts });


}

// async function addNewPost(req, res, next) {
//
// 	const { body: metaData } = req;
// 	const newPost = await new Post(metaData)
// 	const result = await newPost.save()
//
// 	res.status(201).send(result);
// 	return result
// }


async function addNewPost(req, res, next) {
	const { body: post } = req;

	post.author = new ObjectId(res.cookie.id)

	console.log(post)
	const newPost = await new Post(post)
	const result = await newPost.save()

	res.status(201).redirect(`/`)


}

async function deleteOnePost(req, res, next) {
	const { id: postId } = req.params;

	console.log(`postId: ${postId}`)
	try {
		const deletedPost = await Post.findByIdAndDelete(postId);
		if (!deletedPost) {
			throw new Error('Post did not found');
		}
		console.log('Post deleted successfully:', deletedPost);
		res.status(200).send({"result": "Post was deleted successfully"})

	} catch (error) {
		console.error('Deleiting error:', error);
		res.status(404).send({"result": "Post did not found"})
	}

}

module.exports = {
	getPosts,
	getPostsId,
	addNewPost,
	deleteOnePost
}
