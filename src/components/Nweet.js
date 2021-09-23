import React, { useState } from "react";
import { dbService } from "../fbase";
import { collection, doc, deleteDoc, updateDoc    } from "firebase/firestore"

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
			const ref = doc(dbService,"nweets",nweetObj.id);
			console.log(ref)
			await deleteDoc(ref);
		}
	}
	const toggleEditing = () => setEditing((prev) => !prev);
	const onSubmit = async (event) => {
		event.preventDefault();
		const ref = doc(dbService,"nweets",nweetObj.id);
		console.log(nweetObj)
		await updateDoc(ref,{text : newNweet});
		toggleEditing();
		// setNewNweet(event.value)
	}
	const onChangeNweet = (event) => {
		const {target : {name, value}} = event;
		// console.log(name,value)
		setNewNweet(value);
	}
	// console.log(nweetObj.creatorId,isOwner)
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
			<h4>{nweetObj.text}</h4>
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