import React from 'react'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { requestTopPosts } from '../actions/site';
import Post from '../containers/content/Post';

class TopRated extends React.Component {
    componentWillMount() {
        this.props.request()
    }
    
    render() {
        return (
            <div className="top_rated posts">
                {this.props.posts.map(post => {
                    return <Post {...post} />
                })}
            </div>
        )
    }
}

const mapToState = state => ({
    posts: state.topPosts
})

const mapToDispatch = dispatch => ({
    request: () => dispatch(requestTopPosts())
})

const container = props => (
    <TopRated {...props} />
)

export default withRouter(connect(mapToState, mapToDispatch)(container))