import React, { useState, useEffect } from "react";
import MyNweetShow from "../components/MyNweetShow";
import { authService } from "../fbase";
import { useHistory } from "react-router-dom";
import { updateProfile } from "firebase/auth";

const Profile = ({userObj,refreshUser}) => {
	const [newDisplayName, setNewDisplayName] = useState("")
	const [user,setUser] = useState({});
	const history = useHistory();
	const onLogOutClick = () => {
		authService.signOut();
		history.push("/");
	}
	const onSubmitDisplayName = async (event) => {
		event.preventDefault();
		const currentUser = authService.currentUser;
		await updateProfile(currentUser, {displayName : newDisplayName});
		refreshUser();
	}
	const onChangeDisplayName = (event) => {
		const {target:{value}} = event;
		setNewDisplayName(value);
	}
	useEffect(() => {
		setUser(userObj);
		const objName = (userObj.displayName!==null)?(userObj.displayName):""
		setNewDisplayName(objName)
	},[userObj]);
	const formStyle = {"display":"flex", "flexDirection": 'row',}
	return (
		<div>
			<div>
				<p>Profile</p>
				<h4>Email : {user.email}</h4>
				<form style={formStyle}>
					<h4 style={{"margin":"1px"}}>DisplayName : </h4>
					<input type="text" value={newDisplayName} onChange={onChangeDisplayName}/>
					<button type="submit" onClick={onSubmitDisplayName}>Change</button>
				</form>
				<h5>UID : {user.uid} </h5>
				<button onClick={onLogOutClick} >Log Out</button>
			</div>
			
			<hr style={{"border": "solid 1px black"}}/>
			<MyNweetShow userObj={userObj} />
		</div>
	);
} 
export default Profile;