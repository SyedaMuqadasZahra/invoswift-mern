import {ADD_PAGE, ALL_PAGES, DELETE_PAGE, PAGE_DETAIL, UPDATE_PAGE} from "../../constant/page/pageConstants";

const pageDefaultState = {
  addPageLoading: false,
  addPageData: null,
  addPageError: null,

  allPagesLoading: false,
  allPagesData: null,
  allPagesError: null,

  deletePageLoading: false,
  deletePageData: null,
  deletePageError: null,

  pageDetailLoading: false,
  pageDetailData: null,
  pageDetailError: null,

  updatePageLoading: false,
  updatePageData: null,
  updatePageError: null,
};

export const pageReducer = (state = pageDefaultState, action) => {
  switch (action.type) {
    case ADD_PAGE.REQUEST:
      return {
        ...state,
        addPageLoading: true,
        addPageData: null,
        addPageError: null,
      };
    case ADD_PAGE.SUCCESS:
      return {
        ...state,
        addPageLoading: false,
        addPageData: { ...action.payload, statusCode: action.status },
        addPageError: null,
      };
    case ADD_PAGE.FAIL:
      return {
        ...state,
        addPageLoading: false,
        addPageData: null,
        addPageError: action.payload,
      };
    case ADD_PAGE.RESET:
      return {
        ...state,
        addPageLoading: false,
        addPageData: null,
        addPageError: null,
      };

    case ALL_PAGES.REQUEST:
      return {
        ...state,
        allPagesLoading: true,
        allPagesData: null,
        addPageError: null,
      };
    case ALL_PAGES.SUCCESS:
      return {
        ...state,
        allPagesLoading: false,
        allPagesData: { ...action.payload, statusCode: action.status },
        allPagesError: null,
      };
    case ALL_PAGES.FAIL:
      return {
        ...state,
        allPagesLoading: false,
        allPagesData: null,
        allPagesError: action.payload,
      };

    case DELETE_PAGE.REQUEST:
      return {
        ...state,
        deletePageLoading: true,
        deletePageData: null,
        deletePageError: null,
      };
    case DELETE_PAGE.SUCCESS:
      return {
        ...state,
        deletePageLoading: false,
        deletePageData: { ...action.payload, statusCode: action.status },
        deletePageError: null,
      };
    case DELETE_PAGE.FAIL:
      return {
        ...state,
        deletePageLoading: false,
        deletePageData: null,
        deletePageError: action.payload,
      };
    case DELETE_PAGE.RESET:
      return {
        ...state,
        deletePageLoading: false,
        deletePageData: null,
        deletePageError: null,
      };

    case PAGE_DETAIL.REQUEST:
      return {
        ...state,
        pageDetailLoading: true,
        pageDetailData: null,
        pageDetailError: null,
      };
    case PAGE_DETAIL.SUCCESS:
      return {
        ...state,
        pageDetailLoading: false,
        pageDetailData: { ...action.payload, statusCode: action.status },
        pageDetailError: null,
      };
    case PAGE_DETAIL.FAIL:
      return {
        ...state,
        pageDetailLoading: false,
        pageDetailData: null,
        pageDetailError: action.payload,
      };
    case PAGE_DETAIL.RESET:
      return {
        ...state,
        pageDetailLoading: false,
        pageDetailData: null,
        pageDetailError: null,
      };

    case UPDATE_PAGE.REQUEST:
      return {
        ...state,
        updatePageLoading: true,
        updatePageData: null,
        updatePageError: null,
      };
    case UPDATE_PAGE.SUCCESS:
      return {
        ...state,
        updatePageLoading: false,
        updatePageData: { ...action.payload, statusCode: action.status },
        updatePageError: null,
      };
    case UPDATE_PAGE.FAIL:
      return {
        ...state,
        updatePageLoading: false,
        updatePageData: null,
        updatePageError: action.payload,
      };
    case UPDATE_PAGE.RESET:
      return {
        ...state,
        updatePageLoading: false,
        updatePageData: null,
        updatePageError: null,
      };
    default:
      return state;
  }
};
