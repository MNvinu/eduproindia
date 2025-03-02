import React, { useState } from 'react';

function ContactForm()
{
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
	});

	const [responseMessage, setResponseMessage] = useState('');

	// Handle form inputs
	const handleChange = (e) =>
	{
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	// Handle form submission
	const handleSubmit = async (e) =>
	{
		e.preventDefault();
		try
		{
			const response = await fetch('http://localhost:5000/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});
			const data = await response.json();
			setResponseMessage(data.message);
		} catch (error)
		{
			setResponseMessage('Error sending message. Please try again later.');
		}
	};

	return (
		<section className="contact-section">
			<div className="container">
				<div className="row">
					<div className="col-12">
						<h2 className="contact-title">Get in Touch</h2>
					</div>
					<div className="col-lg-8">
						<form className="form-contact contact_form" id="contactForm" onSubmit={handleSubmit} noValidate>
							<div className="row">
								<div className="col-12">
									<div className="form-group">
										<textarea
											className="form-control w-100"
											name="message"
											id="message"
											cols="30"
											rows="9"
											placeholder="Enter Message"
											onFocus={(e) => (e.target.placeholder = '')}
											onBlur={(e) => (e.target.placeholder = 'Enter Message')}
											value={formData.message}
											onChange={handleChange}
										></textarea>
									</div>
								</div>
								<div className="col-sm-6">
									<div className="form-group">
										<input
											className="form-control valid"
											name="name"
											id="name"
											type="text"
											placeholder="Enter your name"
											onFocus={(e) => (e.target.placeholder = '')}
											onBlur={(e) => (e.target.placeholder = 'Enter your name')}
											value={formData.name}
											onChange={handleChange}
										/>
									</div>
								</div>
								<div className="col-sm-6">
									<div className="form-group">
										<input
											className="form-control valid"
											name="email"
											id="email"
											type="email"
											placeholder="Email"
											onFocus={(e) => (e.target.placeholder = '')}
											onBlur={(e) => (e.target.placeholder = 'Enter email address')}
											value={formData.email}
											onChange={handleChange}
										/>
									</div>
								</div>
								<div className="col-12">
									<div className="form-group">
										<input
											className="form-control"
											name="subject"
											id="subject"
											type="text"
											placeholder="Enter Subject"
											onFocus={(e) => (e.target.placeholder = '')}
											onBlur={(e) => (e.target.placeholder = 'Enter Subject')}
											value={formData.subject}
											onChange={handleChange}
										/>
									</div>
								</div>
							</div>
							<div className="form-group mt-3">
								<button type="submit" className="button button-contactForm boxed-btn">
									Send
								</button>
							</div>
						</form>
						{responseMessage && <p>{responseMessage}</p>}
					</div>
					<div className="col-lg-3 offset-lg-1">
						<div className="media contact-info">
							<span className="contact-info__icon"><i className="ti-home"></i></span>
							<div className="media-body">
								<h3>Buttonwood, California.</h3>
								<p>Rosemead, CA 91770</p>
							</div>
						</div>
						<div className="media contact-info">
							<span className="contact-info__icon"><i className="ti-tablet"></i></span>
							<div className="media-body">
								<h3>+1 253 565 2365</h3>
								<p>Mon to Fri 9am to 6pm</p>
							</div>
						</div>
						<div className="media contact-info">
							<span className="contact-info__icon"><i className="ti-email"></i></span>
							<div className="media-body">
								<h3>vinuthamnagraj@gmail.com</h3>
								<p>Send us your query anytime!</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default ContactForm;
