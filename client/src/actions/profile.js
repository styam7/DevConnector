import axios from '../services/service'
import setAuthToken from '../utils/setAuthToken'
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, CLEAR_PROFILE, DELETE_ACCOUNT, GET_PROFILES, GET_REPOS } from './types'
import { setAlert } from './alert'

//GET current user profile
export const getCurrentProfile = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    try {
        const res = await axios.get('/api/profile/me')

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//GET profiles
export const getProfiles = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE})
    try {
        const res = await axios.get('/api/profile/allusers')
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//GET profile by Id
export const getProfileById = userId => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/user/${userId}`)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//GET Git Repos
export const getGitRepos = username => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/github/${username}`)
        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}


//ADD AND UPDATE PROFILE
export const createProfile = (formData, history, edit = false) => async dispatch => {

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('api/profile', formData, config)

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        dispatch(setAlert(edit ? "Profile Updated" : "Profile Created"))

        if (!edit) {
            history("/dashboard")
        }
    } catch (err) {
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//ADD EXPERIENCE

export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('api/profile/experience', formData, config)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert("Experience added"))

        history("/dashboard")
    } catch (err) {
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//ADD EDUCATION
export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('api/profile/education', formData, config)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert("Education added"))

        history("/dashboard")
    } catch (err) {
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//Delete Experience

export const deleteExperience = id => async dispatch => {

    try {

        const res = await axios.delete(`api/profile/experience/${id}`)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert("Experience Removed"))

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }

}


//Delete Education

export const deleteEducation = id => async dispatch => {

    try {

        const res = await axios.delete(`api/profile/education/${id}`)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert("Education Removed"))

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }

}


//Delete Education

export const deleteAccount = () => async dispatch => {
    if (window.confirm("Are you sure? this can't be undone.")) {
        try {

            await axios.delete('api/profile/deleteuser')

            dispatch({ type: CLEAR_PROFILE })
            dispatch({ type: DELETE_ACCOUNT })

            dispatch(setAlert("Account Removed"))

        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
}