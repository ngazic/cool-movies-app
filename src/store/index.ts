import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import searchReducer from './reducers/searchReducer';
import moviesReducer from './reducers/moviesReducer';

const middleware = [thunk];

const rootReducer = combineReducers({
  search: searchReducer,
  movie: moviesReducer,
})

const store = createStore(rootReducer,
  {},
  composeWithDevTools(applyMiddleware(...middleware))
)

export type RootState = ReturnType< typeof rootReducer>;

export default store;
