import create from "zustand";
import axios from "axios";

export const changeShelfStore = create((set) => ({
	status:"",

	handleSubmit: (e) => {e.preventDefault();},

	handleChange: async(e, id, token)=>{
		if(e.target.value=="none"){
			try{
				const response = await axios(`/api/bookshelf/${id}`,
				{
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${token}`
					}
				})
				set({status: response.data})
			}
			catch(err){
				set({status: "could not remove!"})
				console.log(err)
				alert("Error removing book from shelf!")
			}
		} else{
			try{
				const response = await axios(`/api/bookshelf/${id}/${e.target.value}`,
				{
		        	method: "PUT",
		       	 	headers: {
		          	Authorization: `Bearer ${token}`,
		        	},
				})
				console.log("successful put")
				set({status: response.data})
			}
			catch(err){
					set({status:"could not add!"})
					alert("Error adding book to shelf!")
				}
			}
		},

		handleRemove: async(id, token)=>{
			try{
				const response = await axios(`/api/bookshelf/${id}`,
				{
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${token}`
					}
				})
				set({status: response.data})
			}
			catch(err){
				set({status: "could not remove!"})
				alert("Error removing book from shelf!")
			}
		}
	}
	
))