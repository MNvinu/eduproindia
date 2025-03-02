const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateCertificate = (name, courseName, logoPath, outputPath) =>
{
	const doc = new PDFDocument({
		size: 'A4',
		layout: 'landscape',
	});

	// Pipe to a writable stream
	doc.pipe(fs.createWriteStream(outputPath));

	// Background border
	doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40).stroke('#C9AC70');

	// Add logo
	const logoX = doc.page.width / 2 - 50;
	doc.image(logoPath, logoX, 40, { width: 100 });

	// Certificate Title
	doc
		.font('Times-Bold')
		.fontSize(40)
		.fillColor('#000')
		.text('Certificate of Completion', { align: 'center', lineGap: 10 });

	// Subheading
	doc
		.font('Times-Roman')
		.fontSize(20)
		.text(`This certificate is awarded to`, { align: 'center', lineGap: 10 });

	// Recipient Name
	doc
		.font('Times-Bold')
		.fontSize(30)
		.fillColor('#000')
		.text(name, { align: 'center', lineGap: 10 });

	// Course Name
	doc
		.font('Times-Roman')
		.fontSize(18)
		.text(
			`For successfully completing the course: \n "${courseName}"`,
			{ align: 'center', lineGap: 15 }
		);

	// Issued Date and Footer
	const issueDate = new Date().toLocaleDateString();
	doc
		.font('Times-Italic')
		.fontSize(15)
		.text(`Issued on: ${issueDate}`, { align: 'right', margin: 20 });

	doc.end();
};

// Example usage
generateCertificate(
	'John Doe',
	'Big Data with Spark and Scala',
	path.resolve(__dirname, 'logo.png'),
	path.resolve(__dirname, 'output_certificate.pdf')
);

module.exports = generateCertificate;
