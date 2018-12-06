import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import { 
    RECEIVE_USER, 
    RECEIVE_FIELD_USAGE, 
    RECEIVE_LOGIN_STATUS, 
    LOAD_SESSION_STATE,
    LOGOUT_USER,
    RECEIVE_BLOG,
    POST_SUBMITTED
} from "../actions";
import { 
    RECEIVE_READING_POSTS, 
    RECEIVE_POST, 
    RECEIVE_COMMENTS_FOR_POST,
    SIGNAL_COMMENT_SUBMITTED,
    RECEIVE_POST_RATING,
    RECEIVE_TOP_POSTS,
    RECEIVE_SEARCH,
    CHANGE_POST_MODE,
    DELETE_POST,
    RECEIVE_TOKEN
} from "../actions/types";

export default function createRootReducer(history) {
    let router = connectRouter(history)
    let reducer = combineReducers({ 
        router,
        session,
        validation,
        blog,
        signals,
        reading,
        posts,
        comments,
        ratings,
        topPosts,
        search,
        view
    })
    return connectRouter(history)(reducer)
}

const INITIAL_SESSION_STATE = () => ({user: {id: 0}, state: {state: "Not Requested"}})

const session = (state = INITIAL_SESSION_STATE(), action) => {
    let next = Object.assign({}, state)
    switch (action.type) {
        case RECEIVE_USER:
            next.user = action.user
            localStorage.setItem("session.user", JSON.stringify(next.user))
            return next
        case RECEIVE_LOGIN_STATUS:
            next.state = action.data
            if (next.state.state === "LOGGED_IN") {
                localStorage.setItem("session.state", JSON.stringify(next.state))
            }
            return next
        case LOAD_SESSION_STATE:
            let savedUser = JSON.parse(localStorage.getItem("session.user"))
            let savedState = JSON.parse(localStorage.getItem("session.state"))
            if (savedState) {
                next.state = savedState
            }
            if (savedUser) {
                next.user = savedUser
            }
            return next
        case RECEIVE_TOKEN:
            next.state.token = action.token
            return next
        case LOGOUT_USER:
            localStorage.removeItem("session.user")
            localStorage.removeItem("session.state")
            return INITIAL_SESSION_STATE()
        default:
            return state
    }
}

const validation = (state = {username: "ok", email: "ok"}, action) => {
    switch (action.type) {
        case RECEIVE_FIELD_USAGE:
            let next = Object.assign({}, state)
            next[action.field] = action.usage
            return next
        default:
            return state
    }
}

const blog = (state = {id: 0, posts: []}, action) => {
    switch (action.type) {
        case RECEIVE_BLOG:
            let next = Object.assign({}, state)
            next.id = action.id
            next.posts = action.posts
            return next
        default:
            return state
    }
}

const signals = (state = {posted: 0, comment: 0}, action) => {
    let next = Object.assign({}, state)
    switch (action.type) {
        case POST_SUBMITTED:
            next.posted = action.signal
            return next
        case SIGNAL_COMMENT_SUBMITTED:
            next.comment = action.signal
            return next
        default:
            return state
    }
}

const reading = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_READING_POSTS:
            return Object.assign([], action.posts)
        default:
            return state
    }
}

const posts = (state = {}, action) => {
    let next = Object.assign({}, state)
    switch (action.type) {
        case RECEIVE_POST:
            next[action.post.id] = action.post
            return next
        case DELETE_POST:
            next[action.id] = undefined
            return next
        default:
            return state
    }
}

const comments = (state = {}, action) => {
    let next = Object.assign({}, state)
    switch (action.type) {
        case RECEIVE_COMMENTS_FOR_POST:
            next[action.id] = action.comments
            return next
        case DELETE_POST:
            next[action.id] = undefined
        default:
            return state
    }
}

const ratings = (state = {}, action) => {
    let next = Object.assign({}, state)
    switch (action.type) {
        case RECEIVE_POST_RATING:
            if (action.rating.error) {
                action.rating = {value: 0}
            }
            next[action.rating.postId] = action.rating 
            return next
        case DELETE_POST:
            next[action.id] = undefined
            return next
        default:
            return state
    }
}

const topPosts = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_TOP_POSTS:
            return Object.assign([], action.posts)
        default:
            return state
    }
}

const search = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_SEARCH:
            return Object.assign([], action.posts)
        default:
            return state
    }
}

const view = (state = {mode: 0}, action) => {
    switch (action.type) {
        case CHANGE_POST_MODE:
            let next = Object.assign({}, state)
            next.mode = action.mode
            return next
        default:
            return state
    }
}