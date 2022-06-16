import create from "zustand"
import axios from "axios"

export const searchStore = create((set) => ({
	searchMe: "",
	response:[],
	succeededSearch:false,

	
	handleSearchTextChange:(e)=>{set({searchMe:e.target.value})},

	search: async (searchMe) => {
		if(!searchMe){
			alert("Can't search for nothing")
		}else{
			try{
				const response = await axios(`/api/book/search/${searchMe}`, {method: "GET"})
				set({response:response.data.books})
				if(response.data.books.length!=0){
					set({succeededSearch: true})
				}else{
					set({succeededSearch: false})
				}
			}catch(err){
				set({succeededSearch: false})
				alert("Unexpected error has occured!")
			}
		}
	}

}))