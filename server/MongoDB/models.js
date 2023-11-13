import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please enter your name"],
			trim: true,
		},
		email: {
			type: String,
			required: [true, "Please enter your email"],
			trim: true,
			unique: [true, "This email already exists"],
			lowercase: true,
			//validate: [validator.isEmail, "Please enter a valid email"],
			
		},
		password: {
			type: String,
			required: [true, "Please enter your password"],
			minlength: [5, "Password should be atleast 5 characters long"],
		},
		cpassword: {
			type: String,
			required: [true, "Please enter your password again"],
			minlength: [5, "Password should be atleast 5 characters long"],
		},
		tokens: [
			{
				token: {
					type: String,
					required: true,
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

// Hashing the password
userSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		this.password = await bcrypt.hash(this.password, 10);
		this.cpassword = await bcrypt.hash(this.cpassword, 10);
	}
	next();
});

//Generating Auth Token
userSchema.methods.generateAuthToken = async function () {
	try {
		let token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
			expiresIn: "12h",
		});
		this.tokens = this.tokens.concat({ token });
		await this.save();
		return token;
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Creting user Model
const User = mongoose.model("User", userSchema);

export default User;
