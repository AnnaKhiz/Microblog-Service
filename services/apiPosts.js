const { Post, User, Comment, ObjectId } = require('../db');
const { verifyJwt } = require('../utils/auth');
const { JWTKEY } = require('../config/default');


async function getPosts(req, res, next) {
	const { token } = req.cookies;
	if (token) {
		const { userId: id } = await verifyJwt(token, JWTKEY)

		const posts = await Post.find()
		res.status(200).send({ id, posts })
	} else {
		const posts = await Post.find()
		res.status(200).send({ posts })
	}
	// const { userId: id } = await verifyJwt(token, JWTKEY)
	//
	// const posts = await Post.find()

	// res.render('index', { id, posts });
}

async function getPostsId(req, res, next) {
	const { token } = req.cookies;
	const { userId: id } = await verifyJwt(token, JWTKEY)
	const posts = await Post.find().find( { author: new ObjectId(id)}).populate('author')
	// console.log(posts)
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
	const { token } = req.cookies;
	const { userId: id } = verifyJwt(token, JWTKEY)
	post.author = new ObjectId(id)

	const user = User.find( { _id: new ObjectId(id) })
	user.posts.push(post)
	console.log('HERE IS NEW POST')
	console.log(post)

	const newPost = await new Post(post)
	const result = await newPost.save()

	res.status(201).redirect(`/`)


}


// DELETE POST
async function deleteOnePost(req, res, next) {
	const { date: postDate } = req.params;

	const { token } = req.cookies;
	const { userId: authorId, role } = await verifyJwt(token, JWTKEY)
	console.log(role)

	if (role === 'admin') {
		const deletedPost = await Post.findOneAndDelete( { date: postDate} );
		if (!deletedPost) {
			throw new Error('Post did not found');
		}
		res.status(200).send({"result": "Post was deleted successfully"})
	} else {
		try {

			const deletedPost = await Post.findOneAndDelete( { date: postDate, author: new ObjectId(authorId)} );
			if (!deletedPost) {
				throw new Error('Post did not found');
			}

			res.status(200).send({"result": "Post was deleted successfully"})

		} catch (error) {
			console.error('Deleiting error:', error);
			res.status(404).send({"result": "Post did not found"})
		}
	}



}


// UPDATE POST
async function updateOnePost(req, res, next) {
	const { body: post } = req
	console.log(post)
	try {
		const updatedPost = await Post.findOneAndUpdate( { _id: new ObjectId(post.id)},
			{ name: post.name, description: post.description} );
		if (!updatedPost) {
			throw new Error('Post did not found');
		}
		console.log('Post updated successfully:', updatedPost);
		res.status(200).send({"result": "Post was updated successfully"})

	} catch (error) {
		console.error('Updateiting error:', error);
		res.status(404).send({"result": "Post did not found"})
	}

}




module.exports = {
	getPosts,
	getPostsId,
	addNewPost,
	deleteOnePost,
	updateOnePost
}
