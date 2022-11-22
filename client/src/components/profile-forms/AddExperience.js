import React, { useState } from 'react'
import { addExperience } from '../../actions/profile'
import { Link ,useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const AddExperience = () => {

    const dispatch = useDispatch();
    const history = useNavigate();

    const [formData, setFormData] = useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    })

    const { 
        company,
        title,
        location,
        from,
        to,
        current,
        description
     } = formData
     
     const [toDateDisabled, toggleDisabled] = useState(false)

     const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
     }
     const onSubmit = (e) => {
        e.preventDefault();
        dispatch(addExperience(formData, history))
     }
    return (
        <>
            <h1 className="large text-primary">
                Add An Experience
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any developer/programming
                positions that you have had in the past
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="text" placeholder="* Job Title" name="title" value={title} onChange={e => handleChange(e)} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Company" name="company" value={company} onChange={e => handleChange(e)} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" value={location} onChange={e => handleChange(e)} />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" value={from} onChange={e => handleChange(e)} />
                </div>
                <div className="form-group">
                    <p><input type="checkbox" name="current" checked={current} value={current} 
                    onChange={e => {
                        setFormData({...formData, current: !current});
                        toggleDisabled(!toDateDisabled)
                    }} /> Current Job</p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date" name="to" value={to} 
                    onChange={e => handleChange(e)} 
                    disabled= {toDateDisabled ? 'disabled': ''}
                    />
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Job Description"
                        value={description} onChange={e => handleChange(e)}
                    ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </>
    )
}

export default AddExperience