const PORT = process.env.PORT ? process.env.PORT : 3001;
const DBURL = process.env.DBURL ? process.env.DBURL : 'mongodb://localhost:27017';
const JWTKEY = process.env.JWTKEY ? process.env.JWTKEY : Math.random().toString();

module.exports = {
	PORT,
	DBURL,
	JWTKEY
}