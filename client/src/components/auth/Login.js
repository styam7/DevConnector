import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { signIn } from '../../actions/auth'
import { Navigate } from 'react-router-dom'

const Login = () => {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)  
    const dispatch = useDispatch()
    
    const [formData, setformData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData

    const handleChange = e => {
        setformData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) =>{
        e.preventDefault();
        dispatch(signIn(email, password))
    }

    //redirect
    if(isAuthenticated){
        return <Navigate to='/dashboard' />
    }

    return (
        <Fragment>
                <h1 className="large text-primary">Sign In</h1>
                <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
                <form className="form" onSubmit={e => onSubmit(e)}>
                    
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={email}
                            onChange={e => handleChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            minLength="6"
                            value={password}
                            onChange={e => handleChange(e)}
                        />
                    </div>
                    
                    <input type="submit" className="btn btn-primary" value="Login" />
                </form>
                <p className="my-1">
                    Don't have an account? <Link to='/register'>Sign Up</Link>
                </p>
        </Fragment>
    )
}


export default Login