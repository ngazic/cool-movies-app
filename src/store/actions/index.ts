import { ThunkAction } from 'redux-thunk'
import { SearchAction, TopMoviesDataResponse, MovieAction, GET_TOP_MOVIES, SEARCH, SET_ERROR, SET_SEARCH_ERROR, Items } from '../types'
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
      data.Search.map(item => {
        const isFavorite = mainState.favorite.Search.some(x=> x.imdbID===item.imdbID);
        if(isFavorite) {
          item.isFavorite = true
        } 
        return item;
      }
        )
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

export const setFavoritePicks = (index: number, category: string): ThunkAction<void, RootState, null, MovieAction> => {
  return async dispatch => {
    try {
      const mainState = store.getState();
      const itemToToggleFavStatus: Items = mainState[category as keyof typeof mainState]!.Search[index];
      if(category === "search") {
        if(itemToToggleFavStatus?.isFavorite){
          itemToToggleFavStatus.isFavorite = false;
          let removeIndex = mainState.favorite.Search.findIndex(value => value.imdbID === itemToToggleFavStatus.imdbID )
          mainState.favorite.Search.splice(removeIndex,1);
        }else {
          itemToToggleFavStatus!.isFavorite = true;
          mainState.favorite.Search.push(itemToToggleFavStatus)
        }
      }else {
        if(itemToToggleFavStatus?.isFavorite){
          let removeIndexFromSearch = mainState.search.Search.findIndex(value => value.imdbID === itemToToggleFavStatus.imdbID )
          if(removeIndexFromSearch >= 0) {
            mainState.search.Search[removeIndexFromSearch].isFavorite = false;
          }
          mainState.favorite.Search.splice(index,1);
        }
      }
      const res = await fetch(`${API.apiBasePath}=${API.REACT_APP_API_KEY}&page=1&s=""`)
      if (!res.ok) {
        const resData = await res.json();
        throw new Error(resData.message);

      }
      const data: TopMoviesDataResponse = await res.json();
      dispatch({
        type: GET_TOP_MOVIES,
        payload: {...data, searchQuery: mainState.search.searchQuery, Search: mainState.favorite.Search, totalResults: mainState.favorite.Search.length}
      })
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err
      });
    }
  }
}

