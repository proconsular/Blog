import { AUTH_ACTION } from "../actions/types";


export default store => next => action => {
    if (action.type && action.type === AUTH_ACTION) {
        let state = store.getState()
        if (state.session.state.token) {
            let result = action.action(state.session.state.token)
            return next(result)
        }
    }
    return next(action)
}