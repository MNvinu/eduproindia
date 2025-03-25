import React, { useState,useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UPIimage from '../assets/img/gallery/gifs/upiImagge.webp'
import StarIcon from "@mui/icons-material/Star";
import PeopleIcon from "@mui/icons-material/People";
import { Grid, Card, CardContent,Typography, Divider, Box, Rating } from '@mui/material';
import { courses } from './coursepage'; // Import the courses data
import { QRCodeCanvas } from 'qrcode.react';
// import './CourseDetails.css';

const CourseDetails = () =>
{
	const { id } = useParams();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const navigate = useNavigate();
	const course = courses.find((course) => course.id === parseInt(id));
	const [receiptID, setReceiptID] = useState(null);
	const [showQRCode, setShowQRCode] = useState(false);
	const gst = (course?.price * 0.15)?.toFixed(2) || "0.00";
	const total = (course?.price + parseFloat(gst))?.toFixed(2) || "0.00";
	const upiID = "vinuthamnv@axl"; 
	const payeeName = "Edupro"; 
	const transactionNote = `Payment for ${course.title}`;
	const upiPaymentURL = `upi://pay?pa=${upiID}&pn=${encodeURIComponent(
		payeeName
	)}&tn=${encodeURIComponent(transactionNote)}&am=${total}&cu=INR`;

	const handleOutsideClick = (e) =>
	{
		if (e.target.className === 'qr-popup')
		{
			closeQRCode();
		}
	};

	useEffect(() =>
	{
		const userId = localStorage.getItem('userId');
		setIsLoggedIn(!!userId);
	}, []);

	if (!course)
	{
		console.error("Course not found for ID:", id);
		return <div>Course not found</div>;
	}

	const fetchReceiptID = async () =>
	{
		try
		{
			const response = await fetch('http://localhost:5000/generate-receipt-id', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const data = await response.json();
			setReceiptID(data.receiptID);
		} catch (error)
		{
			console.error('Error fetching receipt ID:', error);
		}
	};

	const handleEnroll = async () =>
	{
		await fetchReceiptID();
		setShowQRCode(true);
	};

	const closeQRCode = () =>
	{
		setShowQRCode(false);
	};

	const handleUPIPayment = async () =>
	{
		window.location.href = upiPaymentURL;
		setTimeout(() =>
		{
			savePurchaseDetails();
		}, 5000);
	};

	const savePurchaseDetails = async () =>
	{
		const userId = localStorage.getItem('userId');
		const purchaseData = {
			userId: userId, // Replace with actual user ID from authentication
			courseId: course.id,
			courseTitle: course.title,
			price: course.price,
			gst: gst,
			totalAmount: total,
			receiptID: receiptID,
			purchaseDate: new Date().toISOString(),
		};
		try
		{
			const response = await fetch('http://localhost:5000/api/save-purchase', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(purchaseData),
			});

			if (response.ok)
			{
				alert('Payment successful! Purchase details saved.');
				navigate('/dashboard'); // Redirect after successful payment
			} else
			{
				console.error('Error saving purchase details:', response.statusText);
			}
		} catch (error)
		{
			console.error('Error:', error);
		}
	};


	return (
		
		<div className="course-details mt-100">
			{/* <button className="back-button" onClick={() => navigate(-1)}>
				&#8592; Back
			</button> */}
			<div className=" ml-50 mr-50">
				<CardContent>
					<Typography variant="h4" color="textSecondary" gutterBottom>
						Courses &gt; {course.title}
					</Typography>

					<Typography variant="h3" fontWeight="bold" gutterBottom>
						{/* HTML and CSS for Beginners - Build a Website & Launch ONLINE */}
						{course.description}
					</Typography>

					<Typography variant="h4" color="textSecondary" gutterBottom>
						HTML and CSS for Beginners course will give you all the knowledge you
						need to master HTML and CSS easily and quickly.
					</Typography>

					<Typography variant="h5" color="primary" gutterBottom>
						Access this top-rated course, plus 1000+ more top-rated courses, with a EduProIndia plan.
					</Typography>

					<Typography variant="h5" color="textSecondary">
						Last updated 10/2024
					</Typography>

					<Grid container spacing={2} alignItems="center" sx={{ mt: 2 }}>
						<Grid item>
							<Box display="flex" alignItems="center">
								<StarIcon sx={{ color: "#FFA41B" }} />
								<Typography variant="h4" sx={{ ml: 0.5 }}>
									4.4
								</Typography>
							</Box>
							<Typography variant="h5" color="textSecondary">
								36,983 ratings
							</Typography>
						</Grid>

						<Grid item>
							<Box display="flex" alignItems="center">
								<PeopleIcon sx={{ color: "#6C757D" }} />
								<Typography variant="h4" sx={{ ml: 0.5 }}>
									371,086
								</Typography>
							</Box>
							<Typography variant="h5" color="textSecondary">
								learners
							</Typography>
						</Grid>
					</Grid>
					<Divider sx={{ my: 3 }} />

					<Typography variant="h4" fontWeight="bold" gutterBottom>
						What you'll learn
					</Typography>

					<Grid container spacing={2}>
						<Grid item xs={6}>
							<ul>
								<li>You will Learn HTML</li>
								<li>You will get a certification after the course that you can print</li>
							</ul>
						</Grid>
						<Grid item xs={6}>
							<ul >
								<li>You will learn CSS</li>
								<li>You will get the skills you need to make websites</li>
							</ul>
						</Grid>
					</Grid>
					<Typography variant="h5" gutterBottom>
						Duration: {course.duration} | {course.level}
					</Typography>
					<h3 className='mt-10'>Price: ₹{course.price}</h3>
					{/* <button className="theme btn" size="large">
						Get Started
					</button> */}
					<button className="theme btn" onClick={handleEnroll}>
						Enroll Now
					</button>
				</CardContent>

			</div>

			{/* <div className="course-header">
				<img src={course.image} alt={course.title} className="course-image" />
				<div className="course-info">
					<h1>{course.title}</h1>
					<p >{course.description}</p>
					<h1>What you'll learn</h1>
					<ul className='mb-10'>
						{course.whatYouLearn.map((item, index) => (
							<li key={index}>{item}</li>
						))}
					</ul>
					<Typography variant="h5" gutterBottom>
						Duration: {course.duration} | {course.level}
					</Typography>
					<Box display="flex" alignItems="center" gutterBottom>
						<Rating value={course.rating} precision={0.1} readOnly />
						<Typography variant="h5" sx={{ marginLeft: '8px' }}>
							{course.rating} ({course.totalReviews} reviews)
						</Typography>
					</Box>
					<h3 className='mt-10'>Price: ₹{course.price}</h3>
					<button className="enroll-button" onClick={handleEnroll}>
						Enroll Now
					</button>
					
				</div>
			</div>
			 */}

			{showQRCode && (
				<div className="qr-popup" onClick={handleOutsideClick}>
					<div className="qr-content">
						<div className="order-summary">
							<div className="order-item">
								<span className="label">Order Details</span>
								<button className="close-button" onClick={closeQRCode}>
									✖
								</button>
							</div>
						</div>

						<div className="custom-divider"></div>
						<div className="order-summary">
							<div className="order-item">
								<span className="label">Receipt ID:</span>
								<span className="value"><span className="value">{receiptID || 'Loading...'}</span></span>
							</div>
							<div className="order-item">
								<span className="label">Course:</span>
								<span className="value">{course.title}</span>
							</div>
							<div className="order-item">
								<span className="label">Price:</span>
								<span className="value">₹{course.price}</span>
							</div>
							<div className="order-item">
								<span className="label">GST:</span>
								<span className="value">{gst}</span>
							</div>
							<div className="order-item total">
								<span className="label">TOTAL:</span>
								<span className="value">₹{total}</span>
							</div>
						</div>

						<div className="payment-options">
							<div className="payment-option">
								<h3>Pay via QR Code</h3>
								<QRCodeCanvas value={upiPaymentURL} size={180} />
								<p>Scan this code to pay ₹{total}.</p>
							</div>
							<div className="payment-option">
								<h3>Pay via UPI</h3>
								<img
									src={UPIimage}
									size={180}// Replace with the correct path
									alt="UPI Payment"
									className="upi-image"
								/>
								<button className="upi-button" onClick={handleUPIPayment}>
									Open UPI App
								</button>
								<p>This will redirect you to your UPI app (PhonePe, Google Pay, or Paytm).</p>
							</div>
						</div>

					</div>
				</div>

			)}
		</div>

	);
};

export default CourseDetails;
