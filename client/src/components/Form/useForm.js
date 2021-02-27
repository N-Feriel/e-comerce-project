
import { useState, useEffect } from 'react';



function useForm(callback, validate) {

    const initialState = {email: "", name: '', address: '',city: '', state: '', zipCode:'', country:'', card: '' };


    const [formData, setFormData] = useState(initialState);

    const [errors, setErrors] = useState({})

    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleChange = (ev) => {

        const { name, value } = ev.target;
        setFormData({
            ...formData,
            [name]: value
    });
        // console.log('error', errorMessage)

    };

    const handleSubmit = (ev) =>{
        ev.preventDefault();
        if(!validate(formData)){
            setErrors({})
        }
        setErrors(validate(formData))

        // setErrors(errors|| {})

        setIsSubmitting(true)

    }

    useEffect(
        () =>{
            if (Object.keys(errors).length === 0 && isSubmitting) {
                callback();
                }
            },
            [errors]
    )


    return { handleChange, handleSubmit, formData, errors };
}

export default useForm
