import React from 'react';
import styled from "styled-components";

export const Centerizer = styled("div")`
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    flex-wrap: ${({flexWrap}) => flexWrap ? flexWrap : "wrap"};
`;

/*
    <Centerizer data-id="Centerizer">
*/