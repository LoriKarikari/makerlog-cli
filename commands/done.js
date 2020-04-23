import React, { useState, useEffect, Fragment } from "react";
import { Text, Color } from "ink";
import PropTypes from "prop-types";
import store from "../config/store.config";
import phin from "../config/phin.config";
import Loader from "../components/loader";

/// Add a new done task
export default function Done(props) {
	const [message, setMessage] = useState("");

	useEffect(() => {
		const content = props.inputArgs[1];

		if (!store.has("token")) return setMessage("You are not logged in.");
		if (!content) return setMessage("You must add something to log.");

		async function logDone() {
			try {
				const res = await phin({
					url: "https://api.getmakerlog.com/tasks/",
					method: "POST",
					data: { content, done: true },
				});
				if (res.statusCode === 200 || res.statusCode === 201) {
					const message = (
						<Fragment>
							<Color bgHex="#009056"> DONE </Color>
							{" " + res.body.content}
						</Fragment>
					);
					return setMessage(message);
				}
			} catch (e) {
				console.log(e);
			}
		}
		logDone();
	}, []);

	return <Text>{message || <Loader />}</Text>;
}

Done.propTypes = {
	inputArgs: PropTypes.array,
};
