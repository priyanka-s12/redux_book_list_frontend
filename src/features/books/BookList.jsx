import { useDispatch } from 'react-redux';
import { deleteBookAsync, fetchBooks } from './booksSlice';
import { Link } from 'react-router-dom';

const BookList = ({ books }) => {
  //   console.log(books);
  const dispatch = useDispatch();

  const handleDelete = (bookId) => {
    dispatch(deleteBookAsync(bookId)).then((response) => {
      console.log(response);
      dispatch(fetchBooks());
    });
  };

  return (
    <div>
      <ul>
        {books?.map((book) => (
          <li key={book._id}>
            {book.bookName} - Author: {book.author} - Genre: {book.genre} -
            <button>
              <Link to={`/editbook/${book._id}`} state={book}>
                Edit
              </Link>
            </button>
            -<button onClick={() => handleDelete(book._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
