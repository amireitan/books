import React, { useState } from 'react';
import { Form } from "react-bootstrap";
import styled from "styled-components";

const StyledSearch = styled.div`
    background: #dedede;
    border-radius: 10px;
    color: #fff;
`;

const StyledForm = StyledSearch.withComponent(Form);

const Search = ({
    placeholder='Search...',
    handleChange,
    style
}) => {
    const [searchText, setSearchText] = useState('');

    const onChange = (event) => {
        setSearchText(event.target.value);
        handleChange(event.target.value);
    }

    return(
        <StyledForm style={style}>
            <Form.Group controlId="formBasicEmail">
                <Form.Control
                    type="text"
                    placeholder={placeholder}
                    value={searchText}
                    onChange={onChange}
                />
            </Form.Group>
        </StyledForm>
    );
};

export default React.memo(Search)