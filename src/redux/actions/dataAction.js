import { SET_POSTS, LOADING_DATA, LIKE_POST, UNLIKE_POST } from "../types";
import axios from "axios";

export const getPosts = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/allPosts")
    .then((res) => {
      dispatch({ type: SET_POSTS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SET_POSTS, payload: [] });
    });
};

//like post
export const likePost = (postId) => (dispatch) => {
  axios
    .get(`/post/${postId}/like`)
    .then((res) => {
      dispatch({ type: LIKE_POST, payload: res.data });
    })
    .catch((err) => console.log(err));
};

//unlike post
export const unlikePost = (postId) => (dispatch) => {
  axios
    .get(`/post/${postId}/unlike`)
    .then((res) => {
      dispatch({ type: UNLIKE_POST, payload: res.data });
    })
    .catch((err) => console.log(err));
};
