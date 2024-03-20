const express = require('express');
const router = express.Router();

// LOGIN
router.route('/auth/login')
	.get((_req, res) => res.render('login'))
	.post(express.urlencoded({ extended: false }), async (req, resp, next) => {

		next()
	})

// MAIN PAGE
router.route('/')
	.get((_req, res) => res.render('index'))
	.post(express.urlencoded({ extended: false }), async (req, resp, next) => {

		next()
	})

//REGISTER
router.route('/auth/register')
	.get((_req, res) => res.render('register'))
	.post(express.urlencoded({ extended: false }), async (req, resp, next) => {

		next()
	})

//LOGOUT
router.route('/auth/logout')
	.get((_req, res) => res.redirect('/'))

module.exports = { router }