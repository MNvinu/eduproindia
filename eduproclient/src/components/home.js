import React, { useState, useEffect } from 'react';
import CoursesArea from './courses';
import AboutSection from './about';
import TopicArea from './topic';
import MainContent from './aboutarea'
import ContactForm from './contact';
import { Link, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const YourComponent = () =>
{
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

	return (
		<>
			<section className="slider-area">
				<div className="slider-active">
					<div className="single-slider slider-height d-flex align-items-center">
						<div className="container">
							<div className="row head">
								<div className="col-xl-6 col-lg-7 col-md-12">
									<h1 data-animation="fadeInLeft" data-delay="0.2s" className='hero__caption_main'>
										EduProIndia
									</h1>
									<div className="hero__caption">
										<h1 className='hero__caption_sec' data-animation="fadeInLeft" data-delay="0.2s">
											Elevate Your Skills,<br /> Shape Your Future.
										</h1>
										{/* <p data-animation="fadeInLeft" data-delay="0.4s">
											Build skills with courses, certificates, and degrees online from world-class universities and companies.
										</p> */}
										<p className='hero__caption_thi'>Learn at your own pace and unlock new opportunities in high-demand fields.</p>

										{!isLoggedIn ? (
											<Link to="/signup" className="btn hero-btn" data-animation="fadeInLeft" data-delay="0.7s">
												Join Now
											</Link>
										) : (
											<Link to="/main" className="btn hero-btn" data-animation="fadeInLeft" data-delay="0.7s">
												Explore Now
											</Link>
										)}

									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Services Area */}
			<div className="services-area mt-50">
				<div className="section-title text-center position-relative pb-3 mb-5 mx-auto" style={{ maxWidth: "600px" }}>
					{/* <h5 className="fw-bold text-primary text-uppercase">Why Choose Us</h5> */}
					{/* <h1 className="mb-0">We Are Here to Grow Your Business Exponentially</h1> */}
					<h1 className="mb-0">Why Choose Us</h1>
				</div>
				<div className="container">
					<div className="row justify-content-sm-center">
						<div className="col-lg-4 col-md-6 col-sm-8 ">
							<div className="single-services mb-30 Menucard">
								<div className="features-icon">

								</div>
								<div className="features-caption">
									<h3>20+ courses</h3>
									<p>Explore a diverse and exciting range of over 20 courses designed to boost your skills and career.</p>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-6 col-sm-8">
							<div className="single-services mb-30 Menucard">
								<div className="features-icon">
									{/* <img src="assets/img/icon/icon2.svg" alt="Icon 2" /> */}
								</div>
								<div className="features-caption">
									<h3>Expert instructors</h3>
									<p>Learn from industry experts with years of experience and deep knowledge in their fields.</p>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-6 col-sm-8">
							<div className="single-services mb-30 Menucard">
								<div className="features-icon">
									{/* <img src="assets/img/icon/icon3.svg" alt="Icon 3" /> */}
								</div>
								<div className="features-caption">
									<h3>Lifetime access</h3>
									<p>Enjoy unlimited access to all course content for a lifetime, allowing you to learn at your own pace.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="container-fluid py-5 wow fadeInUp tpc" data-wow-delay="0.1s">
				<div className="container py-5">
					<div className="section-title text-center position-relative pb-3 mb-5 mx-auto" style={{ maxWidth: "600px" }}>
						<h5 className="fw-bold text-primary text-uppercase">Explore Our Courses</h5>
						<h1 className="mt-20">We Are Here to Grow Your Skills Exponentially</h1>
					</div>
					<div className="row g-5">
						<div className="col-lg-4">
							<div className="row g-5">
								<div className="col-12 wow zoomIn" data-wow-delay="0.2s">
									<div className="bg-primary theme rounded d-flex align-items-center justify-content-center mb-3" style={{ width: "60px", height: "60px" }}>
										<i className="fa fa-cubes text-white"></i>
									</div>
									<h1>Web Designing</h1>
									<p className="mb-30 pd">Magna sea eos sit dolor, ipsum amet lorem diam dolor eos et diam dolor</p>
								</div>
								<div className="col-12 wow zoomIn" data-wow-delay="0.6s">
									<div className="bg-primary theme rounded d-flex align-items-center justify-content-center mb-3" style={{ width: "60px", height: "60px" }}>
										<i className="fa fa-cubes text-white"></i>
									</div>
									<h1>Data Science</h1>
									<p className="mb-10 pd">Magna sea eos sit dolor, ipsum amet lorem diam dolor eos et diam dolor</p>
								</div>
							</div>
						</div>
						<div className="col-lg-4">
							<div className="row g-5">
								<div className="col-12 wow zoomIn" data-wow-delay="0.2s">
									<div className="bg-primary theme rounded d-flex align-items-center justify-content-center mb-3" style={{ width: "60px", height: "60px" }}>
										<i className="fa fa-cubes text-white"></i>
									</div>
									<h1>Graphic Designing</h1>
									<p className="mb-30 pd">Magna sea eos sit dolor, ipsum amet lorem diam dolor eos et diam dolor</p>
								</div>
								<div className="col-12 wow zoomIn" data-wow-delay="0.6s">
									<div className="bg-primary theme rounded d-flex align-items-center justify-content-center mb-3" style={{ width: "60px", height: "60px" }}>
										<i className="fa fa-cubes text-white"></i>
									</div>
									<h1>UI/UX</h1>
									<p className="mb-10 pd">Magna sea eos sit dolor, ipsum amet lorem diam dolor eos et diam dolor</p>
								</div>
							</div>
						</div>
						<div className="col-lg-4">
							<div className="row g-5">
								<div className="col-12 wow zoomIn" data-wow-delay="0.4s">
									<div className="bg-primary theme rounded d-flex align-items-center justify-content-center mb-3" style={{ width: "60px", height: "60px" }}>
										<i className="fa fa-cubes text-white"></i>
									</div>
									<h1>Web App Development</h1>
									<p className="mb-30 pd">Magna sea eos sit dolor, ipsum amet lorem diam dolor eos et diam dolor</p>
								</div>
								<div className="col-12 wow zoomIn" data-wow-delay="0.8s">
									<div className="bg-primary theme rounded d-flex align-items-center justify-content-center mb-3" style={{ width: "60px", height: "60px" }}>
										<i className="fa fa-cubes text-white"></i>
									</div>
									<h1>Cyber Security</h1>
									<p className="mb-10 pd">Magna sea eos sit dolor, ipsum amet lorem diam dolor eos et diam dolor</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <CoursesArea /> */}
			<AboutSection />
			<TopicArea />
			<MainContent />
			<ContactForm />
		</>
	);
};

export default YourComponent;





