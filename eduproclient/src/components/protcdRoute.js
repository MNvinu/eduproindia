import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) =>
{
	const isLoggedIn = !!localStorage.getItem("userId"); // Check login status

	return isLoggedIn ? children : <Navigate to="/signup" replace />;
};

export default ProtectedRoute;
