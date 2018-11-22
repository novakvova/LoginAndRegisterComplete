import axios from 'axios';

export function userSignupRequest(userData) {
    return dispatch => {
        return axios.post('http://localhost:59554/api/users',userData);
    }
}