import { loginStore } from "../Stores/loginStore";
import { Link } from "react-router-dom";
import "./styleSheet.css"
import {searchStore} from "../Stores/searchStore"
import { changeShelfStore } from "../Stores/changeShelfStore";
import { useNavigate } from "react-router-dom";
import {useEffect} from "react";

export default function Search(){
	const{handleSearchTextChange, searchMe, response, search, succeededSearch} = searchStore((state)=> state)
	const {token, onLoad, logout} = loginStore((state)=>state)
	const data = response
	const navigate = useNavigate();
	useEffect(() => {onLoad()}, [token])
	const {handleSubmit, handleChange} = changeShelfStore((state) => state)
	return ( succeededSearch ? (
		<>
			<div className="searchPage">
				<div className="searchWrapper">
					<div className="searchBar">
						<button onClick={()=>navigate("/bookshelf")}>My Shelf</button>
						<button onClick={()=>logout()}>logout</button>
						<input type="text" name="searchText" value={searchMe} className="inputBox" onChange={(e)=>handleSearchTextChange(e)} placeholder="book title" />
						<button className="searchSubmitButton" onClick = {()=>search(searchMe)} >Search</button>
					</div>

					<div className="results">
						{
							data && data.map((book, index)=>(
								<div className="bookWrapper" key={book.id}>
									<div className="bookContainerLeft">
										<div className="image">
											{book.imageLinks && (
								                <img src={book.imageLinks.thumbnail} alt={book.title}/>
								              )}
										</div>
										<div className="shelfBar">
											<form onSubmit={(e) => handleSubmit(e)}>
								              	<label htmlFor="bookShelf" />
								              	<select name="bookShelf" id="bookShelf" onChange={(e) => handleChange(e, book.id, token)} value={book.shelf}>
									                <option value="none">None</option>
									                <option value="currentlyReading">Currently Reading</option>
									                <option value="wantToRead">Want to Read</option>
									                <option value="read">Read</option>
						              			</select>
						            		</form>
					            		</div>
									</div>
									<div className="info">

										<div>{book.title}</div>
										{book.authors && (<div className="authors">{book.authors.map((author, idx)=>(<p key={idx}>{author}</p>))}</div>)}
										<button onClick={()=>navigate('/book/'+book.id)}>More info</button>
									</div>
								</div>
							))} 
					</div>
				</div>
			</div>
		</>) : (
			<div className="searchPage">
				<div className="searchWrapper">
					<div className="searchBar">
								<button onClick={()=>navigate("/bookshelf")}>My Shelf</button>
								<button onClick={()=>logout()}>logout</button>
								<input type="text" name="searchText" value={searchMe} className="inputBox" onChange={(e)=>handleSearchTextChange(e)} placeholder="book title" />
								<button className="searchSubmitButton" onClick = {()=>search(searchMe)} >Search</button>
					</div>
					<div> NO RESULTS FOR SEARCH </div>
				</div>
			</div>
		)
	)}
