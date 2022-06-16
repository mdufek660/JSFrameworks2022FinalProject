import "./styleSheet.css"
import React from "react";
import 'babel-polyfill'
import {loginStore} from "../Stores/loginStore"
import BookShelf from "./BookShelf"
import {useNavigate } from "react-router-dom"


export default function Login(){

const {token, onSubmit, changeUserName, changePassword, onClick, userName, password} = loginStore((state)=>state)
const navigate = useNavigate();
return (token || localStorage.getItem("token")!="") ? (<BookShelf/>) : (
	<>
		<div className="loginPage">
			<div className = "loginFormContainer">
				<form className="form" onSubmit={(e)=>onSubmit(e)}>
					<div>Please Enter Username and Password </div>
					<input type="text" name="username" value={userName} className="inputBox" onChange={(e) => changeUserName(e)} placeholder="username"/>
					<input type="password" name="password" value={password} className="inputBox" onChange={(e) => changePassword(e)} placeholder="password"/>
				</form>
				<button className="loginSubmitButton" onClick = {()=>{onClick(userName, password); navigate("/bookshelf")}} >Login </button>
			</div>
		</div>
	</>
	)
}