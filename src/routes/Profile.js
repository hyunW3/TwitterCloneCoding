import React from "react";
import { authService } from "../fbase"
import { useHistory } from "react-router-dom";
export default () => {
	const history = useHistory();
	const onLogOutClick = () => {
		authService.signOut();
		history.push("/");
	}
	return (
		<div>
			<p>Profile</p>
			<button onClick={onLogOutClick} >Log Out</button>
		</div>
	);
} 