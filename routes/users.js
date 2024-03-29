const router = require('express').Router();
const { deleteOneUser } = require('../services/apiUsers.js');

//!! незахищений авторізацією роут на деліт юзера по логіну ???
router.delete('/:login', deleteOneUser);

module.exports = { router }