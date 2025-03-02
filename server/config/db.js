const { Sequelize } = require('sequelize');

if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASS || !process.env.DB_HOST || !process.env.DB_PORT)
{
	console.error("Missing environment variables! Check your .env file.");
	process.exit(1);
}

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	dialect: 'mysql',
	logging: console.log
});

const connectDB = async () =>
{
	try
	{
		await sequelize.authenticate();
		console.log('MySQL connected successfully');
	} catch (error)
	{
		console.error('Database connection error:', error.message);
	}
};

module.exports = { sequelize, connectDB };
