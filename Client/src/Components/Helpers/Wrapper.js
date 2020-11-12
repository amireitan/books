import React from 'react';
import styled from "styled-components";

export const Wrapper = styled("div")`
    display: flex;
    position: relative;
    overflow: ${({overflow}) => overflow ? overflow : "initial"};
    flex-wrap: ${({flexWrap}) => flexWrap ? flexWrap : "wrap"};
    padding: ${({padding}) => padding ? padding :  "20px"};
    background: ${({background}) => background ? background :  "#6c757d"};
    border-radius: ${({borderRadius}) => borderRadius ? borderRadius :  "10px"};;
`;


/*
    <Wrapper data-id="Wrapper" style={{padding: "10px"}}>
*/