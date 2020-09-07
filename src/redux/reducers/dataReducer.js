import {
  SET_POST,
  SET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  LOADING_DATA,
  DELETE_POST,
  NEW_POST,
} from "../types";

const initialState = {
  loading: false,
  posts: [],
  post: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_POSTS:
      return { ...state, posts: action.payload, loading: false };
    case SET_POST:
      return { ...state, post: action.payload };
    case LIKE_POST:
    case UNLIKE_POST:
      let index = state.posts.findIndex(
        (post) => post.postId === action.payload.postId
      );
      state.posts[index] = action.payload;
      if (state.post.postId === action.payload.postId) {
        state.post = action.payload;
      }
      return { ...state };
    case LOADING_DATA:
      return { ...state, loading: true };
    case DELETE_POST:
      let deleteIndex = state.posts.findIndex(
        (post) => post.postId === action.payload
      );
      state.posts.splice(deleteIndex, 1);
      return { ...state };
    case NEW_POST:
      return { ...state, posts: [action.payload, ...state.posts] };
    default:
      return state;
  }
}
