import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logo/eduproindia.png'; 
// import './Footer.scss'; // Ensure you have the appropriate styles

const Footer = () =>
{
	return (
		<footer>
			<div className="footer-wrapper footer-bg">
				{/* Footer Start */}
				<div className="footer-area footer-padding">
					<div className="container">
						<div className="row justify-content-between">
							<div className="col-xl-4 col-lg-5 col-md-4 col-sm-6">
								<div className="single-footer-caption mb-50">
									<div className="single-footer-caption mb-30">
										{/* Logo */}
										<div className="footer-logo">
											<Link to="/">
												<img src={logo} alt="Logo" className='logo' />
											</Link>
										</div>
										<div className="footer-tittle">
											<div className="footer-pera">
												<p>The automated process starts as soon as your clothes go into the machine.</p>
											</div>
										</div>
										{/* Social Links */}
										<div className="footer-social">
											<a href="#"><i className="fab fa-twitter"></i></a>
											<a href="https://bit.ly/sai4ull"><i className="fab fa-facebook-f"></i></a>
											<a href="#"><i className="fab fa-pinterest-p"></i></a>
										</div>
									</div>
								</div>
							</div>
							<div className="col-xl-2 col-lg-3 col-md-4 col-sm-5">
								<div className="single-footer-caption mb-50">
									<div className="footer-tittle">
										<h4>Our Solutions</h4>
										<ul>
											<li><a href="#">Design & Creatives</a></li>
											<li><a href="#">Telecommunication</a></li>
											{/* <li><a href="#">Restaurant</a></li>
											<li><a href="#">Programming</a></li>
											<li><a href="#">Architecture</a></li> */}
										</ul>
									</div>
								</div>
							</div>
							<div className="col-xl-2 col-lg-4 col-md-4 col-sm-6">
								<div className="single-footer-caption mb-50">
									<div className="footer-tittle">
										<h4>Support</h4>
										<ul>
											<li><a href="#">Design & Creatives</a></li>
											<li><a href="#">Telecommunication</a></li>
											{/* <li><a href="#">Restaurant</a></li>
											<li><a href="#">Programming</a></li>
											<li><a href="#">Architecture</a></li> */}
										</ul>
									</div>
								</div>
							</div>
							<div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
								<div className="single-footer-caption mb-50">
									<div className="footer-tittle">
										<h4>Company</h4>
										<ul>
											<li><a href="#">Design & Creatives</a></li>
											<li><a href="#">Telecommunication</a></li>
											{/* <li><a href="#">Restaurant</a></li>
											<li><a href="#">Programming</a></li>
											<li><a href="#">Architecture</a></li> */}
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* Footer Bottom Area */}
				<div className="footer-bottom-area">
					<div className="container">
						<div className="footer-border">
							<div className="row d-flex align-items-center">
								<div className="col-xl-12">
									<div className="footer-copy-right text-center">
										<p>
											Copyright &copy; {new Date().getFullYear()} All rights reserved
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* Footer End */}
			</div>
		</footer>
	);
};

export default Footer;
