/*MODO OSCURO/CLARO*/
const modoOscuro = document.querySelector("#modoOscuro");

modoOscuro.addEventListener("click", () => {
  document.body.classList.toggle("darkMode");
    
  style.backgroundColor = document.body.classList.contains("darkMode") ? "#666" : "#f1f1f1";
});

/*COGER DATO URL*/
const locationSearchUrl = window.location.search; //Coge direcciones que llevan ? al final de la url
const urlParams = new URLSearchParams(locationSearchUrl); //coge window.location.search y lo coge con URLSearchParams
const pokemonId = urlParams.get("id"); //coge de la direccion el número de la id
const urlApi = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`; //Cogemos la direccion con la id del pokemon seleccionamos para poder trabajar con él

/*VARIABLES*/
const container = document.getElementById("pokemonIndividual"); //Seleccionamos clase DONDE se MOSTRARÁ
let nombre = document.getElementById("textoPokemon"); //////
let imagen = ""; //////
let numero = document.getElementById("numeroPokemon"); //////
let tipo = document.getElementById("tipoPokemon"); //////
let typeName = "";
let peso = document.getElementById("pesoPokemon"); //////
let altura = document.getElementById("alturaPokemon"); //////
let vida = document.getElementById("vida"); //////
let ataque = document.getElementById("ataque"); //////
let defensa = document.getElementById("defensa"); //////
let ataqueEspecial = document.getElementById("ataqueEspecial"); //////
let defensaEspecial = document.getElementById("defensaEspecial"); //////
let velocidad = document.getElementById("velocidad"); //////

/*ENUMERADOS*/
const typeTranslations = {
  normal: 'Normal',
  fire: 'Fuego',
  water: 'Agua',
  electric: 'Eléctrico',
  grass: 'Planta',
  ice: 'Hielo',
  fighting: 'Lucha',
  poison: 'Veneno',
  ground: 'Tierra',
  flying: 'Volador',
  psychic: 'Psíquico',
  bug: 'Bicho',
  rock: 'Roca',
  ghost: 'Fantasma',
  dragon: 'Dragón',
  dark: 'Siniestro',
  steel: 'Acero',
  fairy: 'Hada'
};

function Mostrar(){
  fetch(urlApi) //Pasamos el pokemon específico y mostramos los datos
  .then(response => response.json())
  .then(data => {
  console.log(data);
  nombre.innerHTML = data.name.charAt(0).toUpperCase() + data.name.slice(1); //////
  document.getElementById('imagenPokemon').src = data.sprites.other.home.front_default;
  numero.innerHTML = `#${pokemonId.padStart(3, "0")}`; //////
  peso.innerHTML = data.weight + "kg";
  altura.innerHTML = data.height + "cm";
  vida.value = data.stats[0].base_stat;
  ataque.value = data.stats[1].base_stat;
  defensa.value = data.stats[2].base_stat;
  ataqueEspecial.value = data.stats[3].base_stat;
  defensaEspecial.value = data.stats[4].base_stat;
  velocidad.value = data.stats[5].base_stat;

  data.types.forEach(dato => {
    // console.log(dato.type.name);
     typeName = dato.type.name; //////
     tipo.innerHTML += typeTranslations[typeName] + "  "; //////
  })
 
})
  .catch(error => {
    console.error(error);
    container.textContent = "Error loading Pokémon details"; //Muestra el error en el html
  });

}
 Mostrar();


//EJEMPLO DE window.location y URLSearchParams 
// Let an <a id="myAnchor" href="/en-US/docs/Location.search?q=123"> element be in the document
//const anchor = document.getElementById("myAnchor");
//const queryString = anchor.search; // Returns:'?q=123'

// Further parsing:
//const params = new URLSearchParams(queryString);
//const q = parseInt(params.get("q")); // is the number 123






