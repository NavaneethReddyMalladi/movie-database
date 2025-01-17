import {useState} from 'react'
import {Route, Switch} from 'react-router-dom'

import Popular from './Component/Popular'
import TopRated from './Component/TopRated'
import Upcoming from './Component/Upcoming'
import SearchQuery from './Component/SearchQuery'

import SearchMoviesContext from './context/SearchMoviesContext'

import './App.css'

const API_KEY = 'f32b79895b21468afbdd6d5342cbf3da'

//
const App = () => {
  const [searcReponse, setSearchResponse] = useState({})
  const [apiStatus, setApiStatus] = useState('INITIAL')
  const [searchInput, setSearchInput] = useState('')

  const onChangeSearchInput = text => setSearchInput(text)

  const getUpdatedData = responseData => ({
    totalPages: responseData.total_pages,
    totalResults: responseData.total_results,
    results: responseData.results.map(eachMovie => ({
      id: eachMovie.id,
      posterPath: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
      voteAverage: eachMovie.vote_average,
      title: eachMovie.title,
    })),
  })

  const onTriggerSearchQuery = async (page = 1) => {
    setApiStatus('IN_PROGRESS')
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchInput}&page=${page}`

    const response = await fetch(apiUrl)
    const data = await response.json()
    setSearchResponse(getUpdatedData(data))
    setApiStatus('SUCCESS')
  }

  return (
    <SearchMoviesContext.Provider
      value={{
        searcReponse,
        apiStatus,
        onTriggerSearchQuery,
        searchInput,
        onChangeSearchInput,
      }}
    >
      <div className="App d-flex flex-column">
        <Switch>
          <Route exact path="/" component={Popular} />
          <Route exact path="/top-rating" component={TopRated} />
          <Route exact path="/upcoming" component={Upcoming} />
          <Route exact path="/search" component={SearchQuery} />
        </Switch>
      </div>
    </SearchMoviesContext.Provider>
  )
}

export default App
