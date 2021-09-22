import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { authService } from "../fbase";

const Auth=  () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [newAccount, setNewAccount] = useState(true);
	const [error,setError] = useState("");
	const onChange = (event) => {
		// console.log(event.target.name);
		const {target: {name, value}} = event;
		if(name === "email"){
			setEmail(value);
		}else if(name === "password"){
			setPassword(value)
		}
	}
	const onSubmit = async (event) => {
		event.preventDefault();
		try{
			let data;
			if(newAccount){
				// create Account
				data = await createUserWithEmailAndPassword(authService,email,password)
			} else {
				// log in
				data = await signInWithEmailAndPassword(authService,email,password)
			}
			console.log(data)
		} catch (error){
			console.log(error)
			setError(error.message)
		}
	}
	const toggleAccount = () => setNewAccount(prev => !prev)
	const onSocialClick = (event) => {
		const {target: {name}} = event;
		let provider;
		if (name === "google"){
			console.log("google")
			provider = new authService.GoogleAuthProvider();
		}else if(name === "github"){
			console.log("github")
			provider = new authService.GithubAuthProvider();
		}
	}
	
	return(
<div>
	<form onSubmit={onSubmit}>
		<input name="email" type="text" placeholder="Email" required 
			value={email} onChange={onChange}/>
		<input name="password" type="password" placeholder="Password" required 
			value={password} onChange={onChange} />
		<input type="submit" value ={ newAccount ? "Create Account" : "Log In" } />
	</form>
	<span onClick={toggleAccount}> {newAccount ? "Sign In" : "CreateAccount"  }</span>
	<div>
		<button name="google" onClick={onSocialClick}>Continue with Google</button>
		<button name="github" onClick={onSocialClick}>Continue with Github</button>
	</div>
	<div>
		{error ? <p> {error} </p>: <p></p>}
	</div>
</div>
	);
}

export default Auth;