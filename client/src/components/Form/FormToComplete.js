import React from 'react';
import validate from './validateInfo';
import useForm from './useForm';
import FormField from './FormField';
import styled from 'styled-components';
import { themeVars } from "../../GlobalStyles";

import {MdLocalShipping} from 'react-icons/md';
import {FaRegCreditCard} from 'react-icons/fa';
import Button from '../../Button';


function FormToComplete({submitForm}) {

    const { handleChange, handleSubmit, formData, errors } = useForm(
        submitForm,
        validate
    );

    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <div className="container">
                    <div className="info">
                        <strong>
                            Custumer Info
                        </strong>
                        <em style={{marginLeft:'auto', marginRight: '10px'}}> 
                            * Required
                        </em>
                    </div>
                    <FormField 
                        name="email"
                        label="Email"
                        type="email"
                        handleChange={handleChange}
                        value={formData.email}
                    />
                    {errors.email && <p className='errorField'>{errors.email}</p>}

                </div>

                <div className="container">

                <div >
                    <div className='info'>
                        <strong >
                            Shipping Address 
                        </strong>
                            <MdLocalShipping  size='30px' style={{marginLeft:'auto', marginRight: '10px'}}/>
                        </div>
                    </div>
                    <FormField 
                        name="name"
                        label="Name"
                        type="text"
                        handleChange={handleChange}
                        value={formData.name}
                    />
                    {errors.name && <p className='errorField'>{errors.name}</p>}

                    <div>
                        <FormField 
                            name="address"
                            label="Address"
                            type="text"
                            handleChange={handleChange}
                            value={formData.address}
                        />

                    {errors.address && <p className='errorField'>{errors.address}</p>}
                    </div>

                    <div style={{display:'flex', marginRight:'40px'}}>
                    <div>
                        <FormField 
                            name="city"
                            label="City"
                            type="text"
                            handleChange={handleChange}
                            value={formData.city}
                        />

                    {errors.city && <p className='errorField'>{errors.city}</p>}
                    </div>
                    <div >
                        <FormField 
                            name="state"
                            label="State"
                            type="State"
                            handleChange={handleChange}
                            value={formData.state}
                        />

                    {errors.state && <p className='errorField'>{errors.state}</p>}
                    </div>
                    <div>
                        <FormField 
                            name="zipCode"
                            label="ZipCode"
                            type="text"
                            handleChange={handleChange}
                            value={formData.zipCode}
                        />

                    {errors.zipCode && <p className='errorField'>{errors.zipCode}</p>}
                    </div>

                    </div>

                    <div>
                        <FormField 
                            name="country"
                            label="Country"
                            type="text"
                            handleChange={handleChange}
                            value={formData.country}
                        />

                    {errors.country && <p className='errorField'>{errors.country}</p>}
                    </div>



                </div>

                <div className="container">
                    <div className='info'>
                        <strong >
                            Payment Info
                        </strong>
                            <FaRegCreditCard  size='30px' style={{marginLeft:'auto', marginRight: '10px'}}/>
                        </div>
                    <FormField 
                        name="card"
                        label="Card"
                        type="text"
                        handleChange={handleChange}
                        value={formData.card}
                    />

                {errors.card && <p className='errorField'>{errors.card}</p>}

                </div>

                <Button  className='submit' type='submit'>
                    Place Order
                </Button>

            </form>
            
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 50%;
    color: ${themeVars.darkBlue};


    & .errorField{
        padding-left: 20px;
        color: ${themeVars.middleRedColor};
    }

    & .container{
        display: flex;
        margin: 20px 30px;
        border: solid 1px ${themeVars.darkBlue};
        background: ${themeVars.green};
        padding-bottom: 20px;
        flex-direction: column;
        align-items: stretch;
    }

    & .info{
        width: 100%;
        padding: 10px;
        display: flex;
        align-items: center;
        background: ${themeVars.darkBlue};
        color: ${themeVars.lavender};

    }

    & .submit{
        margin: 30px 0 50px auto;
        width: fit-content;
        padding: 20px 30px;
        background: black;
    }




`

export default FormToComplete
