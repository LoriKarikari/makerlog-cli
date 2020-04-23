import React, { Fragment } from "react";
import { Color } from "ink";
import Spinner from "ink-spinner";

export default () => (
	<Fragment>
		<Color green>
			<Spinner type="dots" />
		</Color>
		{" Loading"}
	</Fragment>
);
