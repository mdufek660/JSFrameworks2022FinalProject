import create from "zustand";
import axios from "axios";

export const bookStore = create((set) => ({
response: "",
succeeded:false,
onRender: async (token, bookId) => {
  try{
    const response = await axios(`/api/book/${bookId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, }});
    set({ response: response.data.book });
    set({ succeeded: true })
  }catch(err){
    set({ succeeded: false })
  }
}}));