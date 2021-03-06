import axios from 'axios'
import { setUser, dropUser } from '.'

const done = action => action+"_FULFILLED";
const fail = action => action+"_REJECTED";
const load = action => action+"_PENDING";

const URL = "http://192.168.137.131:8080";

/* Action types */
export const FETCH_USER = "dotmocracy/AuthAPI/FETCH_USER";
export const LOGIN_USER = "dotmocracy/AuthAPI/LOGIN_USER";
export const REGISTER_USER = "dotmocracy/AuthAPI/REGISTER_USER";
export const LOGOUT_USER = "dotmocracy/AuthAPI/LOGOUT_USER"
export const CHANGE_SETTINGS = "dotmocracy/AuthAPI/CHANGE_SETTINGS";

/* Reducer */
const initial_state = {
    fetch_user: {load: null, fail: null, done: null},
    login_user: {load: null, fail: null, done: null},
    register_user: {load: null, fail: null, done: null},
    logout_user: {load: null, fail: null, done: null},  
    change_settings: {load: null, fail: null, done: null},
};

export default function reducer(state = initial_state, action = {}) {
    switch (action.type) {
      case done(FETCH_USER): return {...state, fetch_user: {done: true}};
      case fail(FETCH_USER): return {...state, fetch_user: {fail: true}};
      case load(FETCH_USER): return {...state, fetch_user: {load: true}};

      case done(LOGIN_USER): return {...state, login_user: {done: true}};
      case fail(LOGIN_USER): return {...state, login_user: {fail: true}};
      case load(LOGIN_USER): return {...state, login_user: {load: true}};

      case done(REGISTER_USER): return {...state, register_user: {done: true}};
      case fail(REGISTER_USER): return {...state, register_user: {fail: true}};
      case load(REGISTER_USER): return {...state, register_user: {load: true}};

      case done(LOGOUT_USER): return {...state, logout_user: {done: true}};
      case fail(LOGOUT_USER): return {...state, logout_user: {fail: true}};
      case load(LOGOUT_USER): return {...state, logout_user: {load: true}};

      case done(CHANGE_SETTINGS): return {...state, change_settings: {done: true}};
      case fail(CHANGE_SETTINGS): return {...state, change_settings: {fail: true}};
      case load(CHANGE_SETTINGS): return {...state, change_settings: {load: true}};
      default: return state;
    }
  }


/* Action creators */
export const fetchUser = (user) => dispatch => {
    dispatch({
        type: FETCH_USER,
        payload: axios.get(`${URL}/api/user`)
    }).then(
        response => {
            dispatch(setUser(response.value.data));
        },
        error => {
            dispatch(dropUser());
            // TODO: dispatch showErrorMessage(response.statusText) or smth
        }
    )
}

export const loginUser = (username, password) => dispatch => {
    dispatch({
        type: LOGIN_USER,
        payload: axios.post(`${URL}/api/user/login`, { username, password })
    }).then(
        response => {            
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARGHHHH");
            console.log(response);
            dispatch(setUser({ data: response.value.data.username, headers: response.value.headers }));
        },
        error => {
            console.log("Wrong credentials", error);
            // TODO: dispatch showErrorMessage(response.statusText) or smth
        }
    )
}

export const registerUser = (username, password) => dispatch => {
    dispatch({
        type: REGISTER_USER,
        payload: axios.post(`${URL}/api/user/register`, { username, password })
    })
    .then(
        response => {
            dispatch(setUser(response.value.data));
        },
        error => {
            console.log("Wrong credentials", error);
            // TODO: dispatch showErrorMessage(response.statusText) or smth
        }
    )
}

export const logoutUser = () => dispatch => {
    dispatch({
        type: LOGOUT_USER,
        payload: axios.post(`${URL}/api/user/logout`, {})
    })
    .then(
        response => {
            dispatch(dropUser());            
        }, 
        error => {
            console.log("Wrong credentials", error);
            // TODO: dispatch showErrorMessage(response.statusText) or smth
        }
    )
}

export const changeSettings = (username, password) => dispatch => {
    dispatch({
        type: CHANGE_SETTINGS,
        payload: axios.post(`${URL}/api/user/change`, { username, password })
    })
    .then(
        response => {
            console.log("Successfully changed");
        }, 
        error => {
            console.log("Error occurred");;
            // TODO: dispatch showErrorMessage(response.statusText) or smth
        }
    )
}
