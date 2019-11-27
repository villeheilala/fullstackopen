import {
  SET_NOTIFICATION,
  CLEAR_NOTIFICATION,
  SET_BLOGS,
  SET_USER,
} from '../actions';

const initialState = {
  user: null,
  blogs: [],
  notification: {
    type: null,
    message: null,
  },
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
      case SET_NOTIFICATION:
          return {
              ...state,
              notification: {
                  type: action.payload.type,
                  message: action.payload.message,
              },
          }
      case CLEAR_NOTIFICATION:
          return {
              ...state,
              notification: {
                  type: null,
                  message: null,
              },
          }
      case SET_BLOGS:
        return {
          ...state,
          blogs: action.payload.blogs,
        }
        case SET_USER:
          return {
            ...state,
            user: action.payload.user,
          }
      default:
          return state
  }
}

export default rootReducer
