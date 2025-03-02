import React, { useEffect, useState } from "react";
import CertificateGenerator from "./certificateGenerator";

const Dashboard = () =>
{
	const [user, setUser] = useState(null);
	const [purchasedCourse, setPurchasedCourse] = useState("");

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
			<h1 className="course-completion-message">Congratulations, {user.name}!</h1>
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
