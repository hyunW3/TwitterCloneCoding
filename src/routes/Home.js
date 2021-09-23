import React, { useState,useEffect } from "react";
import { dbService } from "../fbase";
import Nweet from "../components/Nweet";
import { collection,onSnapshot , doc,getDocs,addDoc } from "firebase/firestore"

const Home = ({userObj}) => {
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
			await addDoc(dbNweets ,{
				text : nweet,
				createAt : Date.now(),
				creatorId : user.uid,
			});
			setNweet("");
		}
	}
	const onChange = (event) => {
		const { target :{name,value} } = event;
		setNweet(value);
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
					<Nweet key={nweet.id} nweetObj={nweet} isOwner={(userObj.uid==nweet.creatorId)} />
				))}
			</div>
		</div>
	);
};
export default Home