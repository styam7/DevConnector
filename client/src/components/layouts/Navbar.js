import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../actions/auth'

const Navbar = () => {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
    }

    const guestLinks = (
        <ul>
            <li><Link to="/">Developers</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/profiles">Developers</Link></li>
        </ul>
    )

    const authLinks = (
        <ul>
            <li><Link to="/profiles">Developers</Link></li>
            <li><Link to="/posts">Posts</Link></li>
            <li>
                <Link to="/dashboard">
                    <i className='fas fa-user' />{" "}
                    <span className='hide-sm'>Dashboard</span>
                </Link>
            </li>
            <li>
                <a href="#!" onClick={(e) => handleLogout()}>
                    <i className='fas fa-sign-out-alt' />{" "}
                    <span className='hide-sm'>Logout</span>
                </a>
            </li>
        </ul>
    )
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
            </h1>
            {!isAuthenticated ? guestLinks : authLinks}
        </nav>
    )
}

export default Navbar