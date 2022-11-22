import React, { Fragment, useState } from 'react'
import { Link , Navigate } from 'react-router-dom'
import { setAlert } from '../../actions/alert'
import { signUp } from '../../actions/auth'
import { useDispatch , useSelector } from 'react-redux'

const Register = () => {


    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)  
    const dispatch = useDispatch()

    const [formData, setformData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = formData

    const handleChange = e => {
        setformData({ ...formData, [e.target.name]: e.target.value })
    }

    const register = async (e) =>{
        e.preventDefault();
        if(password !== password2){
            dispatch(setAlert("password does not match", 'danger'))
        }
        else{
            dispatch(signUp({ name, email, password}))
        }
    }

    //redirect
    if(isAuthenticated){
        return <Navigate to='/dashboard' />
    }

    return (
        <Fragment>         
                <h1 className="large text-primary">Sign Up</h1>
                <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
                <form className="form" onSubmit={e => register(e)}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={name}
                            onChange={e => handleChange(e)}
                            />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={email}
                            onChange={e => handleChange(e)}
                        />
                        <small className="form-text"
                        >This site uses Gravatar so if you want a profile image, use a
                            Gravatar email</small
                        >
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={e => handleChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="password2"
                            value={password2}
                            onChange={e => handleChange(e)}
                        />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Register" />
                </form>
                <p className="my-1">
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
        </Fragment>
    )
}

export default Register