import React from 'react'
import Moment from 'react-moment'

const ProfileEducation = ({ profile }) => {

  const { education } = profile
  return (
    <div className="profile-edu bg-white p-2">
      {education.length > 0 ?
        <>
          <h2 className="text-primary">Education</h2>
          {education.map(edu => (
            <div key={edu._id}>
              <h3>{edu.school}</h3>
              <p><Moment format="YYYY/MM/DD">{edu.from}</Moment> -
                {edu.current ? "Present"
                  :
                  <Moment format='YYYY/MM/DD'>{edu.to}</Moment>}
              </p>
              <p><strong>Degree: </strong>{edu.degree}</p>
              <p><strong>Field Of Study: </strong>{edu.fieldofstudy}</p>
              <p>
                <strong>Description: </strong>{edu.description}
              </p>
            </div>
          ))}
        </>
        :
        <h4>No Education Found</h4>
      }
    </div>
  )
}

export default ProfileEducation