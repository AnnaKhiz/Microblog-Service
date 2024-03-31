const router = require('express').Router();
const { addComment, deleteComment } = require('../services/apiComments.js');
const { parserJwt } = require('../middleware/auth');

router.post('/', parserJwt, addComment);

//!!!!! parserJwt просто парсить авторізаційні дані, і НІЯК не захищає роут від доступу якщо даних немає ))
//!! я можу видалити комент просто пославши постманом ріквест з айдішником )
router.delete('/:id', parserJwt, deleteComment);

module.exports = { router };