import React from 'react'

const Content = ({children}) => {
    return (
        <div className="content container">
            { children ? children : null }
        </div>
    )
}

export default Content;
