import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/img/logo/eduproindia.png';
import axios from 'axios';

const Header = () =>
{
	const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('userId'));
	const [userId, setUserId] = useState(localStorage.getItem('userId') || "");
	const navigate = useNavigate();
	const location = useLocation();

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

	useEffect(() =>
	{
		if (location.pathname === '/')
		{
			document.body.classList.add('home-page');
		} else
		{
			document.body.classList.remove('home-page');
		}
	}, [location]);

	const handleLogout = async () =>
	{
		try
		{
			const userId = localStorage.getItem('userId'); // Fetch the correct userId
			if (!userId)
			{
				alert("No user is logged in.");
				return;
			}

			await axios.post('http://localhost:8880/logout', { userID: userId }); // Use 'userID' key

			// Clear localStorage and update state
			localStorage.removeItem('userId');
			setIsLoggedIn(false);
			setUserId(null);

			// Redirect to login page
			navigate('/login');
			window.location.reload(); // Force re-render
		} catch (error)
		{
			alert('Logout error: ' + (error.response ? error.response.data.message : 'Server error'));
		}
	};


	return (
		<header >
			<div className="header-area header-transparent">
				<div className="main-header">
					<div className="header-bottom header-sticky">
						<div className="container-fluid">
							<div className="row align-items-center">
								{/* Logo */}
								<div className="col-xl-2 col-lg-2">
									<div className="logo">
										<Link to="/">
											<img src={logo} alt="Logo" className='logo' />
										</Link>
									</div>
								</div>
								<div className="col-xl-10 col-lg-10">
									<div className="menu-wrapper d-flex align-items-center justify-content-end">
										<div className="main-menu d-none d-lg-block">
											<nav>
												<ul id="navigation">
													<li className="active"><Link to="/">Home</Link></li>
													{/* <li><Link to="/main">Courses</Link></li> */}
													<li>
														{isLoggedIn ? (
															<Link to="/main">Courses</Link>
														) : (
															<Link to="/signup" onClick={() => alert("Please sign up to access courses.")}>
																Courses
															</Link>
														)}
													</li>

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
