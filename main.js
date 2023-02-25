function getHours(min) {
  let hours = Math.floor(min / 60);
  if (hours > 0) {
    return ` ${hours} h ${min - hours * 60} min `;
  } else {
    return ` ${min} min `;
  }
}

function getImageUrl(image_path) {
  return `https://image.tmdb.org/t/p/w342${image_path}`;
}

const title = document.querySelector("#title");
const sinopse = document.querySelector("#sinopse");
const genero = document.querySelector("#genero");
const info = document.querySelector("#info");
const draw = document.querySelector("#draw");
const banner = document.querySelector("#poster");

function newMovie(){
  fetch(`/.netlify/functions/get-movie`)
    .then( function(response) {        
      return response.text();      
    }).then( function(text) {
      const selected_movie_json = JSON.parse(text).msg;
      title.textContent = selected_movie_json.title;
      if(selected_movie_json.overview){
        sinopse.textContent = selected_movie_json.overview;
      }else{
        sinopse.textContent = " Sinopse indisponível...";
      }
      genero.textContent = "";
      selected_movie_json.genres.forEach(function (gen) {
        genero.textContent += ` ${gen.name} `;
      });
      info.textContent = ` TMDB ${selected_movie_json.vote_average.toFixed(1)} - ${selected_movie_json.release_date.slice(0,4)} - ${getHours(selected_movie_json.runtime)} `;
      banner.src = getImageUrl(selected_movie_json.poster_path);
      banner.alt = title; 
    }) 
}


draw.addEventListener("click", () => {
  newMovie();
});