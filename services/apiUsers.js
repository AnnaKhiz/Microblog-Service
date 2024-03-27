const { Post, User, ObjectId } = require('../db');
const { hashPass, checkPass } = require('../utils/auth')
const { JWTKEY } = require('../config/default');
const { verifyJwt } = require('../utils/auth');


async function getUsers(req, res, next) {
	// const { body: login } = req;
	// console.log(login)
	// // const { token } = req.cookies;
	// // const { userId: id } = await verifyJwt(token, JWTKEY)
	// //
	// const users = await User.find()
	// // // .find( { author: new ObjectId(id)}).populate('author')
	// // console.log(token)
	// res.status(200).send(users)
}

async function loginUser(req, res, next) {

	// const { email } = req.body;
	// const user = await User.findOne({ email })
	// console.log(user)
	//
	// if (!user) {
	// 	return res.redirect('/auth/login')
	// }
	//
	// const { password } = req.body;
	//
	// const result = await checkPass(password, user.password);
	// console.log(result)
	//
	// res.cookie('id', user.id)
	//
	// result ? res.send({ "result": result }) : res.status(404).send({ "result": "no users found" });
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

async function deleteOneUser(req, res, next) {
	const { login } = req.params;
	console.log(login)
	// const { token } = req.cookies;
	// const { userId: id } = await verifyJwt(token, JWTKEY)
	//
	const result = await User.findOneAndDelete({ login })
	// // .find( { author: new ObjectId(id)}).populate('author')
	// console.log(token)
	res.status(200).send(result)
}

module.exports = {
	getUsers,
	loginUser,
	addNewUser,
	deleteOneUser
}
