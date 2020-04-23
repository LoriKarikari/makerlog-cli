import React, { useState, useEffect, Fragment } from "react";
import { Text, Color } from "ink";
import PropTypes from "prop-types";
import store from "../config/store.config";
import phin from "../config/phin.config";
import Loader from "../components/loader";

/// Add a new in progress task
export default function InProgress(props) {
	const [message, setMessage] = useState("");

	useEffect(() => {
		if (!store.has("token")) return setMessage("You are not logged in.");

		const content = props.inputArgs[1];
		if (!content) return setMessage("You must add something to log.");

		async function logInProgress() {
			try {
				const res = await phin({
					url: "https://api.getmakerlog.com/tasks/",
					method: "POST",
					data: { content, in_progress: true },
				});
				if (res.statusCode === 200 || res.statusCode === 201) {
					const message = (
						<Fragment>
							<Color bgHex="#f39c12"> IN PROGRESS </Color>
							{" " + res.body.content}
						</Fragment>
					);
					return setMessage(message);
				}
			} catch (e) {
				console.log(e);
			}
		}
		logInProgress();
	}, []);

	return <Text>{message || <Loader />}</Text>;
}

InProgress.propTypes = {
	inputArgs: PropTypes.array,
};
