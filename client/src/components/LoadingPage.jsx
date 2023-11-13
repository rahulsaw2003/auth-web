import React from "react";
import "./mix.css"; // Import your CSS file for styling

const LoadingPage = () => {
	return (
		<div className="loading-container">
			<div className="loader">
				<div className="circular-progress">
					<div className="bar"></div>
				</div>
			</div>
		</div>
	);
};

export default LoadingPage;
