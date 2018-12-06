import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Authenication from '../pages/Auth';
import Front from '../pages/Front';
import { loadSessionState } from '../actions';
import Main from '../pages/Main';
import { updateToken } from '../actions/util';

class Director extends React.Component {
    componentWillMount() {
        this.props.loadSession()
        this.props.update(this.props.session.state.refresh_token)
    }

    render() {
        let page = <Authenication />
        if (this.props.session.state.state === "LOGGED_IN") {
            page = <Main />
        }
        return (
            <div className="page">
                {page}
            </div>
        )
    }
}

const mapToState = state => ({
    session: state.session
})

const mapToDispatch = dispatch => ({
    loadSession: () => dispatch(loadSessionState()),
    update: refresh => dispatch(updateToken(refresh))
})

const container = props => (
    <Director {...props} />
)

export default withRouter(connect(mapToState, mapToDispatch)(container))