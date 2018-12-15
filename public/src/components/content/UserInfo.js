import React from 'react'

export default class UserInfo extends React.Component {
    render() {
        return (
            <div>
                <div className="user_info bordered_panel">
                    <div>
                        Username: {this.props.user.username}
                    </div>
                    <div>
                        Email: {this.props.user.email}
                    </div>
                </div>
            </div>
        )
    }
}