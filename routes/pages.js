const express = require('express');
const router = express.Router();
const { Post, User, ObjectId } = require('../db')
const { hashPass, checkPass } = require('../utils/auth')
const { AddNewPost } = require('../services/apiPosts')

// LOGIN
router.route('/auth/login')
	.get((_req, res) => res.render('login'))
	.post(express.urlencoded({ extended: false }), async (req, res, next) => {

		const { login } = req.body;

		const user = await User.findOne( { login })
		console.log(user)

		if (!user) {
			return res.redirect('/auth/login')
		}

		const { password } = req.body;
		console.log(password)

		const result = await checkPass(password, user.password);
		console.log(result)

		res.cookie('id', user._id.toString())

		result ? res.redirect(`/user_home/${user._id.toString()}`) : res.status(404).send({ "result": "no users found" })
		next()
	})


router.get('/', async (req,res,next) => {
	const posts = await Post.find()
	posts.sort((a,b) => b.date.localeCompare(a.date))
	res.render('index', { posts });
})

// USER HOME
router.get(`/user_home/:id`, async (req,res,next) => {
	const { id } = req.params;
	const posts = await Post.find().find( { author: new ObjectId(id)}).populate('author')
	if (!posts) {
		res.send({"result": "No posts"})
	}
	res.render('index', { id, posts });
})

//REGISTER
router.route('/auth/register')
	.get((_req, res) => res.render('register'))
	.post(express.urlencoded({ extended: false }), async (req, res, next) => {

		const { body: user } = req;

		user.posts = []
		user.password = await hashPass(user.password)
		// console.log(user)
		const newUser = await new User(user)
		const result = await newUser.save()

		result ? res.status(201).redirect(`/auth/login`) : res.status(400).redirect('/auth/register');
		return result

	})

//LOGOUT
router.route('/auth/logout')
	.get((_req, res) => {
		res.clearCookie('id')
		res.redirect('/')
	});

router.post('/user_home/:id', express.urlencoded({ extended: false }), async (req, res, next) => {
	const { body: post } = req;
	const { id } = req.cookies;
	post.author = new ObjectId(id)

	post.date = Date.now().toString();

	const newPost = await new Post(post)
	const result = await newPost.save()
	res.status(201).redirect(`/user_home/${result.author.toString()}`)

})

module.exports = { router }