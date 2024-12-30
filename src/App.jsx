import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BookView from './features/books/BookView';
import BookForm from './pages/BookForm';

function App() {
  return (
    <>
      <Router>
        <h1>Book List App</h1>
        <Routes>
          <Route path="/" element={<BookView />} />
          <Route path="/addbook" element={<BookForm />} />
          <Route path="/editbook/:id" element={<BookForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
