const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWTKEY } = require('../config/default');


//token generating
function generateJWt(payload) {
	return jwt.sign(payload, JWTKEY, { expiresIn: '24h' })
}

async function verifyJwt(token, secret) {
	try {
		const result = await jwt.verify(token, secret);
		console.log(result)
		return result
	} catch (e) {
		console.log(`Error in verify JWT: ${e}`)
	}
}




// export async function generateToken() {
// 	const token = await TokenGenerator({
// 		salt: TSALT,
// 		timestampMap: TIMESTAMPMAP,
// 	}).generate();
// 	return token
// }

//hash pass
async function hashPass(textPass) {
	const salt = await bcrypt.genSalt(10);
	const hashedPass = await bcrypt.hash(textPass, salt);
	return hashedPass;
}

//checkPass
async function checkPass(textPass, hashedPass) {
	try {
		return !!(await bcrypt.compare(textPass, hashedPass))
	} catch (e) {
		return false
	}
}

module.exports = {
	hashPass,
	checkPass,
	generateJWt,
	verifyJwt
}