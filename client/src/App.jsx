import LoginPage from "./components/LoginPage";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import {  Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { validateUser } from "./services/api";
import { LoginContext } from "./components/Context/Context";
import { useContext, useEffect, useState } from "react";
import LoadingPage from "./components/LoadingPage";
import AddUser from "./components/AddUser";
import AllUsers from "./components/AllUsers";
import EditUser from "./components/EditUser";
import ProfilePage from "./components/ProfilePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
	const [data, setData] = useState(false);

	const {setLoginData } = useContext(LoginContext);
	const history = useNavigate();

	const isAuthenticated = async () => {
		const token = localStorage.getItem("userToken");
		// console.log(token);
		const resp = await validateUser(token);

		if (!resp || resp.status !== 201) {
			console.log("Error in Validation");
		} else {
			console.log("Validated");
			setLoginData(resp.data.user);
			history("/dash");
		}
	};

	useEffect(() => {
		setTimeout(() => {
			isAuthenticated();
			setData(true);
		}, 1000);
	}, []);

	return (
		<>
			{data ? (
				<>
					<Navbar />
					<Routes>
						<Route path="/" element={<LoginPage />} />
						<Route path="/register" element={<Register />} />
						<Route path="/dash" element={<Dashboard />} />
						<Route path="/add" element={<AddUser />} />
						<Route path="/all" element={<AllUsers />} />
						<Route path="/profile/:id" element={<ProfilePage />} />
						<Route path="/edit/:id" element={<EditUser />} />
					</Routes>
				</>
			) : (
				<LoadingPage />
			)}
			<ToastContainer />
		</>
	);
}

export default App;
