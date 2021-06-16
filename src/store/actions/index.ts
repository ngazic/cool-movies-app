import { ThunkAction } from 'redux-thunk'
import { SearchAction, TopMoviesDataResponse, MovieAction, GET_TOP_MOVIES, SEARCH, SET_ERROR, SET_SEARCH_ERROR } from '../types'
import store, { RootState } from '../index'
import API from '../../API-helper'

export const getSearchItems = (query="hello world", page = 1): ThunkAction<void, RootState, null, SearchAction> => {
  return async dispatch => {
    try {
      const res = await fetch(`${API.apiBasePath}=${API.REACT_APP_API_KEY}&s=${query}&page=${page}`)
      if (!res.ok || query.trim() === '') {
        const resData = await res.json();
        throw new Error(resData.message);

      }
      const data: TopMoviesDataResponse = await res.json();
      const mainState = store.getState();
      let payload: TopMoviesDataResponse;
      if (query === mainState.search.searchQuery) {
        payload = {Search: mainState.search.Search.concat(data.Search), searchQuery: query, totalResults: data.totalResults}
      } else {
        payload = {...data, searchQuery: query};
      }
      dispatch({
        type: SEARCH,
        payload
      })
    } catch (err) {
      dispatch({
        type: SET_SEARCH_ERROR,
        payload: err
      });
    }
  }
}

export const getTopMovies = (query="hello world"): ThunkAction<void, RootState, null, MovieAction> => {
  return async dispatch => {
    try {
      const res = await fetch(`${API.apiBasePath}=${API.REACT_APP_API_KEY}&page=1&s="${query}"`)
      if (!res.ok) {
        const resData = await res.json();
        throw new Error(resData.message);

      }
      const data: TopMoviesDataResponse = await res.json();
      dispatch({
        type: GET_TOP_MOVIES,
        payload: {...data, searchQuery: query}
      })
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err
      });
    }
  }
}

