import axios from 'axios';

export function login(data) {
    return dispatch => {
        return axios.post('http://localhost:59554/api/auth', data);
    }
}