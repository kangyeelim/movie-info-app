const api_key = 'd343c3058e57fa902c84c71393c8dbbd';
const api_key_omdb = '4232bcb1';

const processMovie = (movie) => ({
    key: String(movie.id),
    title: movie.title,
    release_date: movie.release_date,
    poster: movie.poster_path,
    adult: movie.adult,
    overview: movie.overview,
    popularity: movie.popularity,
    vote_count: movie.vote_count,
    vote_average: movie.vote_average
})

export const fetchMovies = async (title) => {
  const response = await fetch('https://api.themoviedb.org/3/search/movie?api_key=' + api_key + '&query=' + title + '&language=en-US');
  const result  = await response.json();
  const results = await result.results;
  return results.map(processMovie);
}

export const fetchMoreMovieDetails = async (movie_id) => {
  const response = await fetch('https://api.themoviedb.org/3/movie/' + movie_id + '?api_key=' + api_key + '&language=en-US');
  const result = await response.json();
  const runtime = await result.runtime;
  const languages = await result.spoken_languages;
  const status = await result.status;
  const imdb_id = await result.imdb_id;
  const response2 = await fetch('http://www.omdbapi.com/?i='+ imdb_id +'&apikey=' + api_key_omdb);
  const result2 = await response2.json();
  const rated = await result2.Rated;
  const ratings = await result2.Ratings;
  const actors = await result2.Actors;
  const director = await result2.Director;
  const writer = await result2.Writer;
  const response3 = await fetch('https://api.themoviedb.org/3/movie/' + movie_id + '/recommendations?api_key='+ api_key + '&language=en-US&page=1');
  const result3 = await response3.json();
  const results3 = await result3.results;
  const recommendations = results3.map(processMovie);
  var languagesText = '';
  for (var i = 0; i < languages.length; i++) {
    if (i > 0) {
      languagesText += ", ";
    }
    languagesText += languages[i].name;
  }
  const genres = await result.genres;
  var genresText = ''
  for (var i = 0; i < genres.length; i++) {
    if (i > 0) {
      genresText += ", ";
    }
    genresText += genres[i].name;
  }

  const productionCompanies = await result.production_companies;
  var companies = ''
  for (var i = 0; i < productionCompanies.length; i++) {
    if (i > 0) {
      companies += ", ";
    }
    companies += productionCompanies[i].name;
    if (productionCompanies[i].origin_country != "") {
      companies += " (" + productionCompanies[i].origin_country + ")";
    }
  }
  return ({
    runtime: runtime,
    languages: languagesText,
    genres: genresText,
    status: status,
    ratings: ratings,
    rated: rated,
    actors: actors,
    director: director,
    writer: writer,
    recommendations: recommendations,
    productionCompanies: companies
  });
}

export const fetchPopularMovies = async () => {
  const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key='+ api_key +'&language=en-US&page=1');
  const result  = await response.json();
  const results = await result.results;
  const response2 = await fetch('https://api.themoviedb.org/3/movie/popular?api_key='+ api_key +'&language=en-US&page=2');
  const result2  = await response2.json();
  const results2 = await result2.results;
  return (results.map(processMovie)).concat(results2.map(processMovie));

}
