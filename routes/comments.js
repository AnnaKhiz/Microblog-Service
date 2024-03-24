const router = require('express').Router();
const { addComment } = require('../services/apiComments.js')

// router.get('/')
router.post('/', addComment);

module.exports = { router }