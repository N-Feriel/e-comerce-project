import React from 'react';
import styled from "styled-components";

const FormField = ({ label, type, name, placeholder, required }) => {
    return (
        <FormFieldContainer>
        <Label htmlFor={name}>{label}</Label>
        <Input name={name} type={type} placeholder={placeholder} required />
        </FormFieldContainer>
    );
};

const FormFieldContainer = styled.div`
    display: flex;
    align-items: center;
`

const Label = styled.label`
    width: 20%;
    min-width: 70px;
    padding: 11px 0;

`
const Input = styled.input`
    font-size: 16px;
    width: 100%;
    color: black;
`

export default FormField;