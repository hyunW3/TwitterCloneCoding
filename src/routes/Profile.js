import React, { useState, useEffect } from "react";
import { authService,dbService } from "../fbase"
import { useHistory } from "react-router-dom";
import { onSnapshot, ref, where, orderBy, query, collection } from "firebase/firestore"
import { updateProfile } from "firebase/auth"
const Profile = ({userObj,refreshUser}) => {
	const objName = (userObj.displayName!==null)?(userObj.displayName):""
	const [nweets,setNweets] = useState([]);
	const [newDisplayName, setNewDisplayName] = useState(objName)
	const history = useHistory();
	const onLogOutClick = () => {
		authService.signOut();
		history.push("/");
	}
	const parseDate = (milisec) => {
		const date = new Date();
		date.setTime(milisec);
		return date.toString()
	}
	const onSubmitDisplayName = async (event) => {
		event.preventDefault();
		// console.log(authService.currentUser)
		await updateProfile(userObj, {displayName : newDisplayName});
		await refreshUser();
		// await console.log(authService.currentUser.displayName)
		//updateUser
	}
	const onChangeDisplayName = (event) => {
		const {target:{value}} = event;
		setNewDisplayName(value);
	}
	useEffect(() => {
		const getMyNweets = async(userObj) => {
			const dbNweets = await query(collection(dbService,"nweets"), where("creatorId","==",userObj.uid), orderBy("createAt"));
			onSnapshot(dbNweets,(snapshot) => {
				const nweetArr = snapshot.docs.map((doc) => doc.data() );
				setNweets(nweetArr);
			});	
		}
		getMyNweets(userObj);
		// console.log(nweets);
	},[userObj])
	const formStyle = {"display":"flex", "flexDirection": 'row',}
	return (
		<div>
			<div>
				<p>Profile</p>
				<h4>Email : {userObj.email}</h4>
				<form style={formStyle}>
					<h4 style={{"margin":"1px"}}>DisplayName : </h4>
					<input type="text" value={newDisplayName} onChange={onChangeDisplayName}/>
					<button type="submit" onClick={onSubmitDisplayName}>Change</button>
				</form>
				<h5>UID : {userObj.uid} </h5>
				<button onClick={onLogOutClick} >Log Out</button>
			</div>
			<hr style={{"border": "solid 1px black"}}/>
			
			<div>
				<h3>My Tweets</h3>
				<hr />
				{nweets && 
					nweets.map((obj) => (
						<div key={obj.createAt}>
						<h4>{obj.text}</h4>
						
						<p>{parseDate(obj.createAt)}</p>
						</div>
					))
				}
			</div>
		</div>
	);
} 
export default Profile;