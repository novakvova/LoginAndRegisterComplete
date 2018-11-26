import React from 'react';
import timezone from '../../data/timezones';
import map from 'lodash/map';
import timezones from '../../data/timezones';
import classnames from 'classnames';
import validationInput from '../../validations/signup';
import TextFieldGroup from '../../common/TextFieldGroup';
import { browserHistory } from 'react-router';

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
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

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

    onSubmit(e) {
        e.preventDefault();
        this.setState({ errors: {} });
        ///axios.post('api/register', this.state);
        console.log("--Send state--", this.state);
        //var self = this;
        if (this.isValid()) {
            this.props.userSignupRequest(this.state)
                .then(
                    () => {
                        browserHistory.push('/');
                        //this.context.router.push('/');
                    },
                    (error) => 
                    { 
                        var data=error.response.data; 
                        console.log(error.response.data);
                        this.setState({ errors: data.errors }); 
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
                    value={this.state.username}
                    field="username"
                />
                {/* <div className={classnames("form-group",{'has-error': errors.username})}>
                    <label className="control-label">Username</label>
                    <input
                        value={this.state.username}
                        onChange={this.onChange}
                        type="text"
                        name="username"
                        className="form-control"
                    />
                    {errors.username && <span className="help-block">{errors.username}</span>}
                </div> */}

                 <div className={classnames("form-group",{'has-error': errors.email})}>
                    <label className="control-label">Email</label>
                    <input
                        value={this.state.email}
                        onChange={this.onChange}
                        type="text"
                        name="email"
                        className="form-control"
                    />
                    {errors.email && <span className="help-block">{errors.email}</span>}
                </div>
                
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
                    <button className="btn btn-primary btn-lg">
                        Sign up
                    </button>
                </div>
            </form>
        );
    }
}

export default SignupForm;
