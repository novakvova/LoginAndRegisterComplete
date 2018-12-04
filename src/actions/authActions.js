import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwt from 'jsonwebtoken';
import {SET_CURRENT_USER} from './types';

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user: user
    };
}

export function logout() {
    return dispatch => {
        localStorage.removeItem('jwtToken');
        console.log("logout");
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
    }
}


export function login(data) {
    return dispatch => {
        return axios.post('http://localhost:59554/api/auth', data).then(res=> {
            const token = res.data.token;
            localStorage.setItem('jwtToken', token);
            setAuthorizationToken(token);
            //console.log(token);
            //console.log(jwt.decode(token));
            dispatch(setCurrentUser({id: 1, username:'semen'}));//(jwt.decode(token)));
        });
    }
}