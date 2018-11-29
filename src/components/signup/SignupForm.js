import React from 'react';
import timezone from '../../data/timezones';
import map from 'lodash/map';
import timezones from '../../data/timezones';
import classnames from 'classnames';
import validationInput from '../../validations/signup';
import TextFieldGroup from '../../common/TextFieldGroup';
import PropTypes from 'prop-types';
//import { browserHistory } from 'react-router';

//import axios from 'axios';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            timezone: '',
            errors: {},
            isLoading: false,
            invalid: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.checkUserExists=this.checkUserExists.bind(this);

    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value});
    }
    
    isValid() {
        const {errors, isValid}=validationInput(this.state);
        console.log("-isValid--", isValid);
        console.log("-errors--", errors);
        if(!isValid) {
            this.setState({errors});
        }
        return isValid;
    }

    checkUserExists(e) {
        const field = e.target.name;
        const val = e.target.value;
        if(val!=='') {
            var self = this;
            this.props.isUserExists(val).then(res => {
                console.log("--Result blur message---",res);
                let errors = self.state.errors;
                let invalid;
                if(res.data.user) {
                    errors[field] = 'The is user with such '+field;
                    invalid = true;
                } else {
                    errors[field]='';
                    invalid = false;
                }
                self.setState({errors, invalid, isLoading: false});
                
            })
        }
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({ errors: {}, isLoading: true });
        ///axios.post('api/register', this.state);
        console.log("--Send state--", this.state);
        //var self = this;
        if (this.isValid()) {
            this.props.userSignupRequest(this.state)
                .then(
                    () => {
                        this.props.addFlashMessage({
                            type: 'success',
                            text: 'You signed up successfully. Welcome'
                        });
                        //browserHistory.push('/');
                        this.context.router.push('/');
                    },
                    (error) => 
                    { 
                        var data=error.response.data; 
                        console.log(error.response.data);
                        this.setState({ errors: data.errors, isLoading: false }); 
                    }

                );
                // .then(function (response) {
                //     console.log("--Response---", response);
                //     //console.log(this)
                //     self.setState({ errors: response.data.errors })
                // })
                // .catch(function (error) {
                //     console.log("---Request error---", error);
                // });
        }
        
    }
    render() {
        const {errors} = this.state;
        const options = map(timezones, (val, key) =>
            <option key={val} value={val}>{key}</option>
        );
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Join our community!</h1>

                <TextFieldGroup
                    error={errors.username}
                    label="Username"
                    onChange={this.onChange}
                    checkUserExists={this.checkUserExists}
                    value={this.state.username}
                    field="username"
                />

                <TextFieldGroup
                    error={errors.email}
                    label="Email"
                    onChange={this.onChange}
                    value={this.state.email}
                    field="email"
                />
                
                <div className={classnames("form-group",{'has-error': errors.password})}>
                    <label className="control-label">Password</label>
                    <input
                        value={this.state.password}
                        onChange={this.onChange}
                        type="password"
                        name="password"
                        className="form-control"
                    />
                    {errors.password && <span className="help-block">{errors.password}</span>}
                </div>

                <div className={classnames("form-group",{'has-error': errors.passwordConfirmation})}>
                    <label className="control-label">Password Confirmation</label>
                    <input
                        value={this.state.passwordConfirmation}
                        onChange={this.onChange}
                        type="password"
                        name="passwordConfirmation"
                        className="form-control"
                    />
                    {errors.passwordConfirmation && <span className="help-block">{errors.passwordConfirmation}</span>}
                </div>

                <div className={classnames("form-group",{'has-error': errors.timezone})}>
                    <label className="control-label">Timezone</label>
                    <select
                        value={this.state.timezone}
                        onChange={this.onChange}
                        name="timezone"
                        className="form-control">
                        <option value="" disabled>Choose Yout Timezone</option>
                        {options}
                    </select>
                    {errors.timezone && <span className="help-block">{errors.timezone}</span>}
                </div>

                <div className="form-group">
                    <button disabled={this.state.isLoading || this.state.invalid} className="btn btn-primary btn-lg">
                        Sign up
                    </button>
                </div>
            </form>
        );
    }
}

SignupForm.propTypes = {
    userSignupRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    isUserExists: PropTypes.func.isRequired
 }
  
SignupForm.contextTypes = {
    router: PropTypes.object.isRequired
 }

export default SignupForm;
