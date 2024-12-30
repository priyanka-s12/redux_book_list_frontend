import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const response = await axios.get(
    'https://book-list-backend-eight.vercel.app/books'
  );
  //   console.log(response);
  return response.data;
});

export const addBookAsync = createAsyncThunk(
  'books/addBookAsync',
  async (newBook) => {
    const response = await axios.post(
      'https://book-list-backend-eight.vercel.app/books',
      newBook
    );
    console.log(response);
    return response.data;
  }
);

export const deleteBookAsync = createAsyncThunk(
  'books/deleteBookAsync',
  async (bookId) => {
    const response = await axios.delete(
      `https://book-list-backend-eight.vercel.app/books/${bookId}`
    );
    return response.data;
  }
);

export const updateBookAsync = createAsyncThunk(
  'books/updateBookAsync',
  async (bookToUpdate) => {
    const response = await axios.post(
      `https://book-list-backend-eight.vercel.app/books/${bookToUpdate._id}`,
      bookToUpdate
    );
    console.log(response);
    return response.data;
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.status = 'success';
      state.books = action.payload;
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload.error;
    });

    builder.addCase(addBookAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(addBookAsync.fulfilled, (state, action) => {
      state.status = 'success';
      state.books.push(action.payload);
    });
    builder.addCase(addBookAsync.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload.error;
    });

    builder.addCase(deleteBookAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(deleteBookAsync.fulfilled, (state, action) => {
      state.status = 'success';
      console.log(action.payload);
      state.books = state.books.filter((book) => book._id !== action.payload);
    });
    builder.addCase(deleteBookAsync.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload.error;
    });

    builder.addCase(updateBookAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(updateBookAsync.fulfilled, (state, action) => {
      state.status = 'success';
      console.log(action.payload);
      state.books = state.books.map((book) =>
        book._id === action.payload._id ? action.payload : book
      );
    });
    builder.addCase(updateBookAsync.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload.error;
    });
  },
});

export default booksSlice.reducer;
