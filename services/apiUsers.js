const { User, ObjectId } = require('../db');

async function deleteOneUser(req, res, next) {
	const { id } = req.params;
	const result = await User.findOneAndDelete({ _id: new ObjectId(id) });

	!result
		? res.status(404).send({ "result": "User not found" })
		: res.status(200).send(result);
}

module.exports = {
	deleteOneUser
}
