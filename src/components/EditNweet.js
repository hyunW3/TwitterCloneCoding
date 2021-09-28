import React, {useState} from "react";
import { doc,  updateDoc    } from "firebase/firestore"
import { dbService } from "../fbase";

const EditNweet = ({nweetObj,toggleEditing}) => {
	const [newNweet, setNewNweet] = useState(nweetObj.text);
	
	const onSubmit = async (event) => {
		event.preventDefault();
		const ref = doc(dbService,"nweets",nweetObj.id);
		await updateDoc(ref,{text : newNweet});
		toggleEditing();
		// setNewNweet(event.value)
	}
	const onChangeNweet = (event) => {
		const {target : { value}} = event;
		setNewNweet(value);
	}
	return (
		<div>
			<form>
				<input type="text" placeholder="Edit your Nweet" 
					onChange={onChangeNweet} value ={newNweet} required />
			</form>	
			<button onClick={toggleEditing}>Cancel</button>
			<button type="submit" onClick={onSubmit }>Finish Edit</button>
		</div>
	
	);
}

export default EditNweet;