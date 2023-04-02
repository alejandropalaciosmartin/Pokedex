/*MODO OSCURO/CLARO*/
const modoOscuro = document.getElementById('modoOscuro'); //Guardamos en variable el ID del html que se va a usar
 
modoOscuro.addEventListener('click', () => { //Aplicamos al elemento del ID que cuando hagamos click...
  //.dark se da efecto en el archivo .css aparte
    document.body.classList.toggle('dark'); //Coge del archivo aparte del Css o que esté dentro del html la clase dark que se encuentra en el body
    modoOscuro.classList.toggle('active'); //Activa  el estado de la clase modoOscuro

    //Guardamos el modo en localstorage
    if(document.body.classList.contains('dark')){ //Si contiene activo la clase dark
      localStorage.setItem('modeDark', 'true'); //se guarda (set) de forma ('clave','valor') ponemos true como podría ser otro valor
    }
    else{
      localStorage.setItem('modeDark','false'); //ponemos false para indicar que no está activo el efecto dark, true para señalar que está activo
    }
});

//Obtener el modo actual
if(localStorage.getItem('modeDark') === 'true'){ //Coge (get) la clave (modeDark) y comparamos si es igual al valor que marcamos arriba
                                                 //en este caso true, podría ser otro, depend elo que pusimos arriba
   document.body.classList.add('dark');  //Metemos el efecto dark del archivo .css
   modoOscuro.classList.add('active');   //Añadimos también que está activo
}
else{
    document.body.classList.remove('dark'); //Borramos el efecto dark del archivo .css
    modoOscuro.classList.remove('active');  //Borramos el efecto que indica que esta activo, para que se vea que no lo esta ya
}



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
let vidaNum = document.getElementById("vidaNum"); //////
let ataque = document.getElementById("ataque"); //////
let ataqueNum = document.getElementById("ataqueNum"); //////
let defensa = document.getElementById("defensa"); //////
let defensaNum = document.getElementById("defensaNum"); //////
let ataqueEspecial = document.getElementById("ataqueEspecial"); //////
let ataqueEspecialNum = document.getElementById("ataqueEspecialNum"); //////
let defensaEspecial = document.getElementById("defensaEspecial"); //////
let defensaEspecialNum = document.getElementById("defensaEspecialNum"); //////
let velocidad = document.getElementById("velocidad"); //////
let velocidadNum = document.getElementById("velocidadNum"); //////

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

const typeColors = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC'
};

function Mostrar(){
  fetch(urlApi) //Pasamos el pokemon específico y mostramos los datos
  .then(response => response.json())
  .then(data => {
  //  console.log(data);
  
  nombre.innerHTML = data.name.charAt(0).toUpperCase() + data.name.slice(1); //////
  document.getElementById('imagenPokemon').src = data.sprites.other.home.front_default;
  numero.innerHTML = `#${pokemonId.padStart(3, "0")}`; //////
  peso.innerHTML = data.weight/10 + "kg"; //estaba en hectogramo
  altura.innerHTML = data.height/10 + "m";  //estaba en decímetro
  vida.value = data.stats[0].base_stat;
  vidaNum.innerHTML = `{${data.stats[0].base_stat}}`;
  ataque.value = data.stats[1].base_stat;
  ataqueNum.innerHTML = `{${data.stats[1].base_stat}}`;
  defensa.value = data.stats[2].base_stat;
  defensaNum.innerHTML = `{${data.stats[2].base_stat}}`;
  ataqueEspecial.value = data.stats[3].base_stat;
  ataqueEspecialNum.innerHTML = `{${data.stats[3].base_stat}}`;
  defensaEspecial.value = data.stats[4].base_stat;
  defensaEspecialNum.innerHTML = `{${data.stats[4].base_stat}}`;
  velocidad.value = data.stats[5].base_stat;
  velocidadNum.innerHTML = `{${data.stats[5].base_stat}}`;

  //Realizamos un forEach para poder visualizar los diferentes tipos
  data.types.forEach(dato => {
     typeName = dato.type.name; //Metemos los nombres en una variable
     const tipoDiv = document.createElement("div"); //Creamos un div y lo metemos en la variable
     //Creamos estilo al div creado, para que se cree un estilo de color diferente según el que toque, para que sea dinámico
     tipoDiv.style.cssText = `background-color:${typeColors[typeName]}; color: white; padding: 1vh 20vh 1vh 6vh; border-radius:10px; margin-right:5px; text-shadow:-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000; border:solid black 2px`;
     tipoDiv.innerHTML = typeTranslations[typeName]; //Metemos en el div el nombre traducido
     tipo.appendChild(tipoDiv); //Metemos el div creado en el js (div hijo) en el padre (tipo) que está en el html
  })
  //  console.log("Actual " + data.id);
  // console.log(data);
  //Realizamos un forEach para poder visualizar los diferentes tipos de EVOLUCIÓN
  fetch(data.species.url) //Pasamos el pokemon específico y mostramos los datos
    .then(response => response.json())
    .then(data => {
      // console.log(data);
          fetch(data.evolution_chain.url)
          .then(response => response.json())
          .then(data => {
             console.log(data); 
            let id1Evolucion = parseInt(data.chain.species.url.substr(42,3));
            let nombre1Evolucion = data.chain.species.name;
            console.log("1º Evolución: " + nombre1Evolucion + " // Id: " + id1Evolucion);  
            data.chain.evolves_to.forEach(datos => {
              if(datos.species.name == "vaporeon" || datos.species.name == "jolteon" || datos.species.name == "flareon")
              {
                  datos.evolution_details.forEach(dato1 => {
                      console.log("Evolución: " + datos.species.name + " " + dato1.trigger.name + " " + dato1.item.name);
                  });
                }
              else {
                datos.evolution_details.forEach(dato1 => {
                  if(nombre1Evolucion != "eevee" && data.chain.species.name != null && id1Evolucion <= 151){
                    console.log("Evolución: " + dato1.trigger.name);
                  }
                });
              }
            });
            data.chain.evolves_to.forEach(dato => {
              let id2Evolucion = parseInt(dato.species.url.substr(42,3));
              if(dato.species.name != null && id2Evolucion <= 151){
                console.log("2º Evolución: " + dato.species.name + " // Id: " + id2Evolucion); 
              }
              dato.evolves_to.forEach(datito => {
              let id3Evolucion = parseInt(datito.species.url.substr(42,3));
              if(datito.species.name != null && id3Evolucion <= 151){
                console.log("3º evolución " + datito.species.name + " // Id: " + id3Evolucion);
              }
            })

          })
        });
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






