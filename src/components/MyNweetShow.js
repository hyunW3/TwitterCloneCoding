import React, {useEffect, useState} from "react";
import { dbService } from "../fbase"
import { onSnapshot, where, orderBy, query, collection } from "firebase/firestore"

const MyNweetShow = ({userObj}) => {
	const [nweets,setNweets] = useState([]);
	
	const parseDate = (milisec) => {
		const date = new Date();
		date.setTime(milisec);
		return date.toString()
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
	},[userObj]);
	return (
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
	
	);
}
export default MyNweetShow;