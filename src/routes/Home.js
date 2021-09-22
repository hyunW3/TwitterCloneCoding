import React, { useState,useEffect } from "react";
import { dbService } from "../fbase";
import { collection,onSnapshot , doc,getDocs,addDoc } from "firebase/firestore"

const Home = (userObj) => {
	const [nweet, setNweet] = useState("");
	const [nweets, setNweets] = useState([]);
	const [user, setUser] = useState();
	const dbNweets = collection(dbService,"nweets");
	useEffect(() => {
		setUser(userObj);
		onSnapshot(dbNweets,(snapshot) => {
			const nweetArr = snapshot.docs.map(doc => 
								({id : doc.id, ...doc.data(),
							}));
			setNweets(nweetArr);
		});
	},[])
	const onSubmit = async(event) => {
		event.preventDefault();
		if (nweet.length>0){
			//console.log(nweet,user.uid);
			await addDoc(dbNweets ,{
				text : nweet,
				createAt : Date.now(),
			//	creatorId : user.uid,
			});
			setNweet("");
			
		}
	}
	const onChange = (event) => {
		const { target :{name,value} } = event;
		setNweet(value);
	}
	const parseDate = (milisec) => {
		const date = new Date();
		date.setTime(milisec);
		console.log(date)
		return date.toString()
	}
	return(
		<div>
			<span>Home</span>
			<form>
				<input value={nweet} onChange={onChange} type="text" 
					placeholder="What's on your mind?" maxLength={120} />
				<input type="submit" onClick={onSubmit} value="Nweet" />
			</form>
			<div>
				{nweets && nweets.map((nweet) => (
					<div key={nweet.id} > 
						<h4>{nweet.text}</h4>
						<p>{parseDate(nweet.createAt)}</p>
						<hr />
					</div>
				))}
			</div>
		</div>
	);
};
export default Home