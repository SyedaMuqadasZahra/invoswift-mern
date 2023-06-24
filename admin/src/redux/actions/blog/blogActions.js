import Axios from "axios";
import {ADD_BLOG, ALL_BLOGS, BLOG_DETAIL, DELETE_BLOG, UPDATE_BLOG} from "../../constant/blog/blogConstants";

export const addBlogAction = (dataObj) => async (dispatch) => {
  dispatch({ type: ADD_BLOG.REQUEST });
  const headers = { Accept: "application/json" };
  try {
    const { data, status } = await Axios.post(
      `${process.env.REACT_APP_SERVER_URL}/admin/add-blog`,
      dataObj,
      { headers: headers }
    );
    dispatch({ type: ADD_BLOG.SUCCESS, payload: data, status });
  } catch (error) {
    dispatch({ type: ADD_BLOG.FAIL, payload: error });
  }
};

export const addBlogResetAction = () => async (dispatch) => {
  dispatch({ type: ADD_BLOG.RESET });
};

export const allBlogsAction = (dataObj) => async (dispatch) => {
  dispatch({ type: ALL_BLOGS.REQUEST });
  const headers = { Accept: "application/json" };
  try {
    const { data, status } = await Axios.post(
      `${process.env.REACT_APP_SERVER_URL}/admin/all-blogs`,
      dataObj,
      { headers: headers }
    );
    dispatch({ type: ALL_BLOGS.SUCCESS, payload: data, status });
  } catch (error) {
    dispatch({ type: ALL_BLOGS.FAIL, payload: error });
  }
};

export const deleteBlogAction = (dataObj) => async (dispatch) => {
  dispatch({ type: DELETE_BLOG.REQUEST });
  const headers = { Accept: "application/json" };
  try {
    const { data, status } = await Axios.post(
      `${process.env.REACT_APP_SERVER_URL}/admin/delete-blog`,
      dataObj,
      { headers: headers }
    );
    dispatch({ type: DELETE_BLOG.SUCCESS, payload: data, status });
  } catch (error) {
    dispatch({ type: DELETE_BLOG.FAIL, payload: error });
  }
};

export const deleteBlogResetAction = () => async (dispatch) => {
  dispatch({ type: DELETE_BLOG.RESET });
};

export const blogDetailAction = (dataObj) => async (dispatch) => {
  dispatch({ type: BLOG_DETAIL.REQUEST });
  const headers = { Accept: "application/json" };
  try {
    const { data, status } = await Axios.post(
      `${process.env.REACT_APP_SERVER_URL}/admin/blog-by-id`,
      dataObj,
      { headers: headers }
    );
    dispatch({ type: BLOG_DETAIL.SUCCESS, payload: data, status });
  } catch (error) {
    dispatch({ type: BLOG_DETAIL.FAIL, payload: error });
  }
};

export const blogDetailResetAction = (dataObj) => async (dispatch) => {
  dispatch({ type: BLOG_DETAIL.RESET });
};

export const updateBlogAction = (dataObj) => async (dispatch) => {
  dispatch({ type: UPDATE_BLOG.REQUEST });
  const headers = { Accept: "application/json" };
  try {
    const { data, status } = await Axios.post(
      `${process.env.REACT_APP_SERVER_URL}/admin/update-blog`,
      dataObj,
      { headers: headers }
    );
    dispatch({ type: UPDATE_BLOG.SUCCESS, payload: data, status });
  } catch (error) {
    dispatch({ type: UPDATE_BLOG.FAIL, payload: error });
  }
};

export const updateBlogResetAction = () => async (dispatch) => {
  dispatch({ type: UPDATE_BLOG.RESET });
};
