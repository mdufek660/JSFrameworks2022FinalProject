import { loginStore } from "../Stores/loginStore"
import { changeShelfStore } from "../Stores/changeShelfStore"
import { bookShelfStore } from "../Stores/bookShelfStore"
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import "./styleSheet.css"

export default function BookShelf(){
	const {onRender, currentlyReading, wantToRead, read} = bookShelfStore((state)=> state)
	const navigate = useNavigate();
	const {token, logout, onLoad} = loginStore((state)=>state)
	const {handleSubmit, handleChange, handleRemove} = changeShelfStore((state) => state)

	useEffect(() => {onRender(token); onLoad()}, [token, handleChange, handleRemove,currentlyReading, wantToRead, read])

	return(<>
			<button onClick={()=>navigate("/search")}>Find new books</button>
			<button onClick={()=>logout()}>logout</button>
			<div className="bookCase">
				<div className="shelf" id="currentlReading">
					<div>Currently Reading</div>
					{ currentlyReading && currentlyReading.map((book, index)=>(
						<div className="bookOnShelf">
							<div className="bookContainerLeft">
								<div className="image" key={book.id}>
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
			            		<button onClick={()=>handleRemove(book.id, token)}>Remove</button>
			            		</div>
							</div>
							<div className="info">
								<div>{book.title}</div>
								{book.authors && (<div className="authors">{book.authors.map((author, idx)=>(<p key={idx} className="authors">{author},</p>))}</div>)}
								<button onClick={()=>navigate('/book/'+book.id)}>More info</button>
							</div>
						</div>
					))}
				</div>

				<div className="shelf" id="wantToRead">
					<div>Want to Read</div>
					{ wantToRead && wantToRead.map((book, index)=>(
						<div className="bookOnShelf">
							<div className="bookContainerLeft">
								<div className="image" key={book.id}>
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
			            		<button onClick={()=>handleRemove(book.id, token)}>Remove</button>
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

				<div className="shelf" id="read">
					<div>Already Read</div>
					{ read && read.map((book, index)=>(
						<div className="bookOnShelf">
							<div className="bookContainerLeft">
								<div className="image" key={book.id}>
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
			            		<button onClick={()=>handleRemove(book.id, token)}>Remove</button>
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

		</>)
}