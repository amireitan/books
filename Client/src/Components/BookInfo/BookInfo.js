import React, { useContext, useState, useCallback, Fragment, useEffect } from 'react';
import BookEditForm from "./Components/BookEditForm";
import { store } from '../../store.js';
import * as axios from "axios";

const BookInfo = () => {
    const { dispatch, state } = useContext(store);
    const [currentBook, setCurrentBook]  = useState(null);

    const { bookInfo, books } = state;

    useEffect(() => {
        const {selectedBookId, isLoading, error} = bookInfo;
        const selectedById = books.data && books.data[selectedBookId];
        
        setCurrentBook(selectedById ? selectedById : null);

    }, [bookInfo.selectedBookId, books]);


    const updateBookData = useCallback((data) => {

        dispatch({
            type: 'UPDATE_BOOK_DATA_REQUEST'
        });

        return  axios({
                    url: `http://localhost:9090/books/`,
                    method: 'put'
                })
                .then((result) => {
                    dispatch({
                        type: 'UPDATE_BOOK_DATA_SUCCESS'
                    });
                })
                .catch((error) => {
                    dispatch({
                        type: 'UPDATE_BOOK_DATA_FAILURE',
                        error
                    });
                });
    }, []);

    return (
        <BookEditForm 
            data={currentBook} 
            onSubmit={updateBookData}
            noContent={<div>NO BOOK SELECTION</div>}
        />
    );
}

export default BookInfo;