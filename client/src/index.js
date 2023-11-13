import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Context from "./components/Context/Context";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<Context>
		<Router>
			<React.StrictMode>
				<App />
			</React.StrictMode>
			<ToastContainer position="top-right" />
		</Router>
	</Context>
);
