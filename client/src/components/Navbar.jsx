import { Avatar } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { LoginContext } from "./Context/Context";
import "./header.css";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate} from "react-router-dom";
import { userLogout } from "../services/api";
import { toast } from "react-toastify";

const Navbar = () => {
	const { loginData, setLoginData } = useContext(LoginContext);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const history = useNavigate();
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const logoutUser = async () => {
		let token = localStorage.getItem("userToken");
		const { data } = await userLogout(token);

		if (data.status === 201) {
			toast.success("Logout Successful");
			localStorage.removeItem("userToken");
			setLoginData(false);
			history("/");
		} else {
			toast.error("Error in Logout");
		}
	};

	const viewProfile = (e) => {
		history(`/profile/${loginData._id}`);
	};

	const AddClient = (e) => {
		history("/add")
	};

	const AllClients = (e) => {
		history("/all")
	};
	const goBack = () => {
		history(-1);
	};

	return (
		<header>
			<nav className={loginData ? "logged-in" : ""}>
				<h1>Welcome to My Site</h1>
				{loginData && (
					<div className="tabs">
						<p onClick={(e) => AddClient(e)}>Add Client</p>
						<p onClick={(e) => AllClients(e)}>All Clients</p>
						<p onClick={() => goBack()}>Go Back</p>
					</div>
				)}
				<div className="avtar">
					{loginData?.name ? (
						<Avatar style={{ background: "salmon", fontWeight: "bold", textTransform: "capitalize" }} onClick={handleClick}>
							{loginData.name[0].toUpperCase()}{" "}
						</Avatar>
					) : (
						<Avatar style={{ background: "gray" }} />
					)}
				</div>

				<Menu
					id="basic-menu"
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					MenuListProps={{
						"aria-labelledby": "basic-button",
					}}
				>
					<MenuItem
						onClick={() => {
							viewProfile();
							handleClose();
						}}
					>
						My Profile
					</MenuItem>
					<MenuItem
						onClick={() => {
							logoutUser();
							handleClose();
						}}
					>
						Logout
					</MenuItem>
				</Menu>
			</nav>
		</header>
	);
};

export default Navbar;
