
export default function validate(values) {
    let errors = {};

    if (!values.name.trim()) {
        errors.name = '*Username required';
    }
    // else if (!/^[A-Za-z]+/.test(values.name.trim())) {
    //   errors.name = 'Enter a valid name';
    // }

    if (!values.email) {
        errors.email = '*Email required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = '* Email address is invalid';
    }
    
    if (!values.address.trim()) {
        errors.address = '*Address required';
    }

    if (!values.city.trim()) {
        errors.city = '*city required';
    }
    if (!values.state.trim()) {
        errors.state = '*State required';
    }
    if (!values.zipCode.trim()) {
        errors.zipCode = '*ZipCode required';
    }
    if (!values.country.trim()) {
        errors.country = '*Country required';
    }

    if (!values.card) {
        errors.card = '* Card is required';
    } else if (!/\d{16}/.test(values.card)) {
        errors.card = '*Card numbers are invalid';
    }

    
    return errors;
}