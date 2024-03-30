const router = require('express').Router();
const { deleteOneUser } = require('../services/apiUsers.js');

router.delete('/:id', deleteOneUser);

module.exports = { router }