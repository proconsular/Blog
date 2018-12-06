
export const RECEIVE_USER = 'RECEIVE_USER'
export const receiveUser = data => ({
    type: RECEIVE_USER,
    user: data
})

export const registerUser = user => {
    return dispatch => {
        fetch('/auth/register', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(json => {
            dispatch(receiveUser(json))
        })
    }
}

export const AUTH_ACTION = 'AUTH_ACTION'

export const getUserByStatus = id => ({
    type: AUTH_ACTION,
    action: token => {
        return dispatch => {
            fetch(`/api/users/status/${id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token
                }
            })
            .then(response => response.json())
            .then(json => {
                dispatch(receiveUser(json))
            })
        }
    }
})

export const RECEIVE_FIELD_USAGE = 'RECEIVE_FIELD_USAGE'
export const receive_field_usage = (field, usage) => ({
    type: RECEIVE_FIELD_USAGE,
    field: field,
    usage: usage
})

export const requestFieldUsage = (field, value) => {
    return dispatch => {
        fetch('/auth/valid', {
            method: 'POST',
            body: JSON.stringify({
                field: field,
                value: value
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            dispatch(receive_field_usage(field, data.message))
        })
    }
}

export const RECEIVE_LOGIN_STATUS = 'RECEIVE_LOGIN_STATUS'
export const receiveLoginStatus = data => ({
    type: RECEIVE_LOGIN_STATUS,
    data: data
})

export const requestLogin = (email, password) => {
    return dispatch => {
        fetch('/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(json => {
            dispatch(receiveLoginStatus(json))
            if (json.state === "LOGGED_IN") {
                dispatch(getUserByStatus(json.id))
            }
        })
    }
}

export const LOAD_SESSION_STATE = 'LOAD_SESSION_STATE'
export const loadSessionState = () => ({
    type: LOAD_SESSION_STATE
})

export const LOGOUT_USER = 'LOGOUT_USER'
export const logoutUser = () => ({
    type: LOGOUT_USER
})

export const requestLogout = email => {
    return dispatch => {
        fetch('/auth/logout', {
            method: 'POST',
            body: JSON.stringify({
                email: email
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(json => {
            dispatch(logoutUser())
        })
    }
}

export const RECEIVE_BLOG = 'RECEIVE_BLOG'
export const receiveBlog = (id, posts) => ({
    type: RECEIVE_BLOG,
    id: id,
    posts: posts
})

export const requestBlog = userId => ({
    type: AUTH_ACTION,
    action: token => {
        return dispatch => {
            fetch(`/api/blogs/${userId}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token
                }
            })
            .then(response => response.json())
            .then(json => {
                dispatch(receiveBlog(userId, json))
            })
        }
    }
})

export const POST_SUBMITTED = 'POST_SUBMITTED'
export const signalPostSubmitted = signal => ({
    type: POST_SUBMITTED,
    signal: signal
})

export const submitPost = post => ({
    type: AUTH_ACTION,
    action: token => {
        return dispatch => {
            fetch('/api/posts', {
                method: 'POST',
                body: JSON.stringify(post),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token
                }
            })
            .then(response => response.json())
            .then(json => {
                dispatch(signalPostSubmitted(json.message === "ok" ? 2 : 1))
            })
        }
    }
})
