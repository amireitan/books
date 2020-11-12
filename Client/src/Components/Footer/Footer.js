import React from 'react';
import styled from "styled-components";

const StyledFooter = styled("div")`
    display: flex;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    background: #565656;
    text-align: center;

    @media (max-width: 755px) {
        flex-direction: column;
    }
`;

const StyleTitle = styled("h1")`
    font-family: monospace;
    text-shadow: -1px -1px #5a5050;
    line-height: 50px;
    font-size: 30px;
    margin: 0px;
`;

const Footer = ({ children }) => (
    <StyledFooter>
        <StyleTitle></StyleTitle>
    </StyledFooter>
);


export default Footer;
  