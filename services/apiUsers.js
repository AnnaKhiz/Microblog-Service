const { User } = require('../db');

async function deleteOneUser(req, res, next) {
	const { login } = req.params;
	const result = await User.findOneAndDelete({ login });
	res.status(200).send(result);
}

module.exports = {
	deleteOneUser
}
