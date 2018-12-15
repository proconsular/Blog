import {
    receiveToken
} from './data'

export const updateToken = (refresh_token, callback) => {
    return dispatch => {
        fetch('/auth/token', {
            method: 'POST',
            body: JSON.stringify({
                refresh_token: refresh_token
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            dispatch(receiveToken(data.token))
            callback()
        })
    }
}

export const verifyToken = async (token, callback) => {
    return async dispatch => {
        try {
            let response = await fetch('/auth/token/verify', {
                method: 'POST',
                body: JSON.stringify({
                    token: token
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            let json = await response.json()
            callback(json)
        } catch (err) {

        }
    }
}