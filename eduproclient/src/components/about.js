import React from 'react';
import ElearnImg from '../assets/img/gallery/gifs/presentation2.gif'

const AboutSection = () =>
{
	return (
		<section className="about-area1 fix pt-10">
			<div className="support-wrapper align-items-center">
				{/* Left Content */}
				<div className="left-content1">
					{/* Section Title */}
					<div className="section-tittle section-tittle2 mb-55">
						<div className="front-text">
							<h2>Learn new skills online with top educators</h2>
							<p>
								The automated process all your website tasks. Discover tools and
								techniques to engage effectively with vulnerable children and young
								people.
							</p>
						</div>
					</div>

					{/* Feature Items */}
					<div className="single-features">
						<div className="features-icon">
							{/* <img src="../assets/img/icon/right-icon.svg" alt="Right Icon" />
							 */}
							<i class="fas fa-check"></i>
						</div>
						<div className="features-caption">
							<p>Techniques to engage effectively with vulnerable children and young people.</p>
						</div>
					</div>

					<div className="single-features">
						<div className="features-icon">
							<i class="fas fa-check"></i>
						</div>
						<div className="features-caption">
							<p>Join millions of people from around the world learning together.</p>
						</div>
					</div>

					<div className="single-features">
						<div className="features-icon">
							<i class="fas fa-check"></i>
						</div>
						<div className="features-caption">
							<p>Join millions of people from around the world learning together. Online learning is as easy and natural.</p>
						</div>
					</div>
				</div>

				{/* Right Content */}
				<div className="right-content1">
					<div className="right-img">
						<img src="assets/img/gallery/about.png" alt="About" />

						<div className="video-icon">
							<img src={ElearnImg} alt="About" />
							{/* <a className="popup-video btn-icon" href="https://www.youtube.com/watch?v=up68UAfH0d0"> */}
								{/* <i className="fas fa-play"></i> */}
							{/* </a> */}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutSection;
