import React from 'react'
import UserInfo from '../containers/content/UserInfo';
import PasswordForm from '../containers/forms/PasswordForm';

export default class Profile extends React.Component {
    render() {
        return (
            <div className="posts">
                <UserInfo />
                <PasswordForm />
            </div>
        )
    }
}