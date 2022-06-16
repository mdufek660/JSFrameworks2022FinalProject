import create from "zustand";
import axios from "axios";
import 'babel-polyfill'

export const loginStore = create((set) => ({
	token: "",
	userName:"",
	password:"",
	validated: false,
	threwError: false,

	onSubmit: (e)=> {e.preventDefault();},
	changeUserName: (e)=>set({userName: e.target.value}),
	changePassword: (e)=>set({password: e.target.value}),

	onClick: async(userName, password)=>{
		if(localStorage.getItem("token")==""){
			localStorage.setItem("token", "")
			try{
				if(userName == ""){alert("Please enter a username!");set({validated: false})}
				else if(password==""){alert("Please enter a password!");set({validated: false})}
				else{
					const response = await axios("/api/signin", {
						method: "POST",
						headers:{
							"Content-Type":"application/json"
						},
						data:{
							username:userName,
							password:password
						}
					});
					set({token: response.data.token})
					localStorage.setItem("token", response.data.token)
					set({validated: true})
				}
			}catch(err){
				set({validated: false})
				set({threwError: true})
				localStorage.setItem("token", "")
				alert("Invalid credentials!")
			}
		}else{
			set({validated:true})
			set({token: localStorage.getItem("token")})
		}
	},

	setThrewError: (status) => set({threwError: status}),

	logout: () =>{
		set({token:""})
		set({validated:false})
		localStorage.setItem("token","")
		set({userName:""})
		set({password:""})
	},

	onLoad: () => {set({token:localStorage.getItem("token")})}
}))