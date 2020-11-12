import React, { useEffect, useState } from 'react';
import { Form, Button } from "react-bootstrap";
import styled from "styled-components";
import get from "lodash/get";

const StyledFormContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: #545b62;  
    border-radius: 10px;
    color: #ffffff;
    min-height: 290px;
`

const StyledForm = styled(Form)`
    background: #dedede;
    border-radius: 10px;
    padding: 20px;
    color: #292929;
`

const StyledButton = styled(Button)`
    background: #545b62;
    color: #ffffff
    border: 1px solid #dedede
    &:hover {
        background: #dedede; 
        color: #292929;
    }
    &:active {
        background: #dedede;
        color: #292929; 
    }
`

const BookEditForm = ({
    data,
    onSubmit,
    error=null,
    noContent=null
}) => {
    const [formState, setFormState] = useState(null);

    const onChange = ({ fieldName, event }) => {
        setFormState({
            ...formState,
            [fieldName]: {fieldName, value: event.target.value }
        });
    }

    const basicValidation = (formState) => {
        return Object.keys(formState).reduce((prev, key) => {
            const field = formState[key];

            if (!field.value) return false;
            return prev;
        }, true);
    }

    const onButtonClick = () => {
        const isValidate = basicValidation(formState);

        if (isValidate) {
            onSubmit(formState);
        }
    }
    
    useEffect(() => {
        if (data) {
            const mappedData = Object.keys(data).reduce((prev, fieldName) => (
                { ...prev, [fieldName]: {fieldName, value: data[fieldName] }}
            ), {});

            setFormState(mappedData);
        }
    }, [data])

    if (!data && noContent) {
        return  <StyledFormContainer style={{textAlign: "center", padding: "20px"}}>
                    {noContent}
                </StyledFormContainer>
    };

    return (
        <StyledFormContainer>
            <StyledForm>
                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Ip</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Ip"  
                        onChange={(event) => onChange({fieldName: "ip", event: event})} 
                        value={get(formState,"ip.value") || ''}
                    />
                </Form.Group>
                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Domain</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Domain"  
                        onChange={(event) => onChange({fieldName: "domain", event: event})} 
                        value={get(formState,"domain.value") || ''}
                    />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Label>Timestamp</Form.Label>
                    <Form.Control 
                        type="text"  
                        placeholder="Enter Timestamp" 
                        onChange={(event) => onChange({fieldName: "timestamp", event})}
                        value={get(formState,"timestamp.value") || ''}
                    />
                </Form.Group>
                <StyledButton variant="primary" onClick={onButtonClick}>
                    Edit
                </StyledButton>
            </StyledForm>
        </StyledFormContainer>
    )
}

export default BookEditForm;