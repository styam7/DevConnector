import React, { useEffect } from 'react'
import { getCurrentProfile } from '../../actions/profile'
import { useDispatch, useSelector } from 'react-redux'
import setAuthToken from '../../utils/setAuthToken'
import Spinner from '../layouts/Spinner'
import { Link } from 'react-router-dom'
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'
import { deleteAccount } from '../../actions/profile'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}
const Dashboard = () => {

  const { profile: profile, loading } = useSelector(state => state.profile)

  const user = useSelector(state => state.auth.user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCurrentProfile())
  }, [dispatch])

  const deleteUser = () =>{
    dispatch(deleteAccount())
  }

  return (
    <>
      {loading && profile === null ? <Spinner />
        :
        <div>
          <h1 className="large text-primary">
            Dashboard
          </h1>
          <p className="lead"><i className="fas fa-user"></i> Welcome {user && user.name}</p>

          {profile !== null ?
            <>
              <DashboardActions />
              <Experience experience={profile.experience}/>
              <Education education={profile.education} />

              <div className='my-2'>
                <button className='btn btn-danger' onClick={() => deleteUser()}>
                  <i className='fas fa-user-minus'></i>{" "}
                  Delete My Account
                </button>
              </div>
            </>
            :
            <>
              <p>You have not yet setup a profile, please add some info</p>
              <Link to="/create-profile" className='btn btn-primary my-1'>Add profile</Link>
            </>
          }
        </div>
      }
    </>
  )
}

export default Dashboard