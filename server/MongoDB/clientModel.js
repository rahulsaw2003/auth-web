import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please enter client's name"],
		trim: true,
	},
	email: {
		type: String,
		required: [true, "Please enter client's email"],
		trim: true,
		lowercase: true,
	},
	phone: {
		type: String,
		required: [true, "Please enter client's phone"],
		minlength: [5, "Password should be atleast 5 characters long"],
	},
	organization: {
		type: String,
		required: [true, "Please enter client's organization"],
	},
});

const Client = mongoose.model("Client", clientSchema);

export default Client;
