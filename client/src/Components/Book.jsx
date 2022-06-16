import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom"
import { loginStore } from "../Stores/loginStore";
import { changeShelfStore } from "../Stores/changeShelfStore";
import { bookShelfStore } from "../Stores/bookShelfStore"
import { bookStore } from "../Stores/bookStore"
import "./styleSheet.css"

export default function Book(){
	const {bookId} = useParams();
	const {onRender, response, succeeded} = bookStore((state)=>state)
	const {token, logout} = loginStore((state)=>state)
	const {handleSubmit, handleChange} = changeShelfStore((state) => state)

	const navigate = useNavigate();
	useEffect(() => {onRender(token, bookId);}, [onRender, token, bookId]);
	return( succeeded ? (
		<>
			<button onClick={()=>navigate("/search")}>Find new books</button>
			<button onClick={()=>navigate("/bookshelf")}>My bookshelf </button>
			<button onClick={()=>logout()}>logout</button>
			<div className="bookPage">
				<div className="bookInfoWrapper">

					<div className="bookContainerLeft">
						<div className="image" key={response.id}>
							{response.imageLinks && (
				                <img src={response.imageLinks.thumbnail} alt={response.title}/>
				              )}
						</div>
						{response.authors && (<div className="authors">{response.authors.map((author, idx)=>(<p key={idx}>{author}</p>))}</div>)}
						<div className="shelfBar">
							<form onSubmit={(e) => handleSubmit(e)}>
				              	<label htmlFor="bookShelf" />
				              	<select name="bookShelf" id="bookShelf" onChange={(e) => handleChange(e, response.id, token)} value={response.shelf}>
					                <option value="none">None</option>
					                <option value="currentlyReading">Currently Reading</option>
					                <option value="wantToRead">Want to Read</option>
					                <option value="read">Read</option>
		              			</select>
		            		</form>
	            		</div>
					</div>
					<div className="info">

						<div><b>Title:</b> {response.title}</div>
						{response.subtitle &&
						(<p><b>Subtitle</b>: {response.subtitle}</p>)}
						<div className="bookDesc"><b>Description:</b> {response.description}</div>
						{response.categories && (
							<p><b>Categories</b>: {response.categories.map((category, idx)=>(<div key={idx}>{category}</div>))}</p>)}
					</div>
				</div>
			</div>
		</>
		) : (
		<>
			<button onClick={()=>navigate("/search")}>Find new books</button>
			<button onClick={()=>navigate("/bookshelf")}>My bookshelf </button>
			<button onClick={()=>logout()}>logout</button>
			<div className="bookNotFound">Apologies but the book details can not be retrieved</div>
			<img src={"https://wompampsupport.azureedge.net/fetchimage?siteId=7575&v=2&jpgQuality=100&width=700&url=https%3A%2F%2Fi.kym-cdn.com%2Fentries%2Ficons%2Fmobile%2F000%2F034%2F772%2FUntitled-1.jpg"}
			alt={"sad"} />
		</>
		)
		)
}