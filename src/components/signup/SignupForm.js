import React from 'react';
import timezone from '../../data/timezones';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            timezone: ''
        };

    }
    render() {
        return (
            <form>
                <h1>Join our community!</h1>
            </form>
        );
    }
}

export default SignupForm;
