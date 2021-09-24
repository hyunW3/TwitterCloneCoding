import React, { useState } from "react";
import { dbService,storageService } from "../fbase";
import { collection, doc, deleteDoc, updateDoc    } from "firebase/firestore"
import { ref, deleteObject  } from "firebase/storage"
const Nweet = ({nweetObj,isOwner}) =>  {
	const dbNweets = collection(dbService,"nweets");
	const [editing, setEditing] = useState(false);
	const [newNweet, setNewNweet] = useState(nweetObj.text);
	const parseDate = (milisec) => {
		const date = new Date();
		date.setTime(milisec);
		return date.toString()
	}
	const onDeleteClick = async() => {
		const ok = window.confirm("Are you sure you want to delete this nweet?");
		if (ok){
			const DbRef = doc(dbService,"nweets",nweetObj.id);
			const storageRef = ref(storageService,nweetObj.attachmentUrl)
			await deleteDoc(DbRef);
			await deleteObject(storageRef)
		}
	}
	const toggleEditing = () => setEditing((prev) => !prev);
	const onSubmit = async (event) => {
		event.preventDefault();
		const ref = doc(dbService,"nweets",nweetObj.id);
		await updateDoc(ref,{text : newNweet});
		toggleEditing();
		// setNewNweet(event.value)
	}
	const onChangeNweet = (event) => {
		const {target : {name, value}} = event;
		setNewNweet(value);
	}
	return (
		<div > 
			{ editing 
				? (
				<>
					<form>
						<input type="text" placeholder="Edit your Nweet" 
							onChange={onChangeNweet} value ={newNweet} required />
					</form>	
					<button onClick={toggleEditing}>Cancel</button>
					<button type="submit" onClick={onSubmit }>Finish Edit</button>
				</>
				): (
			<div>
			<div style={{}}>
				<h4>{nweetObj.text}</h4>
				{nweetObj.attachmentUrl && <img src = {nweetObj.attachmentUrl} width="50px" height="50px" /> }
			</div>
			<p>{parseDate(nweetObj.createAt)}</p>
				
				{ (isOwner) &&
					<>
					<button onClick={onDeleteClick}>Delete Nweet</button>
					<button onClick={toggleEditing}>Edit Nweet</button>
					</>
				}
			<hr />
			</div>
			)}
		</div>
	);
} 
			
export default Nweet;