const bcrypt = require('bcrypt');

//token generating
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
	checkPass
}