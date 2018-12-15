import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Authenication from '../pages/Auth';
import { loadSessionState } from '../actions/data';
import Main from '../pages/Main';
import { updateToken, verifyToken } from '../actions/tokens';

class Director extends React.Component {
    requested = false

    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
        }
    }

    componentWillMount() {
        this.props.loadSession() 
    }

    render() {
        if (this.props.session.loaded && !this.state.loaded && !this.requested) {
            this.requested = true
            if (this.props.session.user.id === 0) {
                this.setState({loaded: true})
            } else {
                this.props.update(this.props.session.state.refresh_token, () => {
                    this.setState({loaded: true})
                })
            }
        }
        if (this.state.loaded) {
            let page = <Authenication />
            if (this.props.session.state.state === "LOGGED_IN") {
                page = <Main />
            }
            return (
                <div className="page">
                    {page}
                </div>
            )
        } else {
            return <LoadingPlaceholder />
        }
    }
}

const LoadingPlaceholder = props => (
    <div className='loading'>
        <img src={require('../resources/img/loader.gif')} alt='Loading...' />
    </div>
)

const mapToState = state => ({
    session: state.session
})

const mapToDispatch = dispatch => ({
    loadSession: () => dispatch(loadSessionState()),
    update: (refresh, callback) => dispatch(updateToken(refresh, callback)),
    verify: (token, callback) => dispatch(verifyToken(token, callback))
})

const container = props => (
    <Director {...props} />
)

export default withRouter(connect(mapToState, mapToDispatch)(container))