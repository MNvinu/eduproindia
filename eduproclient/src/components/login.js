import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Login()
{
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e) =>
	{
		e.preventDefault();
		try
		{
			const response = await axios.post('http://localhost:8880/login', { email, password });
			const { userId, role } = response.data;

			localStorage.setItem('userId', userId);
			localStorage.setItem('email', email); // Add this line
			toast.success('Login successful');
			// alert('Login successful');
			if (role === 'admin')
			{
				window.location.href = '/admin';
			} else
			{
				window.location.href = '/';
			}
		} catch (error)
		{
			alert('Login error: ' + error.response.data.error);
			toast.error(error.response.data.error);
		}
	};

	return (
		<div className="signup-container">
			{/* Left Section */}
			<div className="signup-left">
				<h2>Come join us!</h2>
				<p>
					We are so excited to have you here. If you haven't already, create an account to
					get access to exclusive offers, rewards, and discounts.
				</p>
				<a href="/signup" className="signin-link">
					Don't have an account? Sign Up.
				</a>
			</div>
			<div className="signup-right">
		{/* <div className="login-form"> */}
			<h1 className='text-center'>Login</h1>
			<form onSubmit={handleSubmit} className="form-default">
				<div className="form-input">
					<input
						type="email"
						name="email"
						placeholder="Email Address"
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className="form-input">
					<input
						type="password"
						name="password"
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button type="submit" className="form-input submit-btn2">Login</button>
			</form>
		</div>
		</div>
		
	);
}

export default Login;
