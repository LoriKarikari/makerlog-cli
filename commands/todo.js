import { Color, Text } from "ink";
import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import Loader from "../components/loader";
import phin from "../config/phin.config";
import store from "../config/store.config";

/// Add a new to-do task
export default function Todo(props) {
	const [message, setMessage] = useState("");

	useEffect(() => {
		if (!store.has("token")) return setMessage("You are not logged in.");

		let content = props.inputArgs[1];
		if (!content) return setMessage("You must add something to log.");

		async function logTodo() {
			try {
				const res = await phin({
					url: "https://api.getmakerlog.com/tasks/",
					method: "POST",
					data: { content, done: false },
				});
				if (res.statusCode === 200 || res.statusCode === 201) {
					const message = (
						<Fragment>
							<Color bgHex="#f39c12"> TODO </Color>
							{" " + res.body.content}
						</Fragment>
					);
					setMessage(message);
				}
			} catch (e) {
				console.log(e);
			}
		}
		logTodo();
	}, []);

	return <Text>{message || <Loader />}</Text>;
}

Todo.propTypes = {
	inputArgs: PropTypes.array,
};
