import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const TopicCard = ({ imageSrc, title }) => (
	<div className="col-lg-3 col-md-4 col-sm-6">
		<div className="single-topic text-center mb-30">
			<div className="topic-img">
				<img src={imageSrc} alt={title} />
				<div className="topic-content-box">
					<div className="topic-content">
						<h3><a href="#">{title}</a></h3>
					</div>
				</div>
			</div>
		</div>
	</div>
);

const TopicArea = () =>
{
	const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('userId'));
	const [userId, setUserId] = useState(localStorage.getItem('userId') || "");
	const navigate = useNavigate();
	useEffect(() =>
	{
		const handleStorageChange = () =>
		{
			const storedUserId = localStorage.getItem('userId');
			setIsLoggedIn(!!storedUserId);
			setUserId(storedUserId);
		};

		// Listen for login/logout changes
		window.addEventListener('storage', handleStorageChange);
		return () =>
		{
			window.removeEventListener('storage', handleStorageChange);
		};
	}, []);
	return (
		<div className="topic-area section-padding40">
			<div className="container">

				{/* Section Title */}
				<div className="row justify-content-center">
					<div className="col-xl-7 col-lg-8">
						<div className="section-tittle text-center mb-55">
							<h2>Explore top subjects</h2>
						</div>
					</div>
				</div>

				{/* Topics Grid */}
				<div className="row">
					<TopicCard imageSrc={require("../assets/img/gallery/topic2.jpg")} title="Programming" />
					<TopicCard imageSrc={require("../assets/img/gallery/topic2.jpg")} title="Digital Marketing" />
					<TopicCard imageSrc={require("../assets/img/gallery/topic2.jpg")} title="Data Science" />
					<TopicCard imageSrc={require("../assets/img/gallery/topic2.jpg")} title="Graphic Designing" />
					<TopicCard imageSrc={require("../assets/img/gallery/topic2.jpg")} title="Interior Designing" />
					<TopicCard imageSrc={require("../assets/img/gallery/topic2.jpg")} title="Web Designing" />
					<TopicCard imageSrc={require("../assets/img/gallery/topic2.jpg")} title="Programming" />
					<TopicCard imageSrc={require("../assets/img/gallery/topic2.jpg")} title="Virtual Assisting" />
				</div>

				{/* View More Button */}
				<div className="row justify-content-center">
					<div className="col-xl-12">
						<div className="section-tittle text-center mt-20">
							{/* <a href="/main" className="border-btn">View More Subjects</a> */}
							{isLoggedIn ? (
								<a href="/main" className="border-btn">View More Subjects</a>
								// <Link to="/main">Courses</Link>
							) : (
								// <Link to="/signup" onClick={() => alert("Please sign up to access courses.")}>
									// Courses
								< a href="/signup" className="border-btn">View More Subjects</a>
								// </Link>
							)}
						</div>
					</div>
				</div>

			</div>
		</div>
	);
};

export default TopicArea;
