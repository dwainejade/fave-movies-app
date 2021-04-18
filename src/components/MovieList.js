import React from 'react'


const MovieList = (props) => {
    const FavoriteComp = props.favoriteComp

    return (
        <>
            {props.movies.map((movie, index) => (
                <div className="image-container d-flex justify-content-start m-3">
                    <img src={movie.Poster} alt="movie poster" />
                    <div 
                        className="overlay d-flex align-items-center justify-content-center"
                        onClick={()=> props.handleFaveClick(movie)}
                    >
                        
                        <FavoriteComp />
                    </div>
                </div>
            ))}
        </>
    )
}

export default MovieList