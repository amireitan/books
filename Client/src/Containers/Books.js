import React, {Fragment} from 'react';
import styled from "styled-components";
import Books from "../Components/Books/Books";
import BookInfo from "../Components/BookInfo/BookInfo";
import { Centerizer } from  "../Components/Helpers/Centerizer";
import { Wrapper } from  "../Components/Helpers/Wrapper";

const BooksContent =  styled("article")`
    flex: 8;
    padding: 10px;
`

const BookContent =  styled("aside")`
    flex: 4;
    padding: 10px;
    @media (max-width: 724px) {
        flex-direction: column;
        & div, form {
            width: 100%;
        }
    }
`

const Content = () => {
   
    return (
        <Fragment>
            <BooksContent>
                <Centerizer data-id="Centerizer" >
                    <Wrapper data-id="Wrapper">
                        <Books/>
                    </Wrapper>
                </Centerizer>
            </BooksContent>
            {/* <BookContent>
                <Centerizer data-id="Centerizer">
                    <Wrapper data-id="Wrapper">
                        <BookInfo/>
                    </Wrapper>
                </Centerizer>
            </BookContent> */}
        </Fragment>
    );
};

export default Content;