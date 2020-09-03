import { SET_POSTS, LIKE_POST, UNLIKE_POST, LOADING_DATA } from "../types";

const initialState = {
  loading: false,
  posts: [],
  post: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_POSTS:
      return { ...state, posts: action.payload, loading: false };
    case LIKE_POST:
    case UNLIKE_POST:
      let index = state.posts.findIndex(
        (post) => post.postId === action.payload.postId
      );
      state.posts[index] = action.payload;
      return { ...state };
    case LOADING_DATA:
      return { ...state, loading: true };
    default:
      return state;
  }
}
