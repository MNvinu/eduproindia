require('dotenv').config();
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const { connectDB, sequelize } = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 8880;  

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

connectDB();
sequelize.sync({ alter: true }).then(() => console.log('Database & tables created!'));

// Routes
app.use('/api/users', userRoutes);

const adminEmails = ["admin1@gmail.com", "admin2@gmail.com"];

const db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	port: process.env.DB_PORT,
	connectTimeout: 10000
});

db.connect(err => err ? console.error('MySQL connection error:', err) : console.log('Connected to MySQL'));

// Generate referral code
const generateReferralCode = () => Math.random().toString(36).substring(2, 10);

app.post('/signup', async (req, res) =>
{
	console.log("Signup API hit!");
	console.log(req.body);
	const { firstName, lastName, email, password, referralCode } = req.body;

	try
	{
		// 1. Check if a user with the given email already exists
		console.log(`Query: SELECT * FROM newuser WHERE email = '${email}'`);

		const [existingUser] = await db.promise().query('SELECT * FROM `newuser` WHERE email = ?', [email]);
		if (existingUser.length)
		{
			return res.status(400).json({ error: 'User already exists' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const userId = uuidv4();
		const newReferralCode = generateReferralCode();

		// 2. Insert new user
		await db.promise().query(
			'INSERT INTO newuser (userId, firstName, lastName, email, password, referralCode, totalReferrals, totalEarned) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
			[userId, firstName, lastName, email, hashedPassword, newReferralCode, 0, 0]
		);

		// 3. Handle referral tracking
		if (referralCode)
		{
			const [refResults] = await db.promise().query('SELECT * FROM newuser WHERE referralCode = ?', [referralCode]);
			if (refResults.length)
			{
				await db.promise().query('UPDATE newuser SET totalReferrals = totalReferrals + 1 WHERE userId = ?', [refResults[0].userId]);
			} else
			{
				return res.status(400).json({ error: 'Invalid referral code' });
			}
		}

		res.status(201).json({ message: 'User registered successfully', user: { userId, referralCode: newReferralCode } });

	} catch (error)
	{
		console.error('Signup error:', error.sqlMessage || error.message);
		res.status(500).json({ error: error.sqlMessage || 'Database error during signup' });
	}
});

app.get('/users', async (req, res) =>
{
	console.log("GET /users API hit!");
	try
	{
		const [users] = await db.promise().query('SELECT * FROM newuser');
		res.status(200).json(users);
	} catch (error)
	{
		console.error('Error:', error.message);
		res.status(500).json({ error: 'Database error' });
	}
});

// User Login
app.post('/login', async (req, res) =>
{
	const { email, password } = req.body;

	try
	{
		const [users] = await db.promise().query('SELECT * FROM newuser WHERE email = ?', [email]);
		if (!users.length) return res.status(401).json({ error: 'Invalid email or password' });

		const user = users[0];
		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) return res.status(401).json({ error: 'Invalid email or password' });

		const userID = uuidv4();
		const isAdmin = adminEmails.includes(email);

		// res.json({ message: 'Login successful', userID, redirectPath: isAdmin ? '/admin' : '/user' });
		res.json({ message: 'Login successful', userId: user.userId, role: isAdmin ? 'admin' : 'user' });

	} catch (error)
	{
		console.error('Login error:', error);
		res.status(500).json({ error: 'Database error during login' });
	}
});

// Logout
app.post('/logout', (req, res) =>
{
	const { userID } = req.body;

	if (!userID)
	{
		return res.status(400).json({ message: "User ID is required" });
	}
	// Here, you can remove user session data from DB or cache (if using sessions)
	console.log(`User ${userID} logged out`);
	res.json({ message: 'Logged out successfully' });
});

// Contact Form (using Hostinger SMTP)
app.post('/contact', async (req, res) =>
{
	const { name, email, subject, message } = req.body;

	if (!name || !email || !subject || !message)
	{
		return res.status(400).json({ message: 'All fields are required' });
	}

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		}
	});

	const mailOptions = {
		from: `"${name}" <${email}>`,
		to: `eduproindia25@gmail.com`,
		subject: `Contact Form: ${subject}`,
		text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
	};

	try
	{
		await transporter.sendMail(mailOptions);
		res.status(200).json({ message: 'Message sent successfully!' });
	} catch (error)
	{
		console.error('Error sending email:', error.response || error);
		res.status(500).json({ message: 'Error sending message. Please try again later.' });
	}
});


// Generate Receipt ID
app.post('/generate-receipt-id', (req, res) =>
{
	res.json({ receiptID: `RECEIPT-${Date.now()}-${Math.floor(Math.random() * 1000)}` });
});

app.get('/user', (req, res) =>
{
	res.json({ message: "User route working" });
});

app.get('/user/:userID', async (req, res) =>
{
	try
	{
		console.log("Fetching user:", req.params.id); // Debugging log

		const userId = req.params.id;
		if (!userId)
		{
			return res.status(400).json({ error: "User ID is required" });
		}
		// Query the database to get user details
		const [user] = await db.promise().query('SELECT * FROM newuser WHERE userId = ?', [userId]);

		if (!user.length)
		{
			return res.status(404).json({ error: "User not found" });
		}

		res.status(200).json(user[0]); // Send user details
	} catch (error)
	{
		console.error("Error fetching user:", error); // Log actual error
		res.status(500).json({ message: "Internal server error" });
	}
});

app.get('/user/referral/:userID', async (req, res) =>
{
	const { userID } = req.params;
	console.log("Fetching referral code for User ID:", userID);

	try
	{
		const [user] = await db.query('SELECT referral_code FROM newuser WHERE userID = ?', [userID]);
		console.log("Referral Query Result:", user);

		if (user)
		{
			res.json({ referralCode: user.referral_code });
		} else
		{
			res.status(404).json({ message: "User not found" });
		}
	} catch (error)
	{
		console.error("Database Query Error:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

const formatMySQLDateTime = (isoDate) =>
{
	// Convert ISO Date (2024-02-25T10:30:00Z) to MySQL format (2024-02-25 10:30:00)
	const date = new Date(isoDate);
	return date.toISOString().slice(0, 19).replace('T', ' ');
};

app.post('/save-purchase', (req, res) =>
{
	console.log("Received POST /save-purchase", req.body);

	const { userId, courseId, courseTitle, price, gst, totalAmount, receiptID, purchaseDate } = req.body;

	const formattedDate = formatMySQLDateTime(purchaseDate); 

	const query = `
        INSERT INTO purchases (user_id, course_id, course_title, price, gst, total_amount, receipt_id, purchase_date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

	db.query(
		query,
		[userId, courseId, courseTitle, price, gst, totalAmount, receiptID, formattedDate],
		(err, result) =>
		{
			if (err)
			{
				console.error('Database error:', err);
				return res.status(500).json({ error: 'Error saving purchase', details: err });
			}
			res.status(200).send('Purchase saved successfully');
		}
	);
});


// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
