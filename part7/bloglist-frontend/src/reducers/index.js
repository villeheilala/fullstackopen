import {
  SET_NOTIFICATION,
  CLEAR_NOTIFICATION,
  SET_BLOGS,
  SET_USER,
  SET_USERS,
} from '../actions';

const initialState = {
  user: null,
  users: [],
  blogs: [],
  notification: {
    type: null,
    message: null,
  },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return {
        ...state,
        notification: {
          type: action.payload.type,
          message: action.payload.message,
        },
      };
    case CLEAR_NOTIFICATION:
      return {
        ...state,
        notification: {
          type: null,
          message: null,
        },
      };
    case SET_BLOGS:
      return {
        ...state,
        blogs: action.payload.blogs,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload.user,
      };
    case SET_USERS:
      return {
        ...state,
        users: action.payload.users,
      };
    default:
      return state;
  }
};

export default rootReducer;
