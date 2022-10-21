import { combineReducers } from 'redux';
import blogReducer from './blogReducer';

const rootReducer = combineReducers({
  blogs: blogReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;