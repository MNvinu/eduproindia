import React from 'react';
import ElearnImg from '../assets/img/gallery/gifs/presentation2.gif'

const AboutSection = () =>
{
	return (
		<section className="about-area1 fix pt-10">
			<div className="support-wrapper align-items-center">
				{/* Left Content */}
				<div className="left-content1">
					<div className="about-icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="27.287" height="16.752" viewBox="0 0 27.287 16.752">
							<path id="about" d="M64.744,0H60.157a.648.648,0,0,0-.648.648v.8a.648.648,0,0,0,.648.648h2.059l-5.5,5.5H52.377a1.047,1.047,0,0,0-.772.339l-6.167,6.728H39.152a.648.648,0,0,0-.648.648v.8a.648.648,0,0,0,.648.648H45.9a1.047,1.047,0,0,0,.772-.339l6.167-6.728h4.316a1.047,1.047,0,0,0,.74-.307l5.8-5.8V5.634a.648.648,0,0,0,.648.648h.8a.648.648,0,0,0,.648-.648V1.047A1.047,1.047,0,0,0,64.744,0Z" transform="translate(-38.504)" fill="#fff" />
						</svg>
					</div>

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
