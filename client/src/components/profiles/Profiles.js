import React, { useEffect } from 'react'
import Spinner from '../layouts/Spinner'
import { getProfiles } from '../../actions/profile'
import { useDispatch, useSelector } from 'react-redux'
import ProfileItem from './ProfileItem'
const Profiles = () => {
    const { loading } = useSelector(state => state.profile)
    const { profiles } = useSelector(state => state.profile)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProfiles())
    }, [dispatch])

    return (
        <>
            {loading ?
                <Spinner />
                :
                <>
                    <h1 className='large text-primary'>Developers</h1>
                    <p className='lead'>
                        <i className='fab fa-connectdevelop'></i> Browse and Connect with Developers
                    </p>
                    <div className='profiles'>
                        {profiles ?
                            (profiles.map(profile => (
                                <ProfileItem key={profile._id} profile={profile}/>)
                            ))
                            :
                            <h4>No User Found</h4>}
                    </div>
                </>
            }
        </>
    )
}

export default Profiles