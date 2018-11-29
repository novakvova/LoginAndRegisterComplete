import isEmpty from 'lodash/isEmpty';

export default function validationInput(data) {
    let errors ={};
    console.log("---Validate--", data);
    if(!data.identifier) {
        errors.identifier = "This field is required";
    }
    
    if(!data.password) {
        errors.password = "This field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}