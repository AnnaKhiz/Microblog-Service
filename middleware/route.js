

const protectedRoute = (allowedRoles = [], redirectTo = '/auth/login') => function (req, resp, next) {
	const { role = 'unsigned' } = req._auth || {};
	if (!allowedRoles.includes(role)) {
		return resp.redirect(redirectTo);
	}

	next();
};

module.exports = {
	protectedRoute
};