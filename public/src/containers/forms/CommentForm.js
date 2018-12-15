import React from 'react'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import CommentForm from '../../components/forms/CommentForm';
import { submitComment, requestComments } from '../../actions/content/comments';
import { signalCommentSubmitted } from '../../actions/data';

const mapToState = state => ({
    user: state.session.user,
    signal: state.signals.comment
})

const mapToDispatch = dispatch => ({
    post: comment => dispatch(submitComment(comment)),
    request: id => dispatch(requestComments(id)),
    reset: () => dispatch(signalCommentSubmitted(0))
})

const container = props => (
    <CommentForm {...props} />
)

export default withRouter(connect(mapToState, mapToDispatch)(container))