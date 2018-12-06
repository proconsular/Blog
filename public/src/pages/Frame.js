import React from 'react'
import NavBar from '../containers/NavBar';

export default class Frame extends React.Component {
    render() {
        return (
            <div className="front">
                <NavBar />
                {this.props.children}
            </div>
        )
    }
}