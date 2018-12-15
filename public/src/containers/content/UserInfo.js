import React from 'react'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import UserInfo from '../../components/content/UserInfo';

const mapToState = state => ({
    user: state.session.user
})

const mapToDispatch = dispatch => ({

})

const container = props => (
    <UserInfo {...props} />
)

export default withRouter(connect(mapToState, mapToDispatch)(container))