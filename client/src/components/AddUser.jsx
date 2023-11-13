import React, { useState } from "react";
import { addClient } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const defaultClient = {
	name: "",
	email: "",
	phone: "",
	organization: "",
};

const AddUser = () => {
	const [userData, setUserData] = useState(defaultClient);
	const history = useNavigate();

	const handleValueChange = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
		// console.log(userData);
	};

	const handleClick = async (e) => {
		e.preventDefault();
		const res = await addClient(userData);
		// console.log(res);

		if (res.status === 201) {
			toast.success("Client Added Successfully");
			setUserData(defaultClient);
			history("/all");
		} else {
			toast.error("Error in adding client, please try again");
		}
	};
	return (
		<section>
			<div className="form_data">
				<div className="form_heading">
					<h1>Add New Client</h1>
				</div>

				<form method="post">
					<div className="form_input">
						<label htmlFor="name">Name</label>
						<input type="name" name="name" id="name" placeholder="Enter full name" onChange={(e) => handleValueChange(e)} value={userData.name} />
					</div>
					<div className="form_input">
						<label htmlFor="email">Email</label>
						<input type="email" name="email" id="email" placeholder="Enter email address" onChange={(e) => handleValueChange(e)} value={userData.email} />
					</div>
					<div className="form_input">
						<label htmlFor="text">Email</label>
						<input type="phone" name="phone" id="phone" placeholder="Enter Phone Number" onChange={(e) => handleValueChange(e)} value={userData.phone} />
					</div>
					<div className="form_input">
						<label htmlFor="organization">Organization</label>
						<input type="text" name="organization" id="organization" placeholder="Enter Organization" onChange={(e) => handleValueChange(e)} value={userData.organization} />
					</div>

					<button className="btn" onClick={(e) => handleClick(e)}>
						Add Client
					</button>
				</form>
			</div>
		</section>
	);
};

export default AddUser;
