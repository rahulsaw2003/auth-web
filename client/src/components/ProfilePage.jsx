import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validateUser } from "../services/api";
import { LoginContext } from "./Context/Context";
import "./ProfilePage.css";

const ProfilePage = () => {
    const { loginData, setLoginData } = useContext(LoginContext);
    const history = useNavigate();
	

    const isAuthenticated = async () => {
			const token = localStorage.getItem("userToken");

			const resp = await validateUser(token);

			if (!resp || resp.status !== 201) {
				console.log("Error in Validation");
			} else {
				// console.log("Validated");
				setLoginData(resp.data.user);
				history(`/profile/${loginData._id}`);
			}
		};

		useEffect(() => {
			isAuthenticated();
		}, []);

	return (
		<div className="profile-container">
			<div className="profile-header">
				<h1>Profile Information</h1>
			</div>
			<div className="profile-details">
				<p>UserID: {loginData._id}</p>
			</div>
			<div className="profile-details">
				<p>Name: {loginData.name}</p>
			</div>
			<div className="profile-details">
				<p>Email: {loginData.email}</p>
			</div>
		</div>
	);
};

export default ProfilePage;
