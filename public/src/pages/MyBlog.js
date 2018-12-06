import React from 'react'
import PostForm from '../containers/PostForm';
import Blog from '../containers/Blog'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class MyBlog extends React.Component {
    render() {
        return (
            <div className="">
                <PostForm />
                <Blog id={this.props.user.id} />
            </div>
        )
    }
}

const mapToState = state => ({
    user: state.session.user
})

const mapToDispatch = dispatch => ({

})

const container = props => (
    <MyBlog {...props} />
)

export default withRouter(connect(mapToState, mapToDispatch)(container))