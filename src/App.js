import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import MovieList from './components/MovieList'
import MovieListHeading from './components/MovieListHeading'
import SearchBox from './components/SearchBox'
import AddFavorite from './components/AddFavorite'
import RemoveFavorite from './components/RemoveFavorite'


const App = () => {
  const [movies, setMovies] = useState([])
  const [faves, setFaves] = useState([])
  const [searchValue, setSearchValue] = useState('')

  const getMovie = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=8ea29288`

    const res = await fetch(url)
    const resJson = await res.json()

    if (resJson.Search) {
      setMovies(resJson.Search)
    }
  }

  useEffect(() => {
    getMovie(searchValue)
  }, [searchValue])

  useEffect(() => {
    const localFaves = JSON.parse(localStorage.getItem('fave-movies-app'))
    setFaves(localFaves)
  }, [])

  const saveToLocalStorage = (items) =>{
    localStorage.setItem('fave-movies-app',JSON.stringify(items))
  }

  const addFave = (movie) => {
    const newFave = [movie, ...faves]
    setFaves(newFave)
    saveToLocalStorage(newFave)
  }

  const removeFave = (movie) => {
    const newList = faves.filter((fave) => fave.imdbID !== movie.imdbID)
    setFaves(newList)
    saveToLocalStorage(newList)
  }

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        <MovieList
          movies={movies}
          favoriteComp={AddFavorite}
          handleFaveClick={addFave}
        />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Favorites" />
      </div>
      <div className="row">
        <MovieList
          movies={faves}
          favoriteComp={RemoveFavorite}
          handleFaveClick={removeFave}
        />
      </div>
    </div>
  );
}

export default App;
