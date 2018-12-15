import React from 'react'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import PostEditForm from '../../components/forms/PostEditForm';
import { updatePost } from '../../actions/content/posts';
import { changePostMode } from '../../actions/data';

const mapToState = state => ({
    
})

const mapToDispatch = dispatch => ({
    update: (post, callback) => dispatch(updatePost(post, callback)),
    setMode: mode => dispatch(changePostMode(mode))
})

const container = props => (
    <PostEditForm {...props} />
)

export default withRouter(connect(mapToState, mapToDispatch)(container))