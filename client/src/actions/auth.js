import axios from "../services/service";
import { setAlert } from "./alert";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LODED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE
} from './types';
import  setAuthToken from '../utils/setAuthToken';


//load user
export const loadUser = () => async dispatch =>{
  if(localStorage.token){
      setAuthToken(localStorage.token)
  }
  try {
      const res = await axios.get('/api/auth')
      dispatch({
          type: USER_LODED,
          payload: res.data
      })
  } catch (error) {
      dispatch({
          type: AUTH_ERROR
      })
  }
}

//register user
export const signUp = ( {name, email, password} ) => async dispatch =>{
    const config = {
        headers: {
         'Content-Type' : 'application/json'
        }
    }


    const body = JSON.stringify({name, email, password})
    try {
        const res = await axios.post('api/users', body, config )

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
    } catch (error) {
        const errors = error.response.data.errors

        if(errors){
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')))
        }
        dispatch({
            type: REGISTER_FAIL,
        })
    }
}

//login user
export const signIn = ( email, password ) => async dispatch =>{
    const config = {
        headers: {
         'Content-Type' : 'application/json'
        }
    }


    const body = JSON.stringify({email, password})
    try {
        const res = await axios.post('api/auth/login', body, config )

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
    } catch (error) {
        const errors = error.response.data.errors

        if(errors){
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')))
        }
        dispatch({
            type: LOGIN_FAIL,
        })
    }
}

//logout //clear profile

export const logout = () => dispatch =>{
    dispatch({
        type: LOGOUT
    })
    dispatch({
        type: CLEAR_PROFILE
    })
}