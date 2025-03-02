// Preloader.js
import React from 'react';
import '../assets/css/style.css'; // Ensure style.css includes preloader styles

const Preloader = ({ loading }) =>
{
	return (
		loading && (
			<div id="preloader-active">
				<div className="preloader d-flex align-items-center justify-content-center">
					<div className="preloader-inner position-relative">
						<div className="preloader-circle"></div>
						<div className="preloader-img pere-text">
							<img src="assets/img/logo/loder.png" alt="Loading" />
						</div>
					</div>
				</div>
			</div>
		)
	);
};

export default Preloader;
