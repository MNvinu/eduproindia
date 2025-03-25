var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'eduproindia25@gmail.com',
		pass: 'tcwolipzzkslqdxw'
	}
});

var mailOptions = {
	from: 'eduproindia25@gmail.com',
	to: 'vinuthamkiran@gmail.com',
	subject: 'Sending Email using Node.js',
	text: 'That was easy!'
};
console.log("Preparing to send email...");
transporter.sendMail(mailOptions, function (error, info)
{
	if (error)
	{
		console.log("error",error);
	} else
	{
		console.log('Email sent: ' + info.response);
	}
});