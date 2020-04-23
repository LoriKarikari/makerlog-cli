import React, { useEffect } from "react";
import { Text } from "ink";
import store from "../config/store.config";

/// Log out of your Makerlog account
export default function Logout() {
	useEffect(() => {
		store.clear();
	}, []);

	return <Text>Logged you out.</Text>;
}
