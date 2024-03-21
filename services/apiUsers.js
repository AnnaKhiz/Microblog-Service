const { Post, User } = require('../db');
const { hashPass, checkPass } = require('../utils/auth')


function getUsers() {

}

async function loginUser(req, res, next) {

	const { email } = req.body;
	const user = await User.findOne({ email })
	console.log(user)

	if (!user) {
		return res.redirect('/auth/login')
	}

	const { password } = req.body;

	const result = await checkPass(password, user.password);
	console.log(result)

	res.cookie('id', user.id)

	result ? res.send({ "result": result }) : res.status(404).send({ "result": "no users found" });
}

async function addNewUser(req, res, next) {
	// const { body: user } = req;
	//
	// user.posts = []
	// user.password = await hashPass(user.password)
	//
	// const result = await User.insertOne(user)
	//
	// result? res.status(201).send({ "result" : result }) : res.status(400).send({ "result" : "user bad request" });
	// return result
}

function deleteOneUser() {

}

module.exports = {
	getUsers,
	loginUser,
	addNewUser,
	deleteOneUser
}
