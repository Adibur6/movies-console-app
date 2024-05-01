function searchMoviesByTitle(movies, query) {
    if (query === '') {
        return movies.sort((a, b) => a.movieTitle.localeCompare(b.movieTitle));
    }
    
    return movies.filter(movie => movie.movieTitle.toLowerCase().includes(query.toLowerCase())).sort((a, b) => a.movieTitle.localeCompare(b.movieTitle));
}

function searchMoviesByCast(movies, actor) {
    if (actor === '') {
        return movies.sort((a, b) => a.movieTitle.localeCompare(b.movieTitle));
    }
    
    return movies.filter(movie => movie.cast.some(castMember => castMember.toLowerCase().includes(actor.toLowerCase()))).sort((a, b) => a.movieTitle.localeCompare(b.movieTitle));
}

function searchMoviesByCategory(movies, category) {
    if (category === '') {
        return movies.sort((a, b) => a.movieTitle.localeCompare(b.movieTitle));
    }
    
    return movies.filter(movie => movie.category.toLowerCase() === category.toLowerCase()).sort((a, b) => a.movieTitle.localeCompare(b.movieTitle));
}

module.exports = {
    searchMoviesByTitle,
    searchMoviesByCast,
    searchMoviesByCategory
};