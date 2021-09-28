import React, { useState,useEffect } from "react";
import { dbService } from "../fbase";
import Nweet from "../components/Nweet";
import NweetWriteForm from "../components/NweetWriteForm";
import { collection,onSnapshot } from "firebase/firestore";

const Home = ({userObj}) => {
	const [nweets, setNweets] = useState([]);
	useEffect(() => {
		const dbNweets = collection(dbService,"nweets");
		onSnapshot(dbNweets,(snapshot) => {
			const nweetArr = snapshot.docs.map(doc => 
								({id : doc.id, ...doc.data(),
							}));
			setNweets(nweetArr);
		});
	},[])
	
	return(
		<div>
			<span>Home</span>
			<NweetWriteForm userObj = {userObj}/>
			<div>
				{nweets && nweets.map((nweet) => (
					<Nweet key={nweet.id} nweetObj={nweet} isOwner={(userObj.uid===nweet.creatorId)} />
				))}
			</div>
		</div>
	);
};
export default Home