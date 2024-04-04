const express = require('express');
const router = express.Router();
const { Post, User, Comment, Admin, ObjectId } = require('../db');
const { hashPass, checkPass, generateJWt } = require('../utils/auth');
const { protectedRoute } = require('../middleware/route');
const { parserJwt } = require('../middleware/auth');

router.route('/auth/login')
	.get((_req, res) => res.render('login'))
	.post(express.urlencoded({ extended: false }), async (req, res, next) => {
		const { login, password } = req.body;
		const admin = await Admin.findOne( { login });

		if (admin) {
			const result = await checkPass(password, admin.password);

			if (!result) {
				return res.send({'result': 'Wrong password', 'status': 404});
			}

			const authData = { role: 'admin', userId: admin._id.toString() };
			const token = generateJWt(authData);
			res.cookie('token', token, { httpOnly: true });

			res.send({'id': admin._id.toString(), 'role': 'admin', 'status': 200});

		} else {
			const user = await User.findOne( { login });
			if (!user) {
				return res.send({'result': 'User with such login not found', 'status': 404});
			}

			const result = await checkPass(password, user.password);
			if (!result) {
				return res.send({'result': 'Wrong password', 'status': 404});
			}

			const authData = { role: 'user', userId: user._id.toString() };
			const token = generateJWt(authData);
			res.cookie('token', token, { httpOnly: true });

			res.send({'id': user._id.toString(), 'role': 'user', 'status': 200});
			next();
		}
	});

//REGISTER
router.route('/auth/register')
	.get((_req, res) => res.render('register'))
	.post(express.urlencoded({ extended: false }), async (req, res) => {

		try {
			const { body: user } = req;

			const newUser = await new User({
				...user,
				posts: [],
				comments: [],
				password: await hashPass(user.password)
			});

			const result = await newUser.save();

			req._auth = { role: 'user', userId: result._id.toString() };

			const token = generateJWt(req._auth);
			res.cookie('token', token, { httpOnly: true });

			res.redirect(`/user_home/${result._id.toString()}`);

		} catch (error) {
			if (error.code === 11000) {
				res.status(401).send({'result': 'User with this login already exist'});
			}
		}
	});


router.get('/', parserJwt, protectedRoute(['user', 'unsigned'], '/admin'), async (req, res) => {
	const posts = await Post.find().populate('comments');
	posts.sort((a,b) => b.date.localeCompare(a.date));

	const { userId: id, role } = req._auth;
	role === 'admin' ? res.redirect('/admin') : res.render('index', { id, posts, role });
});


// USER HOME
router.get('/user_home/:id', parserJwt, async (req, res) => {
	const { userId: id, role } = req._auth;

	const posts = await Post.find().find( { author: new ObjectId(id)}).populate('author').populate('comments');

	if (!posts) {
		res.send({'result': 'No posts'});
	}
	posts.sort((a,b) => b.date.localeCompare(a.date));
	res.render('index', { id, posts, role });
});

//LOGOUT
router.route('/auth/logout')
	.get((_req, res) => {
		res.clearCookie('token');
		res.redirect('/');
	});

// ADMIN PAGE
router.get('/admin', parserJwt, protectedRoute(['admin'], '/auth/login'), async (req,res) => {
	const { role } = req._auth;

	const users = await User.find().populate('posts').populate('comments');
	const posts = await Post.find().populate('author').populate('comments');
	const comments = await Comment.find().populate('post').populate('user');

	posts.sort((a,b) => b.date.localeCompare(a.date));
	res.render('admin_home', { users, posts, comments, role });

});

router.get('/*', (req, res) => {
	res.redirect('/');
});

module.exports = { router };