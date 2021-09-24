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
				setUserObj({
					uid : user.uid,
					email : user.email,
					displayName : user.displayName,
					auth : user.auth,
					metadata : user.metadata,
					getIdToken : (args) => user.getIdToken(args),
					providerData : user.providerData,
					_updateTokensIfNecessary : user._updateTokensIfNecessary,
				});
				
				//setUserObj(user)
				// console.log("user",user.uid,user.email)
			}else {
				setIsLoggedIn(false);
			}
			setInit(true);
		});
	},[])
	const refreshUser = () => {
		const updateUser = authService.currentUser;
		//setUserObj(updateUser);
		const newUser = {
                    uid : updateUser.uid,
                    email : updateUser.email,
                    displayName : updateUser.displayName,
                    auth : updateUser.auth,
                    metadata : updateUser.metadata,
                    getIdToken : (args) => updateUser.getIdToken(args),
                    providerData : updateUser.providerData,
                    _updateTokensIfNecessary : updateUser._updateTokensIfNecessary,
		}
		setUserObj(Object.assign({},newUser));
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
