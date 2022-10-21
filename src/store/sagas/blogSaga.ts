import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { blogActionTypes } from '../actions/blogActionTypes';
import {
  fetchBlogsRequest,
  fetchBlogsSuccess,
  fetchBlogsFailure,
  fetchBlogByIdRequest,
  fetchBlogByIdSuccess,
  createBlog,
  createBlogFailure,
  updateBlog,
  updateBlogFailure,
} from '../actions/blogAction';

import {
  getBlogs,
  getBlogById,
  postBlog,
  putBlog,
} from '../services/blogService';
import { RootState } from '../reducers/reducers';

function* fetchBlogsSaga(action: ReturnType<typeof fetchBlogsRequest>) {
  try {
    const response = yield call(() => getBlogs(action.payload));
    if (response.status === '200-OK') {
      yield put(fetchBlogsSuccess(response.data))
    }
  } catch (error) {
    yield put(fetchBlogsFailure(error));
  }
}

function* fetchBlogByIdSaga(action: ReturnType<typeof fetchBlogByIdRequest>) {
  try {
    const response = yield call(() => getBlogById(action.payload));
    if (response.status === '200-OK') {
      yield put(fetchBlogByIdSuccess(response.data))
    }
  } catch (error) {
    yield put(fetchBlogsFailure(error));
  }
}

function* createBlogSaga(action: ReturnType<typeof createBlog>) {
  try {
    const response = yield call(() => postBlog(action.payload));
    if (response.status === '201-Created') {
      yield fetchDataAfterUseAction();
    }
  } catch (error) {
    yield put(createBlogFailure(error));
  }
}

function* updateBlogSaga(action: ReturnType<typeof updateBlog>) {
  const { id, blog } = action.payload
  try {
    const response = yield call(() => putBlog(id, blog));
    if (response.status === '200-OK') {
      yield fetchDataAfterUseAction();
    }
  } catch (error) {
    yield put(updateBlogFailure(error));
  }
}

function* fetchDataAfterUseAction() {
  const getBlogsState = (state: RootState) => state.blogs
  const blogsState = yield select(getBlogsState);
  const { pagination, search = '', sort_by = 'created_at' } = blogsState
  let param = {
    page: pagination?.page ? pagination.page : 1,
    search,
    sort_by,
  }
  yield put(fetchBlogsRequest(param))
}

function* blogsSaga() {
  yield all([
    takeLatest(blogActionTypes.FETCH_BLOGS_REQUEST, fetchBlogsSaga),
    takeLatest(blogActionTypes.FETCH_BLOG_BY_ID_REQUEST, fetchBlogByIdSaga),
    takeLatest(blogActionTypes.CREATE_BLOG, createBlogSaga),
    takeLatest(blogActionTypes.UPDATE_BLOG, updateBlogSaga),
  ]);
}

export default blogsSaga;