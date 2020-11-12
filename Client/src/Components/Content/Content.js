import React from 'react';
import styled from "styled-components";

const StyledContent = styled("div")`
    display: flex;
    flex-direction: row;
    position: absolute;
    top: 50px;
    bottom: 50px;
    left: 0;
    width: 100%;
    overflow: auto;
    background: #e8eef3;
    color: var(--white);

    @media (max-width: 1024px) {
        flex-direction: column;
        flex-wrap: wrap;
    }
`;

const Content = ({ children }) => {
   
    return (
        <StyledContent>
            {children}
        </StyledContent>
    );
};

export default Content;