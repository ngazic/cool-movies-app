import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import searchReducer from './reducers/searchReducer';
import favoriteReducer from './reducers/favoriteReducer';

const middleware = [thunk];

const rootReducer = combineReducers({
  search: searchReducer,
  favorite: favoriteReducer,
})

const store = createStore(rootReducer,
  {},
  composeWithDevTools(applyMiddleware(...middleware))
)

export type RootState = ReturnType< typeof rootReducer>;

export default store;
