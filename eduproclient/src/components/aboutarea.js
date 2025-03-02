import React from 'react';
import aboutImage from '../assets/img/gallery/about.jpg';
import abtpgImg from '../assets/img/gallery/abt.jpg'
import { Link } from 'react-router-dom';

const AboutArea3 = () =>
{
	return (
		<section className="about-area3 fix">
			<div className="support-wrapper align-items-center">
				<div className="right-content3">
					<div className="right-img">
						{/* <img src="/assets/img/gallery/about3.png" alt="About" /> */}
						<img src={abtpgImg} alt="About" />
					</div>
				</div>
				<div className="left-content3">
					<SectionTitle title="Learner outcomes on courses you will take" />
					<FeatureList features={[
						"Techniques to engage effectively with vulnerable children and young people.",
						"Join millions of people from around the world learning together.",
						"Online learning is as easy and natural."
					]} />
				</div>
			</div>
		</section>
	);
};

const SectionTitle = ({ title }) => (
	<div className="section-tittle section-tittle2 mb-20">
		<div className="front-text">
			<h2>{title}</h2>
		</div>
	</div>
);

const FeatureList = ({ features }) => (
	<>
		{features.map((feature, index) => (
			<div key={index} className="single-features">
				<div className="features-icon">
					<i class="fas fa-check"></i>
				</div>
				<div className="features-caption">
					<p>{feature}</p>
				</div>
			</div>
		))}
	</>
);

const AboutArea2 = () => (
	<section className="about-area2 fix pb-padding section-padding40">
		<div className="support-wrapper align-items-center">
			<div className="right-content2">
				<div className="right-img">
					<img src={aboutImage} alt="About" />
				</div>
			</div>
			<div className="left-content2">
				<SectionTitle title="Take the next step toward your personal and professional goals with us." />
				<p>The automated process all your website tasks. Discover tools and techniques to engage effectively with vulnerable children and young people.</p>
				<Link to="/signup" className="btn">Join now for Free</Link>
			</div>
		</div>
	</section>
);

const MainContent = () => (
	<>
		<AboutArea3 />
		<AboutArea2 />
	</>
);

export default MainContent;
