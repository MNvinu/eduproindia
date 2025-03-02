import React from 'react';
import { motion } from 'framer-motion';

const Loader = () =>
{
	return (
		<div className="loader-container">
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, scale: [1, 1.2, 1] }}
				transition={{ duration: 1, repeat: Infinity }}
				className="loader-dot"
			/>
		</div>
	);
};

export default Loader;
