import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const courses = [
	{
		id: 1,
		title: "Web Designing",
		category: "User Experience",
		description: "Learn the art of creating visually stunning, user-friendly websites with HTML, CSS, and JavaScript.",
		rating: 4.5,
		reviews: 120,
		price: 10000,
		imgSrc: "assets/img/gallery/featured1.png",
	},
	{
		id: 2,
		title: "Digital Marketing",
		category: "User Experience",
		description: "Master social media, SEO, and digital advertising to boost online presence and drive engagement.",
		rating: 4.5,
		reviews: 120,
		price: 8000,
		imgSrc: "assets/img/gallery/featured2.png",
	},
	{
		id: 3,
		title: "Data Science",
		category: "User Experience",
		description: "Dive into data analytics, machine learning, and AI to uncover insights and solve real-world problems.",
		rating: 4.5,
		reviews: 120,
		price: 15000,
		imgSrc: "assets/img/gallery/featured3.png",
	},
	{
		id: 4,
		title: "Graphic Design",
		category: "User Experience",
		description: "Discover the fundamentals of design and create captivating visuals using tools like Adobe Photoshop and Illustrator.",
		rating: 4.5,
		reviews: 120,
		price: 11500,
		imgSrc: "assets/img/gallery/featured2.png",
	},
];

const CoursesArea = () =>
{
	const navigate = useNavigate();
	const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('userId'));
	const [userId, setUserId] = useState(localStorage.getItem('userId') || "");

	useEffect(() =>
		{
			const handleStorageChange = () =>
			{
				const storedUserId = localStorage.getItem('userId');
				setIsLoggedIn(!!storedUserId);
				setUserId(storedUserId);
			};
			window.addEventListener('storage', handleStorageChange);
			return () =>
			{
				window.removeEventListener('storage', handleStorageChange);
			};
		}, []);
	useEffect(() =>
	{
		const userToken = localStorage.getItem('authToken');
		if (userToken)
		{
			setIsLoggedIn(true);
		}
	}, []);

	return (
		<div className="courses-area section-padding40 ">
			<div >
				<div className="row justify-content-center">
					<div className="col-xl-7 col-lg-8">
						<div className="section-tittle text-center mb-55">
							<h2>Our featured courses</h2>
						</div>
					</div>
				</div>
				<div className="courses_active">
					<div className='slick-list draggable'>
						{courses.map((course) => (
							<div className="properties pb-20" key={course.id}>
								<div className="properties__card">
									<div className="properties__img overlay1">
										{/* <a href="#"><img src={course.imgSrc} alt={course.title} /></a> */}
									</div>
									<div className="properties__caption">
										{/* <p>{course.category}</p> */}
										<h3><a href="#">{course.title}</a></h3>
										<p>{course.description}</p>
										<div className="properties__footer d-flex justify-content-between align-items-center">
											<div className="restaurant-name">
												<div className="rating">
													{[...Array(5)].map((_, index) => (
														<i
															key={index}
															className={`fas ${index < Math.floor(course.rating) ? "fa-star" : index < course.rating ? "fa-star-half" : "fa-star"}`}
														></i>
													))}
												</div>
												<p><span>({course.rating})</span> based on {course.reviews}</p>
											</div>
											<div className="price">
											</div>
										</div>
										
										<Link to="/main" className="btn hero-btn" data-animation="fadeInLeft" data-delay="0.7s">
											Find out more
										</Link>
										
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CoursesArea;
