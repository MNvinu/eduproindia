import React from 'react';
import CoursesArea from './courses';
import AboutSection from './about';
import TopicArea from './topic';
import MainContent from './aboutarea'
import ContactForm from './contact';
import { Link, useNavigate } from 'react-router-dom';

const YourComponent = () =>
{
	return (
		<>
			<section
				className="slider-area"
			>
				<div className="slider-active">
					{/* Single Slider */}
					<div className="single-slider slider-height d-flex align-items-center">
						<div className="container">
							<div className="row">
								<div className="col-xl-6 col-lg-7 col-md-12">
									<h1 data-animation="fadeInLeft" data-delay="0.2s" className='hero__caption_main'>
										EduProIndia
									</h1>
									<div className="hero__caption">
										<h1 data-animation="fadeInLeft" data-delay="0.2s">
											{/* Online learning<br /> platform */}
											Elevate Your Skills,<br /> Shape Your Future.
										</h1>
										<p data-animation="fadeInLeft" data-delay="0.4s">
											Build skills with courses, certificates, and degrees online from world-class universities and companies.
										</p>
										<p>Learn at your own pace and unlock new opportunities in high-demand fields.</p>
										{/* <a href="#" className="btn hero-btn" data-animation="fadeInLeft" data-delay="0.7s">
											Join Now
										</a> */}
										<Link to="/signup" className="btn hero-btn" data-animation="fadeInLeft" data-delay="0.7s">Join Now</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Services Area */}
			<div className="services-area">
				<div className="container">
					<div className="row justify-content-sm-center">
						<div className="col-lg-4 col-md-6 col-sm-8">
							<div className="single-services mb-30">
								<div className="features-icon">
									{/* <img src="./assets/img/icon/icon1.svg" alt="Icon 1" /> */}
									<i className="fas fa-book"></i>

								</div>
								<div className="features-caption">
									<h3>20+ courses</h3>
									<p>Explore a diverse and exciting range of over 20 courses designed to boost your skills and career.</p>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-6 col-sm-8">
							<div className="single-services mb-30">
								<div className="features-icon">
									<img src="assets/img/icon/icon2.svg" alt="Icon 2" />
								</div>
								<div className="features-caption">
									<h3>Expert instructors</h3>
									<p>Learn from industry experts with years of experience and deep knowledge in their fields.</p>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-6 col-sm-8">
							<div className="single-services mb-30">
								<div className="features-icon">
									<img src="assets/img/icon/icon3.svg" alt="Icon 3" />
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
			<CoursesArea />
			<AboutSection />
			<TopicArea />
			<MainContent />
			<ContactForm/>
		</>
	);
};

export default YourComponent;





