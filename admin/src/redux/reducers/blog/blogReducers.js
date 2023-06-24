import {ADD_BLOG, ALL_BLOGS, BLOG_DETAIL, DELETE_BLOG, UPDATE_BLOG} from "../../constant/blog/blogConstants";

const blogDefaultState = {
  addBlogLoading: false,
  addBlogData: null,
  addBlogError: null,

  allBlogsLoading: false,
  allBlogsData: null,
  allBlogsError: null,

  deleteBlogLoading: false,
  deleteBlogData: null,
  deleteBlogError: null,

  blogDetailLoading: false,
  blogDetailData: null,
  blogDetailError: null,

  updateBlogLoading: false,
  updateBlogData: null,
  updateBlogError: null,
};

export const blogReducer = (state = blogDefaultState, action) => {
  switch (action.type) {
    case ADD_BLOG.REQUEST:
      return {
        ...state,
        addBlogLoading: true,
        addBlogData: null,
        addBlogError: null,
      };
    case ADD_BLOG.SUCCESS:
      return {
        ...state,
        addBlogLoading: false,
        addBlogData: { ...action.payload, statusCode: action.status },
        addBlogError: null,
      };
    case ADD_BLOG.FAIL:
      return {
        ...state,
        addBlogLoading: false,
        addBlogData: null,
        addBlogError: action.payload,
      };
    case ADD_BLOG.RESET:
      return {
        ...state,
        addBlogLoading: false,
        addBlogData: null,
        addBlogError: null,
      };

    case ALL_BLOGS.REQUEST:
      return {
        ...state,
        allBlogsLoading: true,
        allBlogsData: null,
        allBlogsError: null,
      };
    case ALL_BLOGS.SUCCESS:
      return {
        ...state,
        allBlogsLoading: false,
        allBlogsData: { ...action.payload, statusCode: action.status },
        allBlogsError: null,
      };
    case ALL_BLOGS.FAIL:
      return {
        ...state,
        allBlogsLoading: false,
        allBlogsData: null,
        allBlogsError: action.payload,
      };

    case DELETE_BLOG.REQUEST:
      return {
        ...state,
        deleteBlogLoading: true,
        deleteBlogData: null,
        deleteBlogError: null,
      };
    case DELETE_BLOG.SUCCESS:
      return {
        ...state,
        deleteBlogLoading: false,
        deleteBlogData: { ...action.payload, statusCode: action.status },
        deleteBlogError: null,
      };
    case DELETE_BLOG.FAIL:
      return {
        ...state,
        deleteBlogLoading: false,
        deleteBlogData: null,
        deleteBlogError: action.payload,
      };
    case DELETE_BLOG.RESET:
      return {
        ...state,
        deleteBlogLoading: false,
        deleteBlogData: null,
        deleteBlogError: null,
      };

    case BLOG_DETAIL.REQUEST:
      return {
        ...state,
        blogDetailLoading: true,
        blogDetailData: null,
        blogDetailError: null,
      };
    case BLOG_DETAIL.SUCCESS:
      return {
        ...state,
        blogDetailLoading: false,
        blogDetailData: { ...action.payload, statusCode: action.status },
        blogDetailError: null,
      };
    case BLOG_DETAIL.FAIL:
      return {
        ...state,
        blogDetailLoading: false,
        blogDetailData: null,
        blogDetailError: action.payload,
      };
    case BLOG_DETAIL.RESET:
      return {
        ...state,
        blogDetailLoading: false,
        blogDetailData: null,
        blogDetailError: null,
      };

    case UPDATE_BLOG.REQUEST:
      return {
        ...state,
        updateBlogLoading: true,
        updateBlogData: null,
        updateBlogError: null,
      };
    case UPDATE_BLOG.SUCCESS:
      return {
        ...state,
        updateBlogLoading: false,
        updateBlogData: { ...action.payload, statusCode: action.status },
        updateBlogError: null,
      };
    case UPDATE_BLOG.FAIL:
      return {
        ...state,
        updateBlogLoading: false,
        updateBlogData: null,
        updateBlogError: action.payload,
      };
    case UPDATE_BLOG.RESET:
      return {
        ...state,
        updateBlogLoading: false,
        updateBlogData: null,
        updateBlogError: null,
      };
    default:
      return state;
  }
};
