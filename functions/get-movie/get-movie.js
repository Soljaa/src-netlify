const fetch = require('node-fetch')

function getMovieUrl(movie_id) {
  return `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=pt-BR`;
}

const handler = async function () {
  const total_pages = 500;
  const movies_per_page = 20;

  API_KEY = process.env.API_KEY

  let rand_page = Math.floor(Math.random() * total_pages);
  let rand_movie = Math.floor(Math.random() * movies_per_page);
  const URL_TMDB = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=pt-BR&page=${rand_page}`;
  let page = await fetch(URL_TMDB);
  const page_json = await page.json();
  let movie_id = page_json.results[rand_movie].id



  try {
    const response = await fetch(getMovieUrl(movie_id), {
      headers: { Accept: 'application/json' },
    })
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText }
    }
    const data = await response.json()

    return {
      statusCode: 200,
      body: JSON.stringify({ msg: data}),
    }
  } catch (error) {
    // output to netlify function log
    console.log(error)
    return {
      statusCode: 500,
      // Could be a custom message or object i.e. JSON.stringify(err)
      body: JSON.stringify({ msg: error.message }),
    }
  }
}

module.exports = { handler }
