import React, { useState,useEffect } from "react";
import { dbService } from "../fbase";
import { collection,doc,getDocs,addDoc } from "firebase/firestore"

const Home = () => {
	const [nweet, setNweet] = useState("");
	const [nweets, setNweets] = useState([]);
	const dbNweets = collection(dbService,"nweets");
	const getNweets = async() =>{
		const snapShot = await getDocs(dbNweets);
		snapShot.docs.forEach((doc) => {
			const nweetObject = { ...doc.data(), id : doc.id};
			// console.log(nweetObject)
			setNweets((prev)=> [nweetObject, ...prev])
		});
		console.log(nweets);
		// setNweets(NweetList);
	}
	useEffect(() => {
		getNweets();
	},[])
	const onSubmit = async(event) => {
		// console.log("clicked")
		event.preventDefault();
		await addDoc(dbNweets ,{
			data : nweet,
			createAt : Date.now()
		});
;		setNweet("");
	}
	const onChange = (event) => {
		const { target :{name,value} } = event;
		setNweet(value);
	}
	return(
		<div>
			<span>Home</span>
			<form>
				<input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
				<input type="submit" onClick={onSubmit} value="Nweet" />
			</form>
			<div>
				{nweets.map((nweet) => {
					<div key={nweet.id} > 
						<h4>{nweet.data}</h4>
						<p>{nweet.createAt}</p>
						<hr />
					</div>
				})}
			</div>
		</div>
	);
};
export default Home