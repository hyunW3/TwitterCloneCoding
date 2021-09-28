import React, { useState } from "react";
import EditNweet from "../components/EditNweet";
import { dbService, storageService } from "../fbase";
import { doc, deleteDoc   } from "firebase/firestore"
import { ref, deleteObject  } from "firebase/storage"

const Nweet = ({nweetObj,isOwner}) =>  {
	const [editing, setEditing] = useState(false);
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
	return (
		<div > 
			{ editing 
				? (
					<EditNweet nweetObj={nweetObj} toggleEditing={toggleEditing} />
				): (
			<div>
			<div style={{}}>
				<h4>{nweetObj.text}</h4>
				{nweetObj.attachmentUrl && <img alt="attachmentUrl" src={nweetObj.attachmentUrl} width="50px" height="50px" /> }
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