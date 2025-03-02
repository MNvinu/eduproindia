const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	courseName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	completionDate: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW,
	},
});

module.exports = User;
