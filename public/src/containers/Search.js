import React from 'react'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Search from '../components/Search';
import { requestSearch } from '../actions/util';

const mapToState = state => ({
    results: state.search
})

const mapToDispatch = dispatch => ({
    request: phrase => dispatch(requestSearch(phrase))
})

const container = props => (
    <Search {...props} />
)

export default withRouter(connect(mapToState, mapToDispatch)(container))