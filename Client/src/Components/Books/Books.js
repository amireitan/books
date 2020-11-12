import React, { useEffect, useContext, useState, useCallback, useMemo } from 'react';
import * as axios from "axios";
import get from "lodash/get";
import debounce from "lodash/debounce";
import { store } from '../../store.js';
import BooksTable from "./Components/BooksTable";
import Search from "../Search/Search";
import styled from "styled-components";


export const StyledBooks = styled.div`
    display: flex;
    flex-flow: row wrap;
    flex-direction: column;
`;

const LIMIT = 100;

const Books = () => {
    const { dispatch, state } = useContext(store);
    const { books } = state;

    const booksList = useMemo(() => {
        return Object.keys(books.data || {}).map((key) => {
            return books.data[key];
        })
    }, [books.data]);

    const [skip, setSkip] = useState(0);
    const [filter, setFilters] = useState('');

    const getBooks = useCallback(({skip, isSetInitial=false}) => {
        const newSkip = skip + LIMIT;

        setSkip(newSkip);

        if (isSetInitial) {
            dispatch({ type: "GET_BOOKS_DATA_INIT" });
        };

        return  axios({
                    url: `http://localhost:9000/books?limit=${LIMIT}&skip=${newSkip}&filter=${filter}`,
                    method: 'get'
                })
                .then((result) => {
                    const newBooksList = get(result, 'data.data');
                    
                    if (newBooksList) {
                        dispatch({
                            type: 'GET_BOOKS_DATA_SUCCESS',
                            payload: newBooksList
                        });
                    }
                })
                .catch((error) => {
                    dispatch({
                        type: 'GET_BOOKS_DATA_FAILURE',
                        error
                    });
                });
    });

    useEffect(() => {
        getBooks({
            skip: 0, 
            isSetInitial: true
        });
    }, [filter]);

    useEffect(() => {
        getBooks({skip})

        return () => {
            dispatch({ type: "GET_BOOKS_DATA_INIT" });
        };
    }, []);

    const loadMoreItemsCB = useCallback(() => getBooks({skip}));

    const onTableRowSelect = (rowData) => {
        const id = `${rowData.ip}-${rowData.timestamp}`;

        dispatch({
            type: 'SELECTED_BOOK_ID',
            payload: id
        });
    };

    return (
        <StyledBooks data-id="Books">
            <Search 
                data-id="Search"
                handleChange={debounce((value) => setFilters(value), 400)}
                style={{padding: "1rem 1rem 0rem 1rem", borderRadius: "5px 5px 0 0"}}
            />
            <BooksTable 
                data-id="BooksTable"
                style={{maxWidth: "300px", maxHeight: "400px"}}
                isLoading={books.isLoading}
                data={booksList} 
                loadMoreItemsCB={loadMoreItemsCB}
                onRowSelect={onTableRowSelect}
            />
        </StyledBooks>
    )
};

export default Books; 