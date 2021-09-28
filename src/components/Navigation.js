import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
const Navigation = ({userObj}) => {
	const [displayName,setDisplayName] = useState("")
	
	useEffect(() => {
		const objName = (userObj.displayName != null)?(userObj.displayName):(userObj.email)
		setDisplayName(objName)
	},[userObj,displayName])
	return(
		<nav>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/profile">{displayName}의 Profile</Link>
				</li>
			</ul>
			
		</nav>
	);
}

export default Navigation;