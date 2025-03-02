import React, { useState } from 'react';
import logo from '../../assets/img/logo/logo.png';
import QrCode from '../../assets/img/gallery/Qrcode.svg';
// import QRCode from 'qrcode.react'; // Make sure to install this package
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css'; // Ensure this path is correct

const CourseRegistration = () =>
{
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const navigate = useNavigate();
	const [showQR, setShowQR] = useState(false);
	const [selectedCourses, setSelectedCourses] = useState([]);
	const courses = [
		{ id: 1, name: 'Basics of stock market', cost: '7000' },
		{ id: 2, name: 'Web Designing', cost: '7000' },
		{ id: 3, name: 'Web Development', cost: '7000' },
		{ id: 4, name: 'Data Science', cost: '7000' },
		{ id: 5, name: 'UI/UX Designing', cost: '7000' },
	];

	const handleCheckboxChange = (courseId) =>
	{
		setSelectedCourses((prevSelected) =>
			prevSelected.includes(courseId)
				? prevSelected.filter((id) => id !== courseId) // Uncheck
				: [...prevSelected, courseId] // Check
		);
	};

	const handleRegisterClick = () =>
	{
		if (selectedCourses.length === 0)
		{
			alert('Please select at least one course to register.');
		} else
		{
			// Handle registration logic here
			alert(`Registered for courses: ${selectedCourses.join(', ')}`);
			// Reset selection if needed
			setSelectedCourses([]);
			setShowQR(true);
		}
	};
	const handleLogout = async () =>
	{
		const sessionId = localStorage.getItem('sessionId');
		if (sessionId)
		{
			try
			{
				await axios.post('http://localhost:5000/logout', { sessionId });
				localStorage.removeItem('sessionId'); // Clear sessionId from localStorage
				setIsLoggedIn(false); // Update login state
				navigate('/'); // Redirect to home page
			} catch (error)
			{
				console.error("Error during logout:", error);
				alert("Logout failed. Please try again.");
			}
		}
	};

	// Payment URL for the QR code
	const paymentUrl = `upi://pay?pa=yourpayee@upi&pn=Your%20Name&am=10000&cu=INR`;

	return (<>
		<div className="header-area ">
			<div className="main-header" style={{ backgroundColor: "coral" }}>
				<div className="header-bottom header-sticky">
					<div className="container-fluid">
						<div className="row align-items-center">
							{/* Logo */}
							<div className="col-xl-2 col-lg-2">
								<div className="logo">
									<Link to="/">
										<img src={logo} alt="Logo" />
									</Link>
								</div>
							</div>
							<div className="col-xl-10 col-lg-10">
								<div className="menu-wrapper d-flex align-items-center justify-content-end">
									{/* Main-menu */}
									<div className="main-menu d-none d-lg-block">
										<nav>
											<ul id="navigation">
												<li className="active"><Link to="/">Home</Link></li>
												<li><Link to="/register">Courses</Link></li>
												{isLoggedIn ? (
													<li className="button-header">
														<button onClick={handleLogout} className="btn btn3">Logout</button>
													</li>
												) : (
													<>
														<li className="button-header margin-left">
															<Link to="/signup" className="btn">Join</Link>
														</li>
														<li className="button-header">
															<Link to="/login" className="btn btn3">Log in</Link>
														</li>
													</>
												)}
											</ul>
										</nav>
									</div>
								</div>
							</div>
							{/* Mobile Menu */}
							<div className="col-12">
								<div className="mobile_menu d-block d-lg-none"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div className='coursemaindiv'>
			<div className='registercourse itm'>
				<h1 className='text-center'>Select the course you want to register</h1>
				<table>
					<thead>
						<tr>
							<th>Select</th>
							<th>Course ID</th>
							<th>Course Name</th>
							<th>Cost</th>
						</tr>
					</thead>
					<tbody>
						{courses.map((course) => (
							<tr key={course.id}>
								<td>
									<input
										type="checkbox"
										checked={selectedCourses.includes(course.id)}
										onChange={() => handleCheckboxChange(course.id)}
									/>
								</td>
								<td>{course.id}</td>
								<td>{course.name}</td>
								<td>{course.cost}</td>
							</tr>
						))}
					</tbody>
				</table>

				<div className="section-tittle text-center mt-20">
					<button onClick={handleRegisterClick} className="btn">Register Now</button>
				</div>
			</div>
			<div className='Ttlcst itm'>
				<h1 className='text-center'>Order Summary</h1>
				<div className='custom-divider'></div>
				{/* <div className="custom-divider"></div> */}
				<h3 className="text-center">Receipt ID: </h3>

				<div className="grid-container">
					<h3>Total No of Courses Selected</h3>
					<h3 className="text-end">90</h3>
				</div>
				<div className="grid-container">
					<h3>GST 5%</h3>
					<h3 className="text-end">₹2000</h3>
				</div>
				<div className="grid-container">
					<h2>Total:</h2>
					<h2 className="text-end">₹6000</h2>
				</div>

				<h3 className="text-center qrimg">Scan to Pay</h3>
				<img src={QrCode} className="qrimg" alt="QR Code" />

							{/* <QRCode value={paymentUrl} size={256} /> Generate the QR code */}
							{/* <button onClick={() => setShowQR(false)}>Close</button> */}
						{/* </div> */}
					{/* </div> */}
				{/* )} */}
			</div>
		</div>
		<div>

		</div>
	</>
	);
};

export default CourseRegistration;
