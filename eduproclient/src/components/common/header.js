import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logo/eduproindia.png'; 
import axios from 'axios';

const Header = () =>
{
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userId, setUserId] = useState(null);
	const navigate = useNavigate();

	useEffect(() =>
	{
		const storedUserId = localStorage.getItem('userID'); // Fetch userID from localStorage
		if (storedUserId)
		{
			setIsLoggedIn(true);
			setUserId(storedUserId);
		}
	}, []);


	const handleLogout = async () =>
	{
		const sessionId = localStorage.getItem('sessionId');
		try
		{
			const response = await axios.post('http://localhost:8889/logout', { sessionId });
			alert(response.data.message);

			// Clear session ID and redirect
			localStorage.removeItem('sessionId');
			localStorage.removeItem('userID'); // Clear userID as well
			window.location.href = '/login';
		} catch (error)
		{
			alert('Logout error: ' + (error.response ? error.response.data.error : 'Server error'));
		}
	};

	return (
		<header>
			<div className="header-area header-transparent">
				<div className="main-header">
					<div className="header-bottom header-sticky">
						<div className="container-fluid">
							<div className="row align-items-center">
								{/* Logo */}
								<div className="col-xl-2 col-lg-2">
									<div className="logo">
										<Link to="/">
											<img src={logo} alt="Logo" className='logo'/>
										</Link>
										{/* <p className="tagline">Learn More, Achieve More.</p> */}
									</div>
								</div>
								<div className="col-xl-10 col-lg-10">
									<div className="menu-wrapper d-flex align-items-center justify-content-end">
										{/* Main-menu */}
										<div className="main-menu d-none d-lg-block">
											<nav>
												<ul id="navigation">
													<li className="active"><Link to="/">Home</Link></li>
													<li><Link to="/main">Courses</Link></li>
													{isLoggedIn ? (
														<>
															<li><Link to={`/user/${userId}`}>Referral</Link></li>
															<li className="button-header">
																<button onClick={handleLogout} className="btn btn3">Logout</button>
															</li>
														</>
													) : (
														<>
															<li><Link to="/">About</Link></li>
															<li><Link to="/contact">Contact</Link></li>
															<li className="button-header margin-left">
																<Link to="/signup" className="header-btn">Sign Up</Link>
															</li>
															<li className="button-header">
																<Link to="/login" className="header-btn">Log in</Link>
															</li>
														</>
													)}
												</ul>
											</nav>
										</div>
									</div>
								</div>

								{/* Mobile Menu */}
								<div className="col-12">
									<div className="mobile_menu d-block d-lg-none"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
