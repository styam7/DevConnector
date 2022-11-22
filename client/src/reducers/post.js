import { ADD_POST, DELETE_POST, GET_POSTS, GET_POST, POST_ERROR, UPDATE_LIKES, ADD_COMMENT, REMOVE_COMMENT } from "../actions/types"

const initialState = {
    post: null,
    posts: [],
    loading: true,
    error: {}
}

export default function (state = initialState, actions) {
    const { type, payload } = actions

    switch (type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false
            }
        case GET_POST:
            return {
                ...state,
                post: payload,
                loading: false
            }
        case POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case UPDATE_LIKES:
            return {
                ...state,
                posts: state.posts.map(post => post._id === payload.postId ?
                    { ...post, likes: payload.likes } : post),
                loading: false
            }
        case ADD_POST:
            return {
                ...state,
                posts: [payload, ...state.posts],
                loading: false
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload),
                loading: false
            }
        case ADD_COMMENT:
            return {
                ...state,
                post: { ...state.post, comments: payload }
            }
        case REMOVE_COMMENT:
            return {
                ...state,
                post: {
                    ...state,
                    comments: state.post.comments.filter(commment => commment._id !== payload)
                }
            }
        default:
            return state
    }
}