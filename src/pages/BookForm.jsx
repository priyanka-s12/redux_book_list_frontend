import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addBookAsync, updateBookAsync } from '../features/books/booksSlice';
import { Link, useLocation } from 'react-router-dom';

const BookForm = () => {
  const [formData, setFormData] = useState({
    bookName: '',
    author: '',
    genre: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch = useDispatch();

  const location = useLocation();
  console.log(location);

  const { state: existingBook } = location;
  console.log(existingBook);

  useEffect(() => {
    if (existingBook) {
      if (existingBook.bookName && existingBook.author && existingBook.genre) {
        setFormData(existingBook);
      }
    }
  }, [existingBook]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    const newBook = { ...formData };

    if (existingBook) {
      dispatch(updateBookAsync({ _id: existingBook._id, ...newBook }));
      setSuccessMessage('Book updated successfully');
    } else {
      dispatch(addBookAsync(newBook));
      setSuccessMessage('Book added successfully !!!');
    }

    const emptyValues = {
      bookName: '',
      author: '',
      genre: '',
    };

    setFormData(emptyValues);
  };

  return (
    <>
      <h2>{existingBook ? 'Edit' : 'Add'} Book</h2>
      {successMessage && <p>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          {/* name filed mandatory to get value from it coz we r using formdata object, for saving [name]: value in object*/}
          <input
            type="text"
            placeholder="Book Name"
            name="bookName"
            value={formData.bookName}
            onChange={changeHandler}
            required
          />
        </div>
        <br />
        <div>
          <input
            type="text"
            placeholder="Author"
            name="author"
            value={formData.author}
            onChange={changeHandler}
            required
          />
        </div>
        <br />
        <div>
          <input
            type="text"
            placeholder="Genre"
            name="genre"
            value={formData.genre}
            onChange={changeHandler}
            required
          />
        </div>
        <br />
        <div>
          <button type="submit">{existingBook ? 'Update' : 'Add'}</button>
        </div>
      </form>
      <br />
      <div>
        <Link to="/">Go Back to Home Page</Link>
      </div>
    </>
  );
};

export default BookForm;
