import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import CourseDetails from './components/courseDetails';
import MainPage from './components/coursepage';
import HomePage from './components/home';
import Signup from './components/signup';
import Login from './components/login';
import ContactForm from './components/contact';
import AdminDashboard from './components/Dashboard/admin';
import UserDashboard from './components/Dashboard/user';
import Header from './components/common/header';
import Footer from './components/common/footer';
import Loader from './components/common/loader';
import Certification from './components/Dashboard/parentapp'
import Lessons from './components/lessons/page1'
import ProtectedRoute from "./components/protcdRoute";
import './assets/css/style.css';
import './assets/css/animate.min.css';
import './assets/css/slicknav.css';
import './assets/css/flaticon.css';
import './assets/css/progressbar_barfiller.css';
import './assets/css/gijgo.css';
import './assets/css/animated-headline.css';
import './assets/css/magnific-popup.css';
import './assets/css/fontawesome-all.min.css';
import './assets/css/themify-icons.css';
import './assets/css/nice-select.css';
import './assets/css/styles.scss';
import './App.css';
import './App.scss';

// Define a new component to handle routing and conditional rendering
function AppContent()
{
	const location = useLocation();
	const [loading, setLoading] = useState(true);
	const showHeader = location.pathname !== '/admin' && location.pathname !== '/register' && location.pathname !== '/user'; // Conditional check for Header
	// const showHeader = location.pathname !== '/login' && location.pathname !== '/signup'; // Conditional check for Header
	const showFooter = location.pathname !== '/login' && location.pathname !== '/signup' 
	&& location.pathname !== '/admin' && location.pathname !== '/register' 
	&& location.pathname !== '/user';
	const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';


	useEffect(() =>
	{
		const timer = setTimeout(() => setLoading(false), 2000); // Adjust as needed
		return () => clearTimeout(timer);
	}, []);

	return (
		<div className={isAuthPage ? 'auth-background' : ''}>
			{/* <Preloader loading={loading} /> */}
			{loading && <Loader />}
			{!loading && showHeader && <Header />}
			{/* <Header/> */}
			{!loading && (
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/login" element={<Login />} />
					<Route path="/contact" element={<ContactForm />} />
					<Route path="/lesson" element={<Lessons />} />
					<Route path="/admin/:userID" element={<AdminDashboard />} />
					<Route path="/certificate" element={<Certification />} />
					<Route path="/user/:userID" element={<UserDashboard />} />
					<Route path="/course/:id" element={<CourseDetails />} />
					<Route path="/main" element={<MainPage />} />
				</Routes>
			)}
			{!loading && showFooter && <Footer />}
		</div>
	);
}

function App()
{
	return (
		<Router>
			<AppContent />
		</Router>
	);
}

export default App;
