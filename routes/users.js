const router = require('express').Router();
const { getUsers, loginUser, addNewUser, deleteOneUser } = require('../services/apiUsers.js');


router.get('/', getUsers);

router.post('/:id', loginUser);

router.post('/', addNewUser);

router.delete('/:id', deleteOneUser);

module.exports = { router }