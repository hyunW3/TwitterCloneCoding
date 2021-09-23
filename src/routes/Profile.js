import React from "react";
import { authService } from "../fbase"
import { useHistory } from "react-router-dom";
export default ({userObj}) => {
	const history = useHistory();
	const onLogOutClick = () => {
		authService.signOut();
		history.push("/");
	}
	return (
		<div>
			<p>Profile</p>
			<h4>Email : {userObj.email}</h4>
			<h5>UID : {userObj.uid} </h5>
			<button onClick={onLogOutClick} >Log Out</button>
		</div>
	);
} 