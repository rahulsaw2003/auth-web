import express from "express";
import authenticate from "../middleware/authenticate.js";
import { userLogin, userRegister, userValidate, userLogout, addClient, getClients, getClientDetails, editClientDetails, deleteClient } from "../controller/userController.js";
const router = express.Router();

//For User Register
router.post("/register", userRegister);

//For User Login
router.post("/login", userLogin);

//For User Validation
router.get("/validate", authenticate, userValidate);

//For User Validation
router.get("/logout", authenticate, userLogout);

router.post("/client/add", addClient);

router.get("/client/all", getClients);

router.get("/client/get/:id", getClientDetails);

router.put("/client/edit/:id", editClientDetails);

router.delete("/client/delete/:id", deleteClient);

export default router;
