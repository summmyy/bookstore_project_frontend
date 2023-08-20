// BookContext.js
import React, { createContext, useContext, useReducer } from 'react';

const BookContext = createContext();

const initialState = {
  books: [],
};

const bookReducer = (state, action) => {
  switch (action.type) {
    case 'DELETE_BOOK':
      return {
        ...state,
        books: state.books.filter(book => book.id !== action.payload),
      };
    default:
      return state;
  }
};

export const BookProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookReducer, initialState);

  return (
    <BookContext.Provider value={{ state, dispatch }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBookContext = () => useContext(BookContext);
