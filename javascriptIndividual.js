const locationSearchUrl = window.location.search; //Coge direcciones que llevan ? al final de la url
const urlParams = new URLSearchParams(locationSearchUrl); //coge window.location.search y lo coge con URLSearchParams
const pokemonId = urlParams.get("id"); //coge de la direccion el número de la id
const urlApi = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`; //Cogemos la direccion con la id del pokemon seleccionamos para poder trabajar con él

const container = document.getElementById("pokemonIndividual"); //Seleccionamos clase DONDE se MOSTRARÁ
let nombre = document.getElementById("textoPokemon"); //////
let numero = document.getElementById("numeroPokemon"); //////
let tipo = document.getElementById("tipoPokemon"); //////

const typeTranslations = {
  normal: 'normal',
  fire: 'fuego',
  water: 'agua',
  electric: 'eléctrico',
  grass: 'planta',
  ice: 'hielo',
  fighting: 'lucha',
  poison: 'veneno',
  ground: 'tierra',
  flying: 'volador',
  psychic: 'psíquico',
  bug: 'bicho',
  rock: 'roca',
  ghost: 'fantasma',
  dragon: 'dragón',
  dark: 'siniestro',
  steel: 'acero',
  fairy: 'hada'
};

fetch(urlApi) //Pasamos el pokemon específico y mostramos los datos
  .then(response => response.json())
  .then(data => {
  console.log(data);
  nombre.innerHTML = data.name.charAt(0).toUpperCase() + data.name.slice(1); //////
  numero.innerHTML = `#${pokemonId.padStart(3, "0")}`; //////
  
  data.types.forEach(dato => {
    console.log(dato.type.name);
     tipo.innerHTML += dato.type.name + " "; //////
  })
 
})
  .catch(error => {
    console.error(error);
    container.textContent = "Error loading Pokémon details"; //Muestra el error en el html
  });

 

//EJEMPLO DE window.location y URLSearchParams 
// Let an <a id="myAnchor" href="/en-US/docs/Location.search?q=123"> element be in the document
//const anchor = document.getElementById("myAnchor");
//const queryString = anchor.search; // Returns:'?q=123'

// Further parsing:
//const params = new URLSearchParams(queryString);
//const q = parseInt(params.get("q")); // is the number 123






