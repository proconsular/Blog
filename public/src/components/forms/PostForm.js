import React from 'react'

export default class PostForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            content: ''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    onSubmit(event) {
        event.preventDefault()
        let post = {
            ...this.state,
            authorId: this.props.user.id
        }
        this.props.post(post)
        this.setState({
            title: '',
            content: ''
        })
        setTimeout(() => {
            this.props.reset()
        }, 5000)
    }

    render() {
        let signal = ""
        switch (this.props.signal) {
            case 1:
                signal = "Post failed to submit."
                break
            case 2:
                signal = "Post submitted successfully."
                break
            default:
                break
        }
        return (
            <div className="form post_form">
                <div>{signal}</div>
                <form onChange={this.onChange} onSubmit={this.onSubmit}>
                    <input className="post_title" type="text" name="title" placeholder="Title" value={this.state.title} />
                    <textarea className="post_content" name="content" value={this.state.content} ></textarea>
                    <input type="submit" value="Post" />
                </form>
            </div>
        )
    }
}