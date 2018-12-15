import {
    receive_field_usage,
    receiveUser,
    receiveLoginStatus,
    logoutUser
} from './data'
import {
    AUTH_ACTION
} from './types'

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
            if (!json.errors) {
                dispatch(receiveUser(json))
            }
        })
    }
}

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
