import React, { useState,useEffect } from "react";
import { dbService, storageService } from "../fbase";
import { v4 as uuidv4 } from "uuid"
import Nweet from "../components/Nweet";
import { collection,onSnapshot , doc,getDocs,addDoc } from "firebase/firestore"

const Home = ({userObj}) => {
	const [nweet, setNweet] = useState("");
	const [nweets, setNweets] = useState([]);
	const [user, setUser] = useState();
	const [imageAttachment, setImageAttachment] = useState();
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
		const storageRef = storageService.ref();
		console.log(storageRef)
		storageRef.child(`${userObj.uid}/${uuidv4()}`);
		const res = await storageRef.putString(imageAttachment, "data_url")
		console.log(res)
		/*
		if (nweet.length>0){
			await addDoc(dbNweets ,{
				text : nweet,
				createAt : Date.now(),
				creatorId : user.uid,
			});
			setNweet("");
		}
		*/
	}
	const onChange = (event) => {
		const { target :{name,value} } = event;
		setNweet(value);
	}
	const onFileChange = (event) => {
		const { target:{files} } = event;
		const theFile = files[0];
		const reader = new FileReader();
		reader.onloadend = (finishedEvent) => {
			const {target:{result}} =finishedEvent;
			setImageAttachment(result)
		}
		reader.readAsDataURL(theFile);
	}
	const onClearPhoto = () => {
		setImageAttachment(null);
	}
	return(
		<div>
			<span>Home</span>
			<form>
				<input value={nweet} onChange={onChange} type="text" 
					placeholder="What's on your mind?" maxLength={120} />
				<input type="file" accept="image/*" onChange={onFileChange}/>
				<input type="submit" onClick={onSubmit} value="Nweet" />
			</form>
			{ imageAttachment && 
				<div>
					<img src={imageAttachment} width="100px" height ="100px" />
					<button onClick={onClearPhoto}>Clear Image</button>
				</div>
			}
			<div>
				{nweets && nweets.map((nweet) => (
					<Nweet key={nweet.id} nweetObj={nweet} isOwner={(userObj.uid==nweet.creatorId)} />
				))}
			</div>
		</div>
	);
};
export default Home