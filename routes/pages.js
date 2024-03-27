const express = require('express');
const router = express.Router();
const { Post, User, Comment, Admin, ObjectId } = require('../db')
const { hashPass, checkPass, generateJWt, verifyJwt } = require('../utils/auth')
const { AddNewPost, deleteOnePost } = require('../services/apiPosts');
const { JWTKEY } = require('../config/default')

// LOGIN
router.route('/auth/login')
	.get((_req, res) => res.render('login'))
	.post(express.urlencoded({ extended: false }), async (req, res, next) => {
		const { login, password } = req.body;
		const admin = await Admin.findOne( { login })

		if (admin) {
			const result = await checkPass(password, admin.password);

			if (!result) {
				console.log('wrong password')
				return res.send({"result": "Wrong password", "status": 404})
			}

			req._auth = { role: 'admin', userId: admin._id.toString() };
			const token = generateJWt(req._auth)
			res.cookie('token', token, { httpOnly: true })
			res.send({"id": admin._id.toString(), "role": "admin", "status": 200})

		} else {
			const user = await User.findOne( { login })

			if (!user) {
				return res.send({"result": "User with such login not found", "status": 404})
			}

			const result = await checkPass(password, user.password);

			if (!result) {
				console.log('wrong password')
				return res.send({"result": "Wrong password", "status": 404})
			}

			req._auth = { role: 'user', userId: user._id.toString() };
			const token = generateJWt(req._auth)
			res.cookie('token', token, { httpOnly: true })
			res.send({"id": user._id.toString(), "role": "user", "status": 200})
			next()
		}
	});

//REGISTER
router.route('/auth/register')
	.get((_req, res) => res.render('register'))
	.post(express.urlencoded({ extended: false }), async (req, res, next) => {

		const { body: user } = req;
		// console.log(user)
		user.posts = []
		user.comments = []
		user.password = await hashPass(user.password)
		try {
			const newUser = await new User(user)
			const result = await newUser.save()
			res.status(201).send({"result": "Registration was successful. Please log in", "status": 201})
			return result
		} catch (error) {
			if (error.code === 11000) {
				console.log('Login exist');
				res.status(401).send({"result": "User with this login already exist", "status": 401})
			}
		}
	});

const protectedRoute = (allowedRoles = [], redirectTo = '/auth/login') => function (req, resp, next) {
	const { role = 'unsigned' } = req._auth || {};

	if (!allowedRoles.includes(role)) {
		console.log(`Role [${role}] is not allowed for [${req.url}]`);
		return resp.redirect(redirectTo);
	}

	next();
}

router.get('/', protectedRoute(['user', 'unsigned'], '/admin'), async (req,res,next) => {

	const { token } = req.cookies;
	// console.log(req._auth)

	// const { userId: id, role = '' } = await verifyJwt(token, JWTKEY)

	if (token) {
		// const { userId: id, role = '' } = req._auth;
		// const authorId = role === 'user' ? userId : -1;
		const posts = await Post.find().populate('comments')
		posts.sort((a,b) => b.date.localeCompare(a.date))
		const { userId: id, role } = await verifyJwt(token, JWTKEY);
		console.log('role ' + role)

		role === 'admin' ? res.redirect('/admin') : res.render('index', { id, posts, role })
	} else {
		const posts = await Post.find().populate('comments');
		posts.sort((a,b) => b.date.localeCompare(a.date))
		// console.log(posts)
		res.render('index', { posts });
	}
});


// USER HOME
router.get(`/user_home/:id`, async (req,res,next) => {
	// const { id } = req.params;
	const { token } = req.cookies;
	const { userId: id, role } = await verifyJwt(token, JWTKEY)
	const posts = await Post.find().find( { author: new ObjectId(id)}).populate('author').populate('comments')
	// console.log(posts)
	if (!posts) {
		res.send({"result": "No posts"})
	}
	posts.sort((a,b) => b.date.localeCompare(a.date))
	res.render('index', { id, posts, role });
})



//LOGOUT
router.route('/auth/logout')
	.get((_req, res) => {
		res.clearCookie('token')
		res.clearCookie('targetpost')
		res.redirect('/')
	});

router.post('/user_home/:id', express.urlencoded({ extended: false }), async (req, res, next) => {

	const { body: post } = req;

	const { token } = req.cookies;
	const { userId: id } = await verifyJwt(token, JWTKEY)
	post.author = new ObjectId(id)
	post.date = Date.now().toString();
	post.comments = [];

	const user = await User.findOne( { _id: new ObjectId(id) })

	const newPost = await new Post(post);
	const result = await newPost.save();

	const newUser = await User.findOneAndUpdate({ _id: new ObjectId(id) } , { $push: { posts: new ObjectId(result._id) }}, { new: true })

	res.status(201).redirect(`/user_home/${id}`);


});

// ADMIN PAGE
router.get('/admin', async (req,res) => {

	const { token } = req.cookies;
	if (!token) {
		req._auth = {}
		return res.redirect('/auth/login');
	} else {
		const { role } = await verifyJwt(token, JWTKEY)
		if (role !== 'admin') {
			res.redirect('/auth/login')
		}
		console.log(role)
		const users = await User.find().populate('posts').populate('comments');
		const posts = await Post.find().populate('author').populate('comments');
		const comments = await Comment.find().populate('post').populate('user')
		res.render('admin_home', { users, posts, comments, role });
	};

})

router.get('/*', (req, res) => {
	console.log(`Page not found`);
	res.redirect('/')
})

module.exports = { router }