export const SEARCH = 'SEARCH';
export const GET_TOP_MOVIES = 'GET_TOP_MOVIES';
export const GET_ITEM_DETAILS = 'GET_ITEM_DETAILS';
export const SET_ERROR = 'SET_ERROR';
export const SET_SEARCH_ERROR = 'SET_SEARCH_ERROR';

export interface SearchFor {
  type: typeof SEARCH;
  payload: {Search: Items[], totalResults: number, searchQuery: string}
}

export interface GetTopMovies {
  type: typeof GET_TOP_MOVIES,
  payload: {Search: Items[], totalResults: number, searchQuery: string}
}

export interface SetError {
  type: typeof SET_ERROR,
  payload: string;
}

export interface SetSearchError {
  type: typeof SET_SEARCH_ERROR,
  payload: string;
}

interface SearchItems {
  item: string;
}

export interface Items {
  imdbID: string;
  Type: string;
  Year: number;
  Title: string;
  Poster: string;
  isFavorite: boolean;
}


export interface TopMoviesDataResponse {
  Search: Items[],
  totalResults: number,
  searchQuery: string
}

export type SearchState = SearchItems;
export type SearchAction = SearchFor | SetSearchError;
export type MovieAction = GetTopMovies | SetError;
