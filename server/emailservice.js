const nodemailer = require('nodemailer');
const path = require('path');

const sendCertificateEmail = async (recipientEmail, name, courseName) =>
{
	// Create transporter
	const transporter = nodemailer.createTransport({
		service: 'Gmail', // Use your email provider
		auth: {
			user: 'your-email@gmail.com', // Your email
			pass: 'your-email-password', // Your email password
		},
	});

	const outputPath = path.resolve(__dirname, `${name}_certificate.pdf`);

	// Send email with the certificate
	const mailOptions = {
		from: 'your-email@gmail.com',
		to: recipientEmail,
		subject: 'Your Course Completion Certificate',
		text: `Hi ${name},\n\nCongratulations on completing the course "${courseName}". Please find your certificate attached.\n\nBest regards,\n[Your Website Name]`,
		attachments: [
			{
				filename: `${name}_certificate.pdf`,
				path: outputPath,
			},
		],
	};

	await transporter.sendMail(mailOptions);
	console.log(`Email sent to ${recipientEmail}`);
};

// Example usage
sendCertificateEmail(
	'user@example.com',
	'John Doe',
	'Big Data with Spark and Scala'
);

module.exports = sendCertificateEmail;
