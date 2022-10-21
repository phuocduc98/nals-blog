import { blogActionTypes } from '../actions/blogActionTypes';

interface BlogsState {
  pending: boolean;
  blog: any;
  blogs: any[];
  error: string | null;
  pagination: any;
  search: string;
  sort_by: string;
}

const initialState: BlogsState = {
  pending: false,
  blog: null,
  blogs: [],
  error: null,
  pagination: {},
  search: '',
  sort_by: 'created_at',
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case blogActionTypes.FETCH_BLOGS_REQUEST:
    case blogActionTypes.FETCH_BLOG_BY_ID_REQUEST:
    case blogActionTypes.CREATE_BLOG:
    case blogActionTypes.UPDATE_BLOG:
      return {
        ...state,
        pending: true
      };
    case blogActionTypes.FETCH_BLOGS_SUCCESS:
      return {
        ...state,
        pending: false,
        blogs: action.payload.data.items,
        pagination: action.payload.pagination,
        search: action.payload.search,
        sort_by: action.payload.sort_by,
        error: null
      };
    case blogActionTypes.FETCH_BLOG_BY_ID_SUCCESS:
      return {
        ...state,
        pending: false,
        blog: action.payload.data,
        error: null
      };
    case blogActionTypes.FETCH_BLOGS_FAILURE:
      return {
        ...state,
        pending: false,
        blog: null,
        blogs: [],
        pagination: null,
        error: action.payload.message
      };
    case blogActionTypes.CREATE_BLOG_FAILURE:
    case blogActionTypes.UPDATE_BLOG_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.message
      };
    default:
      return {
        ...state
      };
  }
};

export default reducer;