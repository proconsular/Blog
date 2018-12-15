import React from 'react'
import Post from '../../containers/content/Post'

export default class Posts extends React.Component {
    componentWillMount() {
        this.props.request()
    }

    render() {
        return (
            <div className="posts">
                {this.props.posts.map(post => {
                    return <Post {...post} />
                })}
            </div>
        )
    }
}