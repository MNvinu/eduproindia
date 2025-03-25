import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './scss/styles.scss'; // Ensure this path is correct

function Signup()
{
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: '',
		referralCode: '',
	});
	const [signupMessage, setSignupMessage] = useState('');
	const [useReferralCode, setUseReferralCode] = useState(false);
	const navigate = useNavigate();

	const handleChange = (e) =>
	{
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) =>
	{
		e.preventDefault();
		// setAlertData({ message: '', severity: 'info', open: false });
		// Check if passwords match
		if (formData.password !== formData.confirmPassword)
		{
			toast.error("Passwords don't match!");
			return;
		}

		try
		{
			const response = await axios.post('http://localhost:8880/signup', {
				firstName: formData.firstName,
				lastName: formData.lastName,
				email: formData.email,
				password: formData.password,
				referralCode: useReferralCode ? formData.referralCode : undefined,
			});

			const { referralCode } = response.data.user;
			const { userId} = response.data;

			localStorage.setItem('userId', userId);
			localStorage.setItem('email', formData.email);
			// setAlertData({ message: `Signup successful! Your referral code is ${referralCode}`, severity: 'success', open: true });
			toast.success(`Signup successful! Your referral code is ${referralCode}`);
			setTimeout(() =>
			{
				window.location.href = '/';
			}, 2000);
		} catch (error)
		{
			console.error('Error during signup:', error); // Log full error details to the console
			// setSignupMessage(error.response.data.error || 'Signup failed. Please try again.');
			toast.error(error.response?.data?.error || 'Signup failed. Please try again.');
		}
	};
	// console.log(alertData);
	return (
		<div className="signup-container">
			<ToastContainer />
			{/* Left Section */}
			<div className="signup-left">
				<h2>Come join us!</h2>
				<p>
					We are so excited to have you here. If you haven't already, create an account to
					get access to exclusive offers, rewards, and discounts.
				</p>
				<a href="/login" className="signin-link">
					Already have an account? Sign in.
				</a>
			</div>
			{/* <div className="signup-form login-form "> */}
			<div className="signup-right">
				<h1 className='text-center'>Sign Up</h1>
				{signupMessage && <p style={{ color: "white" }}>{signupMessage}</p>}
				<form onSubmit={handleSubmit} className="form-default">
					<div className="form-input">
						{/* <label>First Name</label> */}
						<input
							type="text"
							name="firstName"
							placeholder="First Name"
							onChange={handleChange}
							value={formData.firstName}
							required
						/>
					</div>
					<div className="form-input">
						{/* <label>Last Name</label> */}
						<input
							type="text"
							name="lastName"
							placeholder="Last Name"
							onChange={handleChange}
							value={formData.lastName}
							required
						/>
					</div>
					<div className="form-input">
						{/* <label>Email</label> */}
						<input
							type="email"
							name="email"
							placeholder="Email Address"
							onChange={handleChange}
							value={formData.email}
							required
						/>
					</div>
					<div className="form-input">
						{/* <label>Password</label> */}
						<input
							type="password"
							name="password"
							placeholder="Password"
							onChange={handleChange}
							value={formData.password}
							required
						/>
					</div>
					<div className="form-input">
						{/* <label>Confirm Password</label> */}
						<input
							type="password"
							name="confirmPassword"
							placeholder="Confirm Password"
							onChange={handleChange}
							value={formData.confirmPassword}
							required
						/>
					</div>
					<div >
						<label className="referral-label">
							<input
								type="checkbox"
								checked={useReferralCode}
								onChange={() => setUseReferralCode(!useReferralCode)}
								className="referral-checkbox"
							/>
							<span>Have a referral code?</span>
						</label>
						{useReferralCode && (
							<div className="form-input">
								{/* <label>Referral Code</label> */}
								<input
									type="text"
									name="referralCode"
									placeholder="Referral Code"
									onChange={handleChange}
									value={formData.referralCode}
								/>
							</div>
						)}
					</div>
					<button type="submit" className="btn mt-10">Sign Up</button>
				</form>
			</div>
		</div>
	);
}

export default Signup;