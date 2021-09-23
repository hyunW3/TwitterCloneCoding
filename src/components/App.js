import React, { useState,useEffect } from "react";
import AppRouter from "./Router";
import { onAuthStateChanged } from "firebase/auth"
import { authService } from "../fbase";

function App() {
	const [init,setInit] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userObj, setUserObj] = useState(null);
	
	useEffect(()=>{
		onAuthStateChanged(authService, (user) => {
			if(user){
				setIsLoggedIn(true);
				setUserObj(user);
				console.log("user",user.uid,user.email)
			}else {
				setIsLoggedIn(false);
			}
			setInit(true);
		});
	},[])
  return (
	  <>
	  {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/> : "Initializing..." }
	  	<footer>
		  &copy; {new Date().getFullYear()} Nwitter
	  	</footer>
	  </>
  );
		
}

export default App;
