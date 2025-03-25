import React, { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import logo from "../../assets/img/logo/eduprologo.PNG"; // Replace with the path to your logo image

const CertificateViewer = () =>
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

	// const downloadCertificate = () =>
	// {
	// 	const doc = new jsPDF({
	// 		orientation: "landscape",
	// 		unit: "px",
	// 		format: "a4",
	// 	});

	// 	// Generate certificate with jsPDF
	// 	doc.setDrawColor(201, 172, 112);
	// 	doc.setLineWidth(4);
	// 	doc.rect(20, 20, doc.internal.pageSize.width - 40, doc.internal.pageSize.height - 40, "S");

	// 	const logoWidth = 100;
	// 	const logoX = doc.internal.pageSize.width / 2 - logoWidth / 2;
	// 	doc.addImage(logo, "PNG", logoX, 30, logoWidth, 100);

	// 	doc.setFont("Times", "bold");
	// 	doc.setFontSize(32);
	// 	doc.text("Certificate of Completion", doc.internal.pageSize.width / 2, 150, { align: "center" });

	// 	doc.setFont("Times", "normal");
	// 	doc.setFontSize(20);
	// 	doc.text("This certificate is awarded to", doc.internal.pageSize.width / 2, 190, { align: "center" });

	// 	doc.setFont("Times", "bold");
	// 	doc.setFontSize(28);
	// 	doc.text(user.name, doc.internal.pageSize.width / 2, 230, { align: "center" });

	// 	doc.setFont("Times", "normal");
	// 	doc.setFontSize(18);
	// 	doc.text(
	// 		`For successfully completing the online course: "${purchasedCourse}"`,
	// 		doc.internal.pageSize.width / 2,
	// 		270,
	// 		{ align: "center" }
	// 	);

	// 	const issuedOn = new Date().toLocaleDateString();
	// 	doc.setFont("Times", "italic");
	// 	doc.setFontSize(15);
	// 	doc.text(`Issued on: ${issuedOn}`, 50, doc.internal.pageSize.height - 50);

	// 	doc.save(`${user.name}_certificate.pdf`);
	// };
	const downloadCertificate = async () =>
	{
		const certificateElement = document.querySelector(".certificate-layout");

		if (!certificateElement) return;

		// Capture the certificate as an image
		const canvas = await html2canvas(certificateElement, { scale: 2 });
		const imgData = canvas.toDataURL("image/png");

		// Create a PDF with the captured image
		const pdf = new jsPDF({
			orientation: "landscape",
			unit: "px",
			format: [canvas.width, canvas.height],
		});

		pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
		pdf.save(`${userData.firstName}_certificate.pdf`);
	};
	return (
		<div style={{ textAlign: "center" }}>
			<div class="certificate-layout">
				<div class="certificate-left">
					<div class="certificate-container">
						<div class="certificate-header">
							<h1>CERTIFICATE OF COMPLETION</h1>
						</div>
						<div class="certificate-body">
							<div class="certificate-logo">
								<img src={logo} alt="Logo" />
								<h3>EDUPROINDIA</h3>
							</div>
							<p>This is to certify that</p>
							<h2 class="certificate-name">{userData.firstName}</h2>
							<p>has successfully completed</p><b>Free Finance Online Course</b>
							<p>This certificate is awarded in recognition of their dedication and commitment to enhancing their skills and knowledge.</p>
						</div>
						<div class="certificate-footer">
							<div class="certificate-id">
								<p>ID: FS84CPoVD</p>
								<p>Issued On: 19/02/2025</p>
							</div>
							<div class="certificate-signatures">
								<div>
									<p>Course Director</p>
									<p>Signer Name</p>
								</div>
								{/* <div>
							<p>Head of Training</p>
							<p>Signer Name</p>
						</div> */}
								<div>
									<p>Course Mentor</p>
									<p>Signer Name</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="certificate-right">
					<p class="extra-content">
						You can explore and enroll in more courses to enhance your skills.
						Visit <strong>EduProIndia</strong> today and continue your learning journey.
					</p>
					<p className="extra-content mt-3"><ul>Join a growing community of learners at EduProIndia and take your career to new heights!

						Discover a wide range of courses tailored for skill enhancement and professional growth.

						Start your journey today and explore the possibilities.</ul></p>

					<p>💡 Enroll Now to unlock your potential and achieve your goals."</p>
					<button
						style={{
							padding: "10px 20px",
							fontSize: "16px",
							backgroundColor: "#008CBA",
							color: "white",
							border: "none",
							borderRadius: "5px",
							cursor: "pointer",
							marginTop: "20px",
						}}
						onClick={downloadCertificate}
					>
						Download Certificate
					</button>
				</div>
			</div>
		</div>
	);
};

export default CertificateViewer;
