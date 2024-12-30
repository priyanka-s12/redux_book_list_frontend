import BookList from './BookList';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchBooks } from './booksSlice';
import { Link } from 'react-router-dom';

const BookView = () => {
  const books = useSelector((state) => state.books);
  const status = useSelector((state) => state.books.status);
  const error = useSelector((state) => state.books.error);
  //   console.log(books, status, error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
  }, []);
  return (
    <main>
      <section>
        <h2>Add New Book</h2>
        <Link to="/addbook">Add</Link>
      </section>
      <section>
        <h2>Book View</h2>
        {status === 'loading' && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <BookList books={books.books} />
      </section>
    </main>
  );
};

export default BookView;
