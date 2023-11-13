import jwt from "jsonwebtoken";
import User from "../MongoDB/models.js";

const authenticate = async (req, res, next) => {
	try {
		let token = req.headers.authorization.split(" ")[0];
		const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
		const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token });
		if (!rootUser) {
		    throw new Error("User not found");
		}
		req.token = token;
		req.rootUser = rootUser;
		req.userId = rootUser._id;
		next();
	} catch (error) {
		res.status(500).json({ message: "Unauthorized: No token provided" });
		console.log(error);
	}
};

export default authenticate;
