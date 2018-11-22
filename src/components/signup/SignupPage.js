import React from 'react';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userSignupRequest } from '../../actions/singupActions';

class SignupPage extends React.Component {
  render() {
    const {userSignupRequest} = this.props;
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <SignupForm userSignupRequest={userSignupRequest} />
        </div>
      </div>
    );
  }
}

SignupPage.propTypes= {
  userSignupRequest: PropTypes.func.isRequired //React.PropTypes.func.isRequired
}

export default connect(null, {userSignupRequest})(SignupPage);
