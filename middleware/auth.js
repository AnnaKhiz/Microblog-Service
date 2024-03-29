const { JWTKEY } = require('../config/default')
const { verifyJwt, generateJWt } = require('../utils/auth');


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