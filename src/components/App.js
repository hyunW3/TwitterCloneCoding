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
			}else {
				setIsLoggedIn(false);
			}
			setInit(true);
		});
	},[]);
	const refreshUser = () => {
		const updateUser =  authService.currentUser;	
		setUserObj(Object.assign({},updateUser )); // to re-render
		setUserObj(updateUser); 
	}
  return (
	  <>
	  {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} refreshUser={refreshUser} /> : "Initializing..." }
	  	<footer style={{"topMargin":"30px"}}>
		  &copy; {new Date().getFullYear()} Nwitter
	  	</footer>
	  </>
  );
		
}

export default App;
