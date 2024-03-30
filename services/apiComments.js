const { Post, User, Comment, ObjectId } = require('../db');
const { verifyJwt } = require('../utils/auth');
const { JWTKEY } = require('../config/default');

async function addComment(req, res, next) {
	try {
		const { body: comment } = req;
		const { userId: id } = req._auth;

		const newComment = await new Comment({
			...comment,
			date: Date.now().toString(),
			user: new ObjectId(id),
			post: new ObjectId(comment.idPost)
		});

		const result = await newComment.save();
		const updatedPost = await Post.findByIdAndUpdate(comment.idPost, { $push: { comments: new ObjectId(result._id) }}, { new: true });
		const updatedUser = await User.findByIdAndUpdate(id, { $push: { comments: new ObjectId(result._id) }}, { new: true });

		res.status(201).send({"result" : result});

	} catch (error) {
		next(error);
	}

}

async function deleteComment(req, res, next) {
	try {
		const { date } = req.params;
		const { userId: id, role } = req._auth;
		const { targetpost: postId } = req.cookies;

		if (!postId) {
			return res.status(400).send({ "result": 'Target post ID is missing in cookies', "status": 400 });
		}

		role === 'admin'
			? await Comment.findOneAndDelete({ post: new ObjectId(postId), date: date})
			: await Comment.findOneAndDelete({ user: new ObjectId(id), post: new ObjectId(postId), date: date});

		res.send({"result": "Comment was deleted", "status": 200});
	} catch (error) {
		res.send({"result": "Comment did not deleted", "status": 404})
		next(error)
	}
}

module.exports = {
	addComment,
	deleteComment
}