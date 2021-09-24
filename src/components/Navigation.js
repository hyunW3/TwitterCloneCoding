import React from "react";
import { Link } from "react-router-dom";
const Navigation = ({userObj}) => {
	const displayName = (userObj.displayName != null)?(userObj.displayName):(userObj.email)
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