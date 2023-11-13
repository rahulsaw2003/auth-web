import axios from "axios";
import { toast } from "react-toastify";
const serverURL = "http://localhost:5000";

export const userLogin = async (user) => {
	try {
		const response = axios.post(`${serverURL}/api/login`, user);
		console.log("User Login Successfully", user);
		return response;
	} catch (error) {
		console.log("Error in userLogin API: ", error);
		// throw error;
	}
};

export const userRegister = async (user) => {
	try {
		const response = await axios.post(`${serverURL}/api/register`, user);
		console.log("User Registered Successfully", user);
		return response;
	} catch (error) {
		console.log("Error in userRegister API: ", error);
		// throw error;
	}
};

export const validateUser = async (token) => {
	try {
		const response = await axios.get(`${serverURL}/api/validate`, {
			headers: {
				Authorization: token,
			},
		});
		return response;
	} catch (error) {
		console.log("Error in validateUser API: ", error);
	}
};

export const userLogout = async (token) => {
	try {
		const response = await axios.get(`${serverURL}/api/logout`, {
			headers: {
				Authorization: token,
			},
		});
		return response;
	} catch (error) {
		console.log("Error in userLogout API: ", error);
		// throw error;
	}
}

export const addClient = async (user) => {
	try {
		const response = await axios.post(`${serverURL}/api/client/add`, user);
		console.log("Client Added Successfully from API", user);
		return response;
	} catch (error) {
		toast.error("Something Went Wrong. Try Again!");
		
		console.log("Error in Client Add API: ", error);
		// throw error;
		
	}
};
export const getClients = async () => {
	try {
		const response = await axios.get(`${serverURL}/api/client/all`);
		console.log("Client Fetched Successfully from API");
		return response;
	} catch (error) {

		console.log("Error in getting Client Data API: ", error);
		// throw error;
	}
};

export const deleteClient = async (id) => {
	try {
		const response = await axios.delete(`${serverURL}/api/client/delete/${id}`);
		console.log("Client Deleted Successfully from API");
		return response;
	} catch (error) {

		console.log("Error in deleting Client Data API: ", error);
		// throw error;
	}
};

export const getClientDetails = async (id) => {
	try {
		const response = await axios.get(`${serverURL}/api/client/get/${id}`);
		console.log("Client Fetched Successfully from API");
		return response;
	} catch (error) {
		console.log("Error in getting Client Data API: ", error);
		// throw error;
	}
};

export const editClient = async (user) => {
	const id = user._id;
	try {
		const response = await axios.put(`${serverURL}/api/client/edit/${id}`, user);
		console.log("Client Details Edited Successfully from API");
		return response;
	} catch (error) {
		console.log("Error in Editing Client Data API: ", error);
		// throw error;
	}
};
