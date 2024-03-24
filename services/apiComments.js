const { Post, User, Comment, ObjectId } = require('../db');

async function addComment(req, res, next) {
	const { body: comment } = req
	console.log(comment)
	const { id } = req.cookies;
	// console.log(`id: ${id}`)
	// console.log(targetpost)

	comment.date = Date.now().toString();
	comment.user = new ObjectId(id);
	comment.post = new ObjectId(comment.idPost);

	const newComment = await new Comment(comment)
	const result = await newComment.save()

	const updatedPost = await Post.findByIdAndUpdate(comment.idPost, { $push: { comments: new ObjectId(result._id) }}, { new: true })
	const updatedUser = await User.findByIdAndUpdate(id, { $push: { comments: new ObjectId(result._id) }}, { new: true })

	res.status(201).send({"result" : result})
}

module.exports = {
	addComment
}