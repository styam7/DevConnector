import React from 'react'
import Moment from 'react-moment'

const ProfileExperience = ({ profile }) => {
    const { experience } = profile
    return (
        <div className="profile-exp bg-white p-2">

            {experience.length > 0 ?
                <>
                    <h2 className="text-primary">Experience</h2>
                    {experience.map(exp => (
                        <div key={exp._id}>
                            <h3 className="text-dark">{exp.company}-{exp.location}</h3>
                            <p><Moment format='YYYY/MM/DD'>{exp.from}</Moment> -
                                {exp.current ?
                                    "current" :
                                    <Moment format='YYYY/MM/DD'>{exp.from}</Moment>
                                }</p>
                            <p><strong>Position: </strong>{exp.title}</p>
                            <p>
                                <strong>Description: </strong>{exp.description}
                            </p>
                        </div>
                    ))}
                </>
                :
                <h4>No Experience Added</h4>
            }
        </div>
    )
}

export default ProfileExperience