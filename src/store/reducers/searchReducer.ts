
import { SEARCH, SearchAction, SET_SEARCH_ERROR, TopMoviesDataResponse } from '../types'

const initialState: TopMoviesDataResponse = {Search: [], totalResults:0, searchQuery: ''}

function searchReducer(state = initialState, action: SearchAction): TopMoviesDataResponse {
  switch(action.type) {
    case SEARCH: {
    return action.payload
  }
    case SET_SEARCH_ERROR: {
    return initialState
  }
    default:
  return state;
}
}

export default searchReducer;
