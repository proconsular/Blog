import React from 'react'

export default class PostEditForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.post.title,
            content: this.props.post.content,
            status: {
                received: false,
                success: false
            }
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    onSubmit(event) {
        event.preventDefault()
        this.props.update({
            ...this.props.post,
            title: this.state.title,
            content: this.state.content
        }, success => {
            this.setState({
                status: {
                    received: true,
                    success: success
                }
            })
            setTimeout(() => {
                this.setState({
                    status: {
                        received: false,
                        success: false
                    }
                })
                if (success) {
                    this.props.setMode(0)
                }
            }, 2000)
        })
    }
    
    render() {
        let messages = []

        if (this.state.status.received) {
            if (this.state.status.success) {
                messages.push("Updated successfully.")
            } else {
                messages.push("Update failed.")
            }
        }

        return (
            <div className="form post post_edit_form">
                <div className="options">
                    <ul>
                        <li><button onClick={() => this.props.setMode(0)}><i className="material-icons">close</i></button></li>
                    </ul>
                </div>
                <div className="validations">
                    {messages.map(message => {
                        return <div className="validation">{message}</div>
                    })}
                </div>
                <form onChange={this.onChange} onSubmit={this.onSubmit}>
                    <input className="field_input" name="title" type="text" value={this.state.title} />
                    <textarea name="content" value={this.state.content} ></textarea>
                    <input type="submit" value="Update" />
                    
                </form>
                
            </div>
        )
    }
}