const { JWTKEY } = require('../config/default')
const { verifyJwt, generateJWt } = require('../utils/auth');



//!!!!! в тебе вже навіть є мідлвер що парсить токени і додає дані в ріквест... зроби його центральною точкою
//! в процесі - видали парсінг токена з усіхінших місць де ти додавала, і звертайся до даних із токена через req._auth
function parserJwt(req, resp, next) {
	const { token } = req.cookies;
	if (token) {
		const payload = verifyJwt(token, JWTKEY);
		req._auth = payload;
	}
	req._auth = {}
	next();
}

module.exports = { parserJwt }