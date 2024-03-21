const { Post, User, ObjectId } = require('../db');

async function getPosts(req, res, next) {
	const { id } = req.cookie;

	const posts = await Post.find();

	resp.render('index', { id, posts });
}

function getPostsId() {

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



function deleteOnePost() {

}

module.exports = {
	getPosts,
	getPostsId,
	addNewPost,
	deleteOnePost
}
