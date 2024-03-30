

const protectedRoute = (allowedRoles = [], redirectTo = '/auth/login') => function (req, resp, next) {
	const { role = 'unsigned' } = req._auth || {};
	console.log('role ------' + role)
	console.log(allowedRoles)
	if (!allowedRoles.includes(role)) {
		console.log(`Role [${role}] is not allowed for [${req.url}]`);
		return resp.redirect(redirectTo);
	}

	next();
}

module.exports = {
	protectedRoute
}