import React, {useState} from 'react';
import FormField from './Form/FormField';
import SCHEMA from "./Form/schema";
import Joi from "joi-browser";
import FormToComplete from './Form/FormToComplete';
import FormSuccess from './Form/FormSuccess';
import { useHistory } from 'react-router-dom';


const initialState = {email: "", name: '', address: '' };

function Form () {

    const [isSubmitted, setIsSubmitted] = useState(false);

    const history = useHistory()

    function submitForm() {
        setIsSubmitted(true);
    }

    return (
        <div>

        {!isSubmitted ? (
            <FormToComplete submitForm= {submitForm} />
        ) : (
            history.push('/success')
        )
        }




        </div>
    )
}

export default Form;
