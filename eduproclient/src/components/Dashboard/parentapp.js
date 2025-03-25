import React, { useEffect, useState } from "react";
import CertificateGenerator from "./certificateGenerator";
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () =>
{
	const [user, setUser] = useState(null);
	const [purchasedCourse, setPurchasedCourse] = useState("");
	const [userData, setUserData] = useState({
		firstName: "",
	});
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const navigate = useNavigate();

	useEffect(() =>
	{
		const userId = localStorage.getItem('userId');
		setIsLoggedIn(!!userId);
	}, []);

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

				// Find the user by userId instead of email
				const user = users.find(user => user.userId === storedUserId);

				if (user)
				{
					setUserData({
						firstName: user.firstName,
						referralCode: user.referralCode,
						totalReferrals: user.totalReferrals
					});
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

	useEffect(() =>
	{
		// Simulating fetching user and purchased course data
		const fetchData = async () =>
		{
			const fetchedUser = { name: "Nick Gromicko" }; // Replace with API call to fetch user data
			const fetchedCourse = "Structural Issues for Home Inspectors"; // Replace with API call
			setUser(fetchedUser);
			setPurchasedCourse(fetchedCourse);
		};

		fetchData();
	}, []);

	if (!user || !purchasedCourse)
	{
		return <p>Loading...</p>;
	}

	return (
		<div className="mt-150">
			<h1 className="course-completion-message">Congratulations, {userData.firstName}!</h1>
			<p className="course-completion-message">You have successfully completed the course and have gained valuable knowledge.
				We are excited to inform you that you are now <b>eligible to download</b> your course completion certificate.
				This achievement reflects your dedication and hard work.
				Download your certificate today to showcase your accomplishment and add it to your professional portfolio.
				Keep up the great work, and continue learning to unlock new opportunities!</p>
			<div className="custom-divider"></div>
			<CertificateGenerator user={user} purchasedCourse={purchasedCourse} />
		</div>
	);
};

export default Dashboard;
