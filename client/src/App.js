import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import SearchBooks from "./Components/SearchBooks";
import BookShelf from "./Components/BookShelf"
import Book from "./Components/Book"
import './App.css';
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <>
    <div className="App">
      <div className="Content">
        <Routes>
          <Route exact path="/" element={<Login />} component={Login}/>
            <Route element={<ProtectedRoute />}>
              <Route exact path="/bookshelf" element={<BookShelf />} component={BookShelf} />
              <Route exact path="/search" element={<SearchBooks />} component={SearchBooks} />
              <Route exact path="/book/:bookId" element={<Book />} component = {Book} />
            </Route>
        </Routes>
      </div>
    </div>
  </>

  );

}

export default App;
