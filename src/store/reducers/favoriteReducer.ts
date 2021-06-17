
import { GET_TOP_MOVIES, MovieAction, TopMoviesDataResponse } from '../types'

const initialState: TopMoviesDataResponse = {Search: [], totalResults:0, searchQuery: ''}

function favoriteReducer(state = initialState, action: MovieAction): TopMoviesDataResponse {
  switch (action.type) {
    case GET_TOP_MOVIES: {
      return action.payload
    }
    default:
      return state;
  }
}

export default favoriteReducer;
