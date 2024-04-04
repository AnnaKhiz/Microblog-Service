module.exports = {
	port: process.env.PORT || 3001,
	dbUrl: process.env.DBURL || '',
	jwtKey: process.env.JWTKEY || Math.random().toString(),
	jwtExpires: process.env.JWT_EXP || '24h'
};
