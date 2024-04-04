const protectedRoute = (allowedRoles = [], redirectTo = '/auth/login') => function (req, res, next) {
	const { role = 'unsigned' } = req._auth || {};
	if (!allowedRoles.includes(role)) {
		return res.redirect(redirectTo);
	}

	next();
};

module.exports = {
	protectedRoute
};