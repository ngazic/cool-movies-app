import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import searchReducer from './reducers/searchReducer';
import favoriteReducer from './reducers/favoriteReducer';

const middleware = [thunk];

const persistedState = localStorage.getItem('myFavoriteList')
  ? JSON.parse(localStorage.getItem('myFavoriteList')!)
  : {}

const rootReducer = combineReducers({
  search: searchReducer,
  favorite: favoriteReducer,
})

const store = createStore(rootReducer,
  {...persistedState},
  composeWithDevTools(applyMiddleware(...middleware))
)

store.subscribe(() => {
  localStorage.setItem("myFavoriteList", JSON.stringify(store.getState()))
})

export type RootState = ReturnType<typeof rootReducer>;

export default store;
