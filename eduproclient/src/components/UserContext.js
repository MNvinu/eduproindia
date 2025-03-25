import React, { createContext, useState, useContext } from 'react';

// Create the context
const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) =>
{
	const [user, setUser] = useState(null);

	const login = (userData) =>
	{
		setUser(userData);
		localStorage.setItem('user', JSON.stringify(userData)); // Store user data in localStorage
	};

	const logout = () =>
	{
		setUser(null);
		localStorage.removeItem('user');
	};

	return (
		<UserContext.Provider value={{ user, login, logout }}>
			{children}
		</UserContext.Provider>
	);
};
