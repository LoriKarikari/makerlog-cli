import React, { useState, useEffect } from "react";
import { Text } from "ink";
import PropTypes from "prop-types";
import store from "../config/store.config";
import phin from "../config/phin.config";
import Loader from "../components/loader";

/// Log into your Makerlog account
export default function Login(props) {
	const [message, setMessage] = useState("");

	useEffect(() => {
		if (store.has("token")) return setMessage("You are already logged in.");

		async function login() {
			try {
				const res = await phin({
					url: "https://api.getmakerlog.com/api-token-auth/",
					method: "POST",
					data: {
						username: props.username,
						password: props.password,
					},
				});
				const body = res.body;
				if (body.token) {
					store.set("token", body.token);
					setMessage("Logged in succesfully.");
				} else if (body.non_field_errors)
					setMessage(body.non_field_errors.join("\n"));
			} catch (e) {
				console.log(e);
			}
		}
		login();
	}, []);

	return <Text>{message || <Loader />}</Text>;
}

Login.propTypes = {
	/// Your Makerlog username
	username: PropTypes.string.isRequired,
	/// Your Makerlog password
	password: PropTypes.string.isRequired,
};
