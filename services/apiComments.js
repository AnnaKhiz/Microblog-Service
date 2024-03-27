const { Post, User, Comment, ObjectId } = require('../db');
const { verifyJwt } = require('../utils/auth');
const { JWTKEY } = require('../config/default')

async function getComments(req, res, next) {
// 	// const { id: postId } = req.params
// 	const { postId, date } = req.query
// 	console.log(postId)
// 	console.log(date)
// 	console.log(`HEY THERE`)
// 	const { token } = req.cookies
// 	const { userId: id } = await verifyJwt(token, JWTKEY)
// 	// const post = '6603e2ea4c8d76c3a0e37dc7'
// 	// const id = '65fc072a092229614802c411'
// 	// const comments = await Comment.find({ user: new ObjectId(id), post: new ObjectId(post)})
// 	const comments = await Comment.findOneandDelete({ user: new ObjectId(id), post: new ObjectId(postId), date: date})
// 	// .find( { author: new ObjectId(id)}).populate('author')
// 	// console.log(comments)
// 	res.status(200).send({ comments })
}

async function addComment(req, res, next) {
	const { body: comment } = req
	console.log(comment)
	const { token } = req.cookies;
	const { userId: id } = await verifyJwt(token, JWTKEY)
	// console.log(`id: ${id}`)
	// console.log(targetpost)
	console.log(id)
	comment.date = Date.now().toString();
	comment.user = new ObjectId(id);
	comment.post = new ObjectId(comment.idPost);

	const newComment = await new Comment(comment)
	const result = await newComment.save()

	const updatedPost = await Post.findByIdAndUpdate(comment.idPost, { $push: { comments: new ObjectId(result._id) }}, { new: true })
	const updatedUser = await User.findByIdAndUpdate(id, { $push: { comments: new ObjectId(result._id) }}, { new: true })

	res.status(201).send({"result" : result})
}

async function deleteComment(req, res, next) {
	const { date } = req.params
	const { targetpost: postId, token } = req.cookies
	const { userId: id } = await verifyJwt(token, JWTKEY)
	const comments = await Comment.findOneAndDelete({ user: new ObjectId(id), post: new ObjectId(postId), date: date})
	comments ? res.send({"result": "Comment was deleted", "status": 200}) : res.send({"result": "Comment did not deleted", "status": 404})
}

module.exports = {
	addComment,
	deleteComment,
	getComments
}