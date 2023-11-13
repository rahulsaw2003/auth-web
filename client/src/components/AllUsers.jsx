import { Button, styled, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteClient, getClients } from "../services/api";

const Container = styled(Table)({
	width: "90%",
	margin: "1.5rem auto",
});

const THead = styled(TableRow)({
	background: "#000000",
	"& > th": {
		color: "#fff",
		fontSize: "15px",
	},
});

const Tbody = styled(TableRow)({
	"& > td": {
		fontSize: "14px",
	},
});

const AllUsers = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		getAllClients();
	}, []);

	const getAllClients = async () => {
		const response = await getClients();
		console.log(response.data.allClients);
		setUsers(response.data.allClients);
	};

  const deleteClientDetails = async (id) => {
    const response = await deleteClient(id);
    console.log(response.data);
    getAllClients();
  };


	return (
		<Container>
			<TableHead>
				<THead>
					<TableCell>UserID</TableCell>
					<TableCell>Name</TableCell>
					<TableCell>Email</TableCell>
					<TableCell>Phone</TableCell>
					<TableCell>Organization</TableCell>
					<TableCell>Action</TableCell>
				</THead>
			</TableHead>
			<TableBody>
				{users.map((user) => (
					<Tbody key={user._id}>
						<TableCell>{user._id}</TableCell>
						<TableCell>{user.name}</TableCell>
						<TableCell>{user.email}</TableCell>
						<TableCell>{user.phone}</TableCell>
						<TableCell>{user.organization}</TableCell>
						<TableCell>
							<Button variant="contained" style={{ marginRight: 10 }} component={Link} to={`/edit/${user._id}`}>
								Edit
							</Button>
							<Button variant="contained" color="secondary" onClick={() => deleteClientDetails(user._id)}>
								Delete
							</Button>
						</TableCell>
					</Tbody>
				))}
			</TableBody>
		</Container>
	);
};

export default AllUsers;
