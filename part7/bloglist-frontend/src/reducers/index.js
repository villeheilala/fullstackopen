import {
  SET_NOTIFICATION,
  CLEAR_NOTIFICATION,
  SET_BLOGS,
} from '../actions';

const initialState = {
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
      default:
          return state
  }
}

export default rootReducer
