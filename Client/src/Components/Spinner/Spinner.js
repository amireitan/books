import React from 'react';
import { Spinner } from 'react-bootstrap';
import styled from "styled-components";

export const StyledContainer = styled.div`
    display: flex;
    align-items: center;
    jusitfy-content: center;
    flex-direction: column;
`;

export const StyledText = styled.div`
    color: #444444;
    margin-top: 10px;
`;

const SpinnerComp = ({ 
    animation="border",
    size="sm",
    variant="primary",
    children=null,
    containerStyle=null,
    spinnerStyle=null
}) => (
    <StyledContainer style={containerStyle}>
        <Spinner animation={animation} 
                 variant={variant} 
                 size={size} 
                 role="status"
                 style={spinnerStyle}
        >
        </Spinner>
        {
            (children && children) || <StyledText>Loading...</StyledText>
        }
    </StyledContainer >
);

export default SpinnerComp;