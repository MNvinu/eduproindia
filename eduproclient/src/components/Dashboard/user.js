// AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logo/logo.png';
import no_ofreferal from '../../assets/img/gallery/no_ofreferal.png';
import course from '../../assets/img/gallery/course.png';
import amountearned from '../../assets/img/gallery/amountearned.webp';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton, Tooltip } from '@mui/material';
import axios from 'axios';
import './style.css'

function UserDashboard()
{
	const [users, setUsers] = useState([]);
	const [userName, setUserName] = useState('');
	const [loading, setLoading] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	// const [referralCode, setReferralCode] = useState('');
	const [userData, setUserData] = useState({
		firstname: "",
		referralCode: "",
		totalReferrals: 0
	});
	const navigate = useNavigate();
	const email = localStorage.getItem("email");

	const handleLogout = async () =>
	{
		try
		{
			const userId = localStorage.getItem('userId'); // Get stored userId
			if (!userId)
			{
				console.error("No userId found");
				return;
			}

			await axios.post('http://localhost:8880/logout', { userID: userId })
				.then(response => console.log("Logout successful:", response))
				.catch(error => console.error("Logout error:", error.response ? error.response.data : error.message));

			// Clear localStorage
			localStorage.removeItem('userId');
			localStorage.removeItem('referralCode');

			// Redirect to login page
			window.location.href = '/login';
		} catch (error)
		{
			console.error("Logout failed:", error);
		}
	};

	useEffect(() =>
	{
		const fetchData = async () =>
		{
			const userId = localStorage.getItem('userId');
			console.log("User ID:", userId);
			if (!userId)
			{
				console.error("User ID not found in localStorage");
				navigate('/login');
				return;  // Stop execution if userId is missing
			}

			try
			{
				// Fetch all users
				const usersResponse = await axios.get('http://localhost:8880/user');
				console.log("Users API response:", usersResponse.data); // Debugging

				// Ensure the API actually returns an array of users
				if (!Array.isArray(usersResponse.data))
				{
					console.error("Unexpected response format:", usersResponse.data);
					return;
				}

				const users = usersResponse.data;
				setUsers(users);

				// Find the logged-in user by email
				const user = users.find(user => user.email === email);
				if (user)
				{
					setUserData({
						firstname: user.firstName,
						referralCode: user.referralCode,
						totalReferrals: user.totalReferrals
					});
				}

				// Fetch specific user details by ID
				const userResponse = await axios.get(`http://localhost:8880/user/${userId}`);
				console.log("User API response:", userResponse.data); // Debugging

				if (userResponse.data && userResponse.data.firstname)
				{
					setUserName(userResponse.data.firstname);
				} else
				{
					console.warn("No userName found in response data");
				}
			} catch (error)
			{
				console.error("Error fetching data:", error);
			} finally
			{
				setLoading(false);
			}
		};

		fetchData();
	}, [email, navigate]);

	return (
		<div>
			<div className="header-area ">
				<div className="main-header">
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
															<button onClick={handleLogout} className="btn">Logout</button>
														</li>
													) : (
														<>
															<li className="button-header margin-left">
																<Link to="/signup" className="header-btn">Sign up</Link>
															</li>
															<li className="button-header">
																<Link to="/login" className="header-btn">Log In</Link>
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

			<div className="userheader" style={{ marginTop: "2%" }}>
				<div className="row align-items-center">
					<div className="col-sm mb-2 mb-sm-0">
						<h2>Welcome, {userData.firstname}!</h2>
						<h1 className="page-header-title my-5">Referrals</h1>
					</div>

					<div className="col-sm-6 col-md-5 col-lg-4">
						<h3 className="text-cap">Your referral code:</h3>
						<div className="input-group">
							<input
								style={{ fontSize: "16px" }}
								id="referralCode"
								type="text"
								className="form-control"
								readOnly
								value={ userData.referralCode }
							/>
							{/* <Tooltip title="Copy to clipboard">
								<IconButton onClick={handleCopyToClipboard} aria-label="copy referral code">
									<ContentCopyIcon />
								</IconButton>
							</Tooltip> */}
						</div>
					</div>
				</div>
				<hr className="custom-divider" />
				<div className="row mt-4">
					<div className="col-lg-4">
						<div className="text-center">
							<img src={course} className="avatar avatar-xl avatar-4x3 mb-4" alt="Logo" style={{ height: "100px" }} />
							<br/>
							<span className="text-cap text-body"> Courses Registered</span>
							<span className="d-block display-4 text-dark mb-2">8</span>

							<div className="row col-divider">
								<div className="col text-end">
									<span className="d-block fw-semibold text-success">
										<i className="bi-graph-up"></i> 5.6%
									</span>
									<span className="d-block">change</span>
								</div>
								<div className="col text-start">
									<span className="d-block fw-semibold text-dark">$582.00</span>
									<span className="d-block">last week</span>
								</div>
							</div>
						</div>
					</div>

					<div className="col-lg-4">
						<div className="text-center">
							<img src={no_ofreferal} className="avatar avatar-xl avatar-4x3 mb-4" alt="Logo" style={{ height: "100px" }} />
							<br />
							<span className="text-cap text-body"> Your Number of Referrals</span>
							<span className="d-block display-4 text-dark mb-2">{ userData.totalReferrals }</span>
						</div>
					</div>

					<div className="col-lg-4">
						<div className="text-center">
							{/* <img className="avatar avatar-xl avatar-4x3 mb-4" src="./assets/svg/illustrations/oc-money-profits.svg" alt="Amount earned" style={{ minHeight: '6rem' }} /> */}
							<img src={amountearned} className="avatar avatar-xl avatar-4x3 mb-4" alt="Logo" style={{ height: "100px" }} />
							<br/>
							<span className="text-cap text-body">Amount earned</span>
							<span className="d-block display-4 text-dark mb-2">$53.00</span>

							<div className="row col-divider">
								<div className="col text-end">
									<span className="d-block fw-semibold text-success">
										<i className="bi-graph-up"></i> 5.6%
									</span>
									<span className="d-block">change</span>
								</div>
								<div className="col text-start">
									<span className="d-block fw-semibold text-dark">$582.00</span>
									<span className="d-block">last week</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="my-5">
					<p className="text-muted">
						<i className="bi-exclamation-octagon"></i> Last referral: August 25, 2020.
					</p>
				</div>

				<div>
					<h1 className="my-5">No of Courses Registered</h1>
					<table className="my-5">
						<thead >
							<tr>
								<th>Course Id</th>
								<th>Course Name</th>
							</tr>
						</thead>
						{/* <tbody>
							{users.map((course, index) => (
								<tr key={index}>
									<td>{course.courseId}</td>
									<td>{course.courseName}</td>
								</tr>
							))}
						</tbody> */}
					</table>
				</div>
			</div>
		</div>
	);
}

export default UserDashboard;
