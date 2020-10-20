import React from 'react'
import './LoadingSpinner.css';

import spinner from './images/spinner.gif';

const LoadingSpinner = () => {
    return (
        <div className="loader">
            <img src={spinner} alt="Loading..."  />            
        </div>
    )
}

export default LoadingSpinner
