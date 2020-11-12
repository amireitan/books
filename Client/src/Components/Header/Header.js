import React from 'react';
import styled from "styled-components";

const StyledHeader = styled("div")`
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    z-index: 1000;
    justify-content: center;
    align-items: center;
    background: var(--gray-dark);
    text-align: center;
    box-shadow: 5px 5px 15px 0px rgba(0,0,0,0.75);
`;


const StyleTitle = styled("h1")`
    font-family: monospace;
    line-height: 10vh;
    text-shadow: -1px -1px #5a5050;
    font-size: 30px;
    line-height: 50px;
    margin: 0px;
`;

const Header = ({ children }) => (
    <StyledHeader>
        <StyleTitle>Books</StyleTitle>
    </StyledHeader>
);


export default Header;
  