import React, { useEffect, useState } from "react";
import { editClient, getClientDetails } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
const defaultClient = {
	name: "",
	email: "",
	phone: "",
	organization: "",
};

const EditUser = () => {
	const [userData, setUserData] = useState(defaultClient);
	const history = useNavigate();
	const { id } = useParams();

	const handleValueChange = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
		// console.log(userData);
	};

	const handleClick = async (e) => {
		e.preventDefault();
		const res = await editClient(userData);
		console.log(res.data);

		if (res.status === 201) {
			toast.success("Client Details Modified Successfully");
			setUserData(defaultClient);
			history("/all");
		} else {
			toast.error("Error in adding client, please try again");
		}
	};

	const loadClientDetails = async () => {
		const response = await getClientDetails(id);
		setUserData(response.data.clientDetails);
	};

	useEffect(() => {
		loadClientDetails();
	}, []);

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
						<label htmlFor="organization">Email</label>
						<input type="text" name="organization" id="organization" placeholder="Enter Organization" onChange={(e) => handleValueChange(e)} value={userData.organization} />
					</div>

					<button className="btn" onClick={(e) => handleClick(e)}>
						Edit Client
					</button>
				</form>
			</div>
		</section>
	);
};

export default EditUser;
