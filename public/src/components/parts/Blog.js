import React from 'react'
import Post from '../../containers/content/Post';

export default class Blog extends React.Component {
    componentWillMount() {
        this.props.request(this.props.id)
    }

    render() {
        return (
            <div className="blog">
                {this.props.posts.map(post => {
                    return <Post key={post.id} {...post} />
                })}
            </div>
        )
    }
}