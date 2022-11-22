import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileById } from '../../actions/profile'
import { Link, useParams } from 'react-router-dom'
import Spinner from '../layouts/Spinner'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileGithub from './ProfileGithub'

const Profile = () => {

    const { profile, loading } = useSelector(state => state.profile)
    const auth = useSelector(state => state.auth)
    const { id } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProfileById(id))
    }, [dispatch, id])

    return (
        <>
            {profile === null || loading ?
                <Spinner />
                :
                <>
                    <Link to='/profiles' className='btn btn-light'>Back To Profiles</Link>
                    {auth.isAuthenticated && auth.loading === false &&
                        auth.user._id === profile.user._id && (
                            <Link to="/edit-profile" className='btn btn-dark'>Edit Profile</Link>
                        )
                    }
                    <div className="profile-grid my-1">
                        <ProfileTop profile={profile} />
                        <ProfileAbout profile={profile} />
                        <ProfileExperience profile={profile} />                    
                        <ProfileEducation profile={profile} />
                        {profile.githubusername && <ProfileGithub username={profile.githubusername}/>}
                    </div>
                </>
            }
        </>
    )
}

export default Profile