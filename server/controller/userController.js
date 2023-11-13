import User from "../MongoDB/models.js";
import bcrypt from "bcrypt";
import Client from "../MongoDB/clientModel.js";

export const userRegister = async (req, res) => {
	const { name, email, password, cpassword } = req.body;

	try {
		if (!name || !email || !password || !cpassword) {
			res.status(200).json({ message: "Please fill all the fields" });
			return;
		}
		const userExists = await User.findOne({ email });
		if (userExists) {
			res.status(200).json({ message: "User already exists, Try Logging in" });
			return;
		}
		if (password !== cpassword) {
			res.status(200).json({ message: "Passwords do not match" });
			return;
		}
		const newUser = await User.create({ name, email, password, cpassword });
		res.status(201).json(newUser);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export const userLogin = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			res.status(200).json({ message: "User does not exist" });
			return;
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			res.status(200).json({ message: "Invalid Credentials" });
			return;
		}
		const token = await user.generateAuthToken();
		res.cookie("jwtToken", token, {
			httpOnly: true,
			expires: new Date(Date.now() + 1000 * 60 * 15),
		});
		res.status(201).json({ message: "Logged in successfully", token: token, status: 201 });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const userValidate = async (req, res) => {
	try {
		const validUser = await User.findById(req.userId).select("-password -cpassword -tokens");

		res.status(201).json({ message: "User Validated Successfully", user: validUser, status: 201 });
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
};

export const userLogout = async (req, res) => {
	try {
		req.rootUser.tokens = req.rootUser.tokens.filter((currToken) => {
			return currToken.token !== req.token;
		});
		res.clearCookie("jwtToken", { path: "/" });
		req.rootUser.save();

		res.status(201).json({ message: "Logged out successfully", status: 201 });
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
};

export const addClient = async (req, res) => {
	const { name, email, phone, organization } = req.body;

	try {
		const userExists = await Client.findOne({ email, phone, organization, name });
		if (userExists) {
			res.status(200).json({ message: "User already exists, Try Logging in" });
			return;
		}

		const newClient = await Client.create({ name, email, phone, organization });

		res.status(201).json({ message: "Client Added Successfully", newClient });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export const getClients = async (req, res) => {
	try {
		const allClients = await Client.find();

		res.status(201).json({ message: "Clients data retreived Successfully from DB", allClients });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export const getClientDetails = async (req, res) => {
	try {
		const clientDetails = await Client.findById(req.params.id);

		res.status(201).json({ message: "Client data retreived Successfully from DB", clientDetails });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export const editClientDetails = async (req, res) => {
	const newClient = new Client(req.body);

	try {
		await Client.updateOne({ _id: req.params.id }, newClient);

		res.status(201).json({ message: "Client Added Successfully", newClient });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export const deleteClient = async (req, res) => {
	try {
		await Client.deleteOne({ _id: req.params.id });

		res.status(201).json({ message: "Client Deleted Successfully" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};
