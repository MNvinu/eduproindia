const express = require('express');
const router = express.Router();
const generateCertificate = require('../certificateGenerator');
const sendCertificateEmail = require('./emailService');
const path = require('path');

router.post('/issue', async (req, res) =>
{
	const { name, courseName, email } = req.body;

	if (!name || !courseName || !email)
	{
		return res.status(400).json({ message: 'All fields are required' });
	}

	try
	{
		const outputPath = path.resolve(__dirname, `${name}_certificate.pdf`);

		// Generate Certificate
		generateCertificate(name, courseName, path.resolve(__dirname, 'logo.png'), outputPath);

		// Send Email
		await sendCertificateEmail(email, name, courseName);

		res.status(200).json({ message: 'Certificate issued and emailed successfully!' });
	} catch (err)
	{
		res.status(500).json({ message: 'Error issuing certificate', error: err.message });
	}
});

module.exports = router;
