const express = require('express');
const router = express.Router();
const { Post, User, Comment, ObjectId } = require('../db')
const { hashPass, checkPass } = require('../utils/auth')
const { AddNewPost, deleteOnePost } = require('../services/apiPosts')

// LOGIN
router.route('/auth/login')
	.get((_req, res) => res.render('login'))
	.post(express.urlencoded({ extended: false }), async (req, res, next) => {

		const { login } = req.body;

		const user = await User.findOne( { login })
		// console.log(user)

		if (!user) {
			return res.redirect('/auth/login')
		}

		const { password } = req.body;
		// console.log(password)

		const result = await checkPass(password, user.password);
		// console.log(result)

		res.cookie('id', user._id.toString())

		result ? res.redirect(`/user_home/${user._id.toString()}`) : res.status(404).send({ "result": "no users found" })
		next()
	});


router.get('/', async (req,res,next) => {
	const {id} = req.cookies;
	if (id) {
		const posts = await Post.find().populate('comments');
		posts.sort((a,b) => b.date.localeCompare(a.date))
		res.render('index', { id, posts });
	} else {
		const posts = await Post.find().populate('comments');
		posts.sort((a,b) => b.date.localeCompare(a.date))
		// console.log(posts)
		res.render('index', { posts });
	}

});


// router.get('/user_home'async (req, res, next) => {
//
// })

// USER HOME
router.get(`/user_home/:id`, async (req,res,next) => {
	const { id } = req.params;
	const posts = await Post.find().find( { author: new ObjectId(id)}).populate('author').populate('comments')
	// console.log(posts)
	if (!posts) {
		res.send({"result": "No posts"})
	}
	posts.sort((a,b) => b.date.localeCompare(a.date))
	res.render('index', { id, posts });
})

//REGISTER
router.route('/auth/register')
	.get((_req, res) => res.render('register'))
	.post(express.urlencoded({ extended: false }), async (req, res, next) => {

		const { body: user } = req;

		user.posts = []
		user.comments = []
		user.password = await hashPass(user.password)
		// console.log(user)
		const newUser = await new User(user)
		const result = await newUser.save()

		result ? res.status(201).redirect(`/auth/login`) : res.status(400).redirect('/auth/register');
		return result

	});

//LOGOUT
router.route('/auth/logout')
	.get((_req, res) => {
		res.clearCookie('id')
		res.clearCookie('targetpost')
		res.redirect('/')
	});

router.post('/user_home/:id', express.urlencoded({ extended: false }), async (req, res, next) => {
	// console.log(req.body)

	const { body: post } = req;
// console.log(post)
	// console.log('request')
	// console.log(req.body)

	const { id } = req.cookies;
	post.author = new ObjectId(id)
	post.date = Date.now().toString();
	post.comments = [];

	const newPost = await new Post(post);
	const result = await newPost.save();

	res.status(201).redirect(`/user_home/${id}`)


})

// ADD COMMENT
// router.post('/user_home/:id/comment', express.urlencoded({ extended: false }), async (req, res, next) => {

	// const { body: comment } = req
	//
	// const { id, targetpost } = req.cookies;
	// // console.log(`id: ${id}`)
	//
	// comment.date = Date.now().toString();
	// comment.user = new ObjectId(id);
	// comment.post = new ObjectId(targetpost);
	//
	// const newComment = await new Comment(comment)
	// const result = await newComment.save()
	//
	// const updatedPost = await Post.findByIdAndUpdate(targetpost, { $push: { comments: new ObjectId(result._id) }}, { new: true })
	// const updatedUser = await User.findByIdAndUpdate(id, { $push: { comments: new ObjectId(result._id) }}, { new: true })
	//
	// res.status(201).redirect(`/`)

// })


module.exports = { router }