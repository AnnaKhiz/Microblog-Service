const router = require('express').Router();
const { deleteOneUser } = require('../services/apiUsers.js');

router.delete('/:login', deleteOneUser);

module.exports = { router }