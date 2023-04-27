import { Container } from "@mui/system";
import React from "react";
import ReactLoading from "react-loading";
import { useStyle } from "../style";

export default function Loading() {
	const classes = useStyle()
return (
<Container className={classes.contentContainer}>
	<ReactLoading
		type="spinningBubbles"
		color="#0000FF"
		height={100}
		width={50}
		className={classes.loading}
	/>
	</Container>
);
}
