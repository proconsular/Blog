import React from 'react'
import NavBar from '../containers/parts/NavBar';

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