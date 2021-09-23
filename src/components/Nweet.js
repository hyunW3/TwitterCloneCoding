import React from "react";

const Nweet = ({nweetObj,isOwner}) =>  {
	const parseDate = (milisec) => {
		const date = new Date();
		date.setTime(milisec);
		return date.toString()
	}
	// console.log(nweetObj.creatorId,isOwner)
	return (
		<div > 
			<h4>{nweetObj.text}</h4>
			<p>{parseDate(nweetObj.createAt)}</p>
			<div>
				{ (isOwner) &&
					<>
					<button>Edit Nweet</button>
					<button>Delete Nweet</button>
					</>
				}
			</div>
			<hr />
		</div>
	);
} 
			
export default Nweet;