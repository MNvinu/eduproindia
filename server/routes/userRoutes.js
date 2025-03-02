const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// Save user data
router.post('/save', async (req, res) =>
{
	const { name, courseName } = req.body;

	if (!name || !courseName)
	{
		return res.status(400).json({ message: 'All fields are required' });
	}

	try
	{
		const user = await User.create({ name, courseName });
		res.status(201).json({ message: 'Certificate data saved successfully', user });
	} catch (err)
	{
		res.status(500).json({ message: 'Error saving data', error: err.message });
	}
});

// Get all users
router.get('/all', async (req, res) =>
{
	try
	{
		const users = await User.findAll();
		res.status(200).json(users);
	} catch (err)
	{
		res.status(500).json({ message: 'Error fetching users', error: err.message });
	}
});

module.exports = router;
