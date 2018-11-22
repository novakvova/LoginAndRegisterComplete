import isEmpty from 'lodash/isEmpty';

export default function validationInput(data) {
    let errors ={};
    console.log("---Validate--", data);
    if(!data.username) {
        errors.username = "This field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}