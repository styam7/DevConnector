import React from 'react'
import spinner from '../../img/spinner.gif'
const Spinner = () => {
    return (
        <>
            <img
                src={spinner}
                style={{ margin: 'auto', width: '250px', display: 'block' }}
                alt="Loading..."
            />
        </>
    )
}

export default Spinner