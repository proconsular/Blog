import React from 'react'
import Posts from '../containers/parts/Posts';

export default class Front extends React.Component {
    render() {
        return (
            <div className="front">
                <Posts />
            </div>
        )
    }
}