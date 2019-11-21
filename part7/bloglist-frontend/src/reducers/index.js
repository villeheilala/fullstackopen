import {
  SET_NOTIFICATION,
  CLEAR_NOTIFICATION,
} from '../actions';

const initialState = {
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
      default:
          return state
  }
}

export default rootReducer
