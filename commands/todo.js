import React, { Component, Fragment } from "react";
import { Text, Color } from "ink";
import PropTypes from "prop-types";
import store from "../config/store.config";
import phin from "../config/phin.config";
import Loader from "../components/loader";

/// Add a new to-do task
class Todo extends Component {
	render() {
		return <Text>{this.state.message || <Loader />}</Text>;
	}

	constructor(props) {
		super(props);
		this.state = {
			message: ""
		};
	}

	async componentDidMount() {
		if (!store.has("token"))
			return this.setState({
				message: "You are not logged in."
			});

		let content = this.props.inputArgs[1];
		if (!content)
			return this.setState({
				message: "You must add something to log."
			});

		try {
			const res = await phin({
				url: "https://api.getmakerlog.com/tasks/",
				method: "POST",
				data: { content, done: false }
			});
			if (res.statusCode === 200 || res.statusCode === 201) {
				const message = (
					<Fragment>
						<Color bgHex="#f39c12"> TODO </Color>
						{" " + res.body.content}
					</Fragment>
				);
				return this.setState({
					message: message
				});
			}
		} catch (e) {
			console.log(e);
		}
	}
}
Todo.propTypes = {
	inputArgs: PropTypes.array
};

export default Todo;
