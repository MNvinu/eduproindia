import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
	const [userData, setUserData] = useState({
		firstName: "",
		referralCode: "",
		totalReferrals: 0
	});
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const navigate = useNavigate();

	// useEffect(() =>
	// {
	// 	const userId = localStorage.getItem('userId');
	// 	setIsLoggedIn(!!userId);
	// }, []);

	useEffect(() =>
	{
		const storedUserId = localStorage.getItem('userId');
		setIsLoggedIn(!!storedUserId);

		// Load userData from localStorage
		const storedUserData = localStorage.getItem('userData');
		if (storedUserData)
		{
			setUserData(JSON.parse(storedUserData));
		}
	}, []);

	const updateUserData = (newData) =>
	{
		setUserData(prevData =>
		{
			const updatedData = { ...prevData, ...newData };
			localStorage.setItem('userData', JSON.stringify(updatedData));
			return updatedData;
		});
	};

	useEffect(() =>
	{
		const fetchData = async () =>
		{
			const storedUserId = localStorage.getItem("userId");
			if (!storedUserId)
			{
				console.error("User ID is missing!");
				navigate('/login'); // Redirect to login if userId is missing
				return;
			}
			try
			{
				// Fetch users
				const usersResponse = await axios.get('http://localhost:8880/users');
				console.log("API Response:", usersResponse.data);
				const users = usersResponse.data;

				// Find the user by userId
				const user = users.find(user => user.userId === storedUserId);

				if (user)
				{
					const userData = {
						firstName: user.firstName,
						referralCode: user.referralCode,
						totalReferrals: user.totalReferrals
					};
					// Store in localStorage for persistence
					localStorage.setItem('userData', JSON.stringify(userData));
					setUserData(userData);
				} else
				{
					console.error("User not found in database.");
				}
			} catch (error)
			{
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, [navigate]);

	const copyReferralCode = () =>
	{
		navigator.clipboard.writeText(userData.referralCode);
		alert("Referral code copied!");
	};


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
								{/* Mobile Menu */}
								<div className="col-12">
									<div className="mobile_menu d-block d-lg-none"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="userheader mt-50">
				<div className="row align-items-center">
					<div className="col-sm mb-2 mb-sm-0">
						<h1 className="page-header-title my-5">Welcome, {userData.firstName}!</h1>
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
								value={userData.referralCode}
							/>
							<Tooltip title="Copy to clipboard">
								<IconButton aria-label="copy referral code" onClick={copyReferralCode}>
									<ContentCopyIcon />
								</IconButton>
							</Tooltip>
						</div>
					</div>
				</div>
				<hr className="custom-divider" />
				<div className="row mt-4">
					<div className="col-lg-4">
						<div className="text-center">
							<img src={course} className="avatar avatar-xl avatar-4x3 mb-4" alt="Logo" style={{ height: "100px" }} />
							<br />
							<span className="text-cap text-body"> Courses Registered</span>
							<span className="d-block display-4 text-dark mb-2">2</span>
						</div>
					</div>

					<div className="col-lg-4">
						<div className="text-center">
							<img src={no_ofreferal} className="avatar avatar-xl avatar-4x3 mb-4" alt="Logo" style={{ height: "100px" }} />
							<br />
							<span className="text-cap text-body"> Your Number of Referrals</span>
							<span className="d-block display-4 text-dark mb-2">{userData.totalReferrals}</span>
						</div>
					</div>

					<div className="col-lg-4">
						<div className="text-center">
							{/* <img className="avatar avatar-xl avatar-4x3 mb-4" src="./assets/svg/illustrations/oc-money-profits.svg" alt="Amount earned" style={{ minHeight: '6rem' }} /> */}
							<img src={amountearned} className="avatar avatar-xl avatar-4x3 mb-4" alt="Logo" style={{ height: "100px" }} />
							<br />
							<span className="text-cap text-body">Amount earned</span>
							<span className="d-block display-4 text-dark mb-2">0.00</span>

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
					<table className="coursetbl my-5">
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
