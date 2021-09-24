import React, { useState,useEffect } from "react";
import { dbService, storageService } from "../fbase";
import { v4 as uuidv4 } from "uuid"
import Nweet from "../components/Nweet";
import { collection,onSnapshot , getDocs,addDoc } from "firebase/firestore"
import { ref, uploadString, getDownloadURL } from "firebase/storage";

const Home = ({userObj}) => {
	const [nweet, setNweet] = useState("");
	const [nweets, setNweets] = useState([]);
	const [err, setErr] = useState("");
	const [imageAttachment, setImageAttachment] = useState("");
	useEffect(() => {
		const dbNweets = collection(dbService,"nweets");
		onSnapshot(dbNweets,(snapshot) => {
			const nweetArr = snapshot.docs.map(doc => 
								({id : doc.id, ...doc.data(),
							}));
			setNweets(nweetArr);
		});
	},[])
	const onSubmit = async(event) => {
		event.preventDefault();
		setErr("");
		const dbNweets = collection(dbService,"nweets");
		let attachmentUrl = "";
		if (imageAttachment != ""){
			try{
				const storageRef = ref(storageService,`${userObj.uid}/${uuidv4()}`);
				const res = await uploadString(storageRef,imageAttachment, "data_url");
				attachmentUrl = await getDownloadURL(res.ref);
			} catch(error){
				setErr("attachmentUrl",imageAttachment,error.message)
			}
		}
		const nweetData = {
			text : nweet,
			createAt : Date.now(),
			creatorId : userObj.uid,
			attachmentUrl,
		}
		try {
			await addDoc(dbNweets ,nweetData );
		} catch(error){
			setErr("addDoc",error.message)
		}
		setNweet("");
	}
	const onChange = (event) => {
		const { target :{value} } = event;
		setNweet(value);
	}
	const onFileChange = (event) => {
		setImageAttachment("");
		const { target:{files} } = event;
		const theFile = files[0];
		const reader = new FileReader();
		reader.onloadend = (finishedEvent) => {
			const {target:{result}} =finishedEvent;
			setImageAttachment(result)
		}
		try {
			reader.readAsDataURL(theFile);
		} catch (error){
			setErr("onFileChange",error.message);
			setImageAttachment("");
		}
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
			{err &&
				<div>
				<h4>Error : {err}</h4>
				</div>
			}
			{ imageAttachment && 
				<div>
					<img alt="upLoadImg" src={imageAttachment} width="100px" height ="100px" />
					<button onClick={onClearPhoto}>Clear Image</button>
				</div>
			}
			<div>
				{nweets && nweets.map((nweet) => (
					<Nweet key={nweet.id} nweetObj={nweet} isOwner={(userObj.uid===nweet.creatorId)} />
				))}
			</div>
		</div>
	);
};
export default Home