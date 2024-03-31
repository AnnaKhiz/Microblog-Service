const { Post, User, Comment, ObjectId } = require('../db');

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
		await Post.findByIdAndUpdate(comment.idPost, { $push: { comments: new ObjectId(result._id) }}, { new: true });
		await User.findByIdAndUpdate(id, { $push: { comments: new ObjectId(result._id) }}, { new: true });

		res.status(201).send({'result' : result});

	} catch (error) {
		next(error);
	}

}

async function deleteComment(req, res, next) {
	try {
		const { id: commentId } = req.params;

		//! такі речі краще ставити на валідейшен мідлвер, все таки )
		if (!commentId) {
			return res.status(400).send({ 'result': 'Target post ID is missing in cookies', 'status': 400 });
		}

		await Comment.findOneAndDelete({ _id: new ObjectId(commentId)});

		res.send({'result': 'Comment was deleted', 'status': 200});
	} catch (error) {
		res.send({'result': 'Comment did not deleted', 'status': 404});
		next(error);
	}
}

module.exports = {
	addComment,
	deleteComment
};