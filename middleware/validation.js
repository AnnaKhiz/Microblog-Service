function validateCommentId(req, resp, next) {
	const { id: commentId } = req.params;

	if (!commentId) {
		return resp.status(400).send({ 'result': 'Target post ID is missing in cookies', 'status': 400 });
	}
	req.commentId = commentId;
	next();
}

module.exports = { validateCommentId };