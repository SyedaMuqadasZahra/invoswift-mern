import Axios from "axios";
import {ADD_PAGE, ALL_PAGES, DELETE_PAGE, PAGE_DETAIL, UPDATE_PAGE} from "../../constant/page/pageConstants";

export const addPageAction = (dataObj) => async (dispatch) => {
  dispatch({ type: ADD_PAGE.REQUEST });
  const headers = { Accept: "application/json" };
  try {
    const { data, status } = await Axios.post(
      `${process.env.REACT_APP_SERVER_URL}/admin/add-page`,
      dataObj,
      { headers: headers }
    );
    dispatch({ type: ADD_PAGE.SUCCESS, payload: data, status });
  } catch (error) {
    dispatch({ type: ADD_PAGE.FAIL, payload: error });
  }
};

export const addPageResetAction = () => async (dispatch) => {
  dispatch({ type: ADD_PAGE.RESET });
};

export const allPagesAction = (dataObj) => async (dispatch) => {
  dispatch({ type: ALL_PAGES.REQUEST });
  const headers = { Accept: "application/json" };
  try {
    const { data, status } = await Axios.post(
      `${process.env.REACT_APP_SERVER_URL}/admin/all-pages`,
      dataObj,
      { headers: headers }
    );
    dispatch({ type: ALL_PAGES.SUCCESS, payload: data, status });
  } catch (error) {
    dispatch({ type: ALL_PAGES.FAIL, payload: error });
  }
};

export const deletePageAction = (dataObj) => async (dispatch) => {
  dispatch({ type: DELETE_PAGE.REQUEST });
  const headers = { Accept: "application/json" };
  try {
    const { data, status } = await Axios.post(
      `${process.env.REACT_APP_SERVER_URL}/admin/delete-page`,
      dataObj,
      { headers: headers }
    );
    dispatch({ type: DELETE_PAGE.SUCCESS, payload: data, status });
  } catch (error) {
    dispatch({ type: DELETE_PAGE.FAIL, payload: error });
  }
};

export const deletePageResetAction = () => async (dispatch) => {
  dispatch({ type: DELETE_PAGE.RESET });
};

export const pageDetailAction = (dataObj) => async (dispatch) => {
  dispatch({ type: PAGE_DETAIL.REQUEST });
  const headers = { Accept: "application/json" };
  try {
    const { data, status } = await Axios.post(
      `${process.env.REACT_APP_SERVER_URL}/admin/page-by-id`,
      dataObj,
      { headers: headers }
    );
    dispatch({ type: PAGE_DETAIL.SUCCESS, payload: data, status });
  } catch (error) {
    dispatch({ type: PAGE_DETAIL.FAIL, payload: error });
  }
};

export const pageDetailResetAction = () => async (dispatch) => {
  dispatch({ type: PAGE_DETAIL.RESET });
};

export const updatePageAction = (dataObj) => async (dispatch) => {
  dispatch({ type: UPDATE_PAGE.REQUEST });
  const headers = { Accept: "application/json" };
  try {
    const { data, status } = await Axios.post(
      `${process.env.REACT_APP_SERVER_URL}/admin/update-page`,
      dataObj,
      { headers: headers }
    );
    dispatch({ type: UPDATE_PAGE.SUCCESS, payload: data, status });
  } catch (error) {
    dispatch({ type: UPDATE_PAGE.FAIL, payload: error });
  }
};

export const updatePageResetAction = (dataObj) => async (dispatch) => {
  dispatch({ type: UPDATE_PAGE.RESET });
};

