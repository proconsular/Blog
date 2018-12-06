import React from 'react'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import NavBar from '../components/NavBar';
import { requestLogout } from '../actions';

const mapToState = state => ({
    user: state.session.user
})

const mapToDispatch = dispatch => ({
    logout: email => dispatch(requestLogout(email))
})

const container = props => (
    <NavBar {...props} />
)

export default withRouter(connect(mapToState, mapToDispatch)(container))