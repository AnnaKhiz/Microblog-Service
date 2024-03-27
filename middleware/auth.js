// const config = require('config');
const { JWTKEY } = require('../config/default')
const { verifyJwt, generateJWt } = require('../utils/auth');


function parserJwt(req, resp, next) {
	const { token } = req.cookies;
	if (token) {
		const payload = verifyJwt(token, JWTKEY);
		req._auth = payload;
	}
	req._auth = {}
	// console.log(payload)
	// req.Authorization = `Bearer ${token}`

	next();
}

module.exports = { parserJwt }