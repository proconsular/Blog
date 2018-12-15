import { AUTH_ACTION } from './types'

const secure = action => ({
    type: AUTH_ACTION,
    action: action
})

export const secured_request = (action, route, method='GET') => () => secure(token => {
    return dispatch => {
        fetch(route, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        })
        .then(response => response.json())
        .then(data => {
            action(dispatch, data)
        })
    }
})

export const secured_submit = (action, body, route, method='POST') => () => secure(token => {
    return dispatch => {
        fetch(route, {
            method: method,
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        })
        .then(response => response.json())
        .then(data => {
            action(dispatch, data)
        })
    }
})

export const submitPasswordChange = (data, callback) => {
    return secured_submit((dispatch, data) => {
        callback(data.message === "ok")
    }, data, '/api/password')()
}