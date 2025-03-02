import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UPIimage from '../assets/img/gallery/gifs/upiImagge.webp'
import { courses } from './coursepage'; // Import the courses data
import { QRCodeCanvas } from 'qrcode.react';
// import './CourseDetails.css';

const CourseDetails = () =>
{
	const { id } = useParams();
	const navigate = useNavigate();
	const course = courses.find((course) => course.id === parseInt(id));
	const [receiptID, setReceiptID] = useState(null);
	const [showQRCode, setShowQRCode] = useState(false);
	const handleOutsideClick = (e) =>
	{
		if (e.target.className === 'qr-popup')
		{
			closeQRCode();
		}
	};

	const gst = (course?.price * 0.15)?.toFixed(2) || "0.00";
const total = (course?.price + parseFloat(gst))?.toFixed(2) || "0.00";

	// const qrCodeData = `Course: ${course.title}, Price: ₹${total}`;

	const upiID = "vinuthamnv@axl"; // Replace with actual UPI ID
	const payeeName = "Edupro"; // Replace with actual payee name
	const transactionNote = `Payment for ${course.title}`;
	// const qrCodeData = `upi://pay?pa=${upiID}&pn=${encodeURIComponent(
	// 	payeeName
	// )}&tn=${encodeURIComponent(transactionNote)}&am=${total}&cu=INR`;
	const upiPaymentURL = `upi://pay?pa=${upiID}&pn=${encodeURIComponent(
		payeeName
	)}&tn=${encodeURIComponent(transactionNote)}&am=${total}&cu=INR`;


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

	const handleUPIPayment = () =>
	{
		// Redirect the user to their UPI app
		window.location.href = upiPaymentURL;
	};


	return (
		<div className="course-details mt-100">
			{/* <button className="back-button" onClick={() => navigate(-1)}>
				&#8592; Back
			</button> */}

			<div className="course-header">
				<img src={course.image} alt={course.title} className="course-image" />
				<div className="course-info">
					<h1>{course.title}</h1>
					<p>{course.description}</p>
					<h1>What you'll learn</h1>
					<ul>
						{course.whatYouLearn.map((item, index) => (
							<li key={index}>{item}</li>
						))}
					</ul>
					<h3>Price: ₹{course.price}</h3>
					<button className="enroll-button" onClick={handleEnroll}>
						Enroll Now
					</button>
				</div>
			</div>

			{/* What You'll Learn Section */}
			{/* <div className="course-content">
				<h2>What you'll learn</h2>
				<ul>
					{course.whatYouLearn.map((item, index) => (
						<li key={index}>{item}</li>
					))}
				</ul>
			</div> */}

			{/* Free vs Paid Course Details */}


			{/* QR Code Popup */}
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
