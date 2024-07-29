
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import BookList from "./pages/BooksList";
import CreateBook from "./pages/CreateBooks";
import ShowBook from "./pages/ShowBook";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";

const App = () => {
  return (
    
   <Routes>
    <Route path="/register" element={<Signup />} />
    <Route path="/home" element={<Home />} />
    <Route path="/books/list/:id" element={<BookList />} />
    <Route path="/books/create" element={<CreateBook />} />
    <Route path="/books/details/:id" element={<ShowBook /> }/>
    <Route path="/books/edit/:id" element={<EditBook />} />
    <Route path="/books/delete/:id" element={<DeleteBook />} />
  </Routes>
 
  );
};

export default App;