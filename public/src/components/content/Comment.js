import React from 'react'

export default props => (
    <div className="comment">
        <div className="content">
            {props.content}
        </div>
        <div className="author">
            {props.user.username}
        </div>
    </div>
)