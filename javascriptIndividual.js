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
let nombre = document.getElementById("textoPokemon"); 
let imagen = ""; 
let numero = document.getElementById("numeroPokemon"); 
let tipo = document.getElementById("tipoPokemon"); 
let typeName = "";
let peso = document.getElementById("pesoPokemon"); 
let altura = document.getElementById("alturaPokemon"); 
let vida = document.getElementById("vida"); 
let vidaNum = document.getElementById("vidaNum"); 
let ataque = document.getElementById("ataque"); 
let ataqueNum = document.getElementById("ataqueNum"); 
let defensa = document.getElementById("defensa"); 
let defensaNum = document.getElementById("defensaNum"); 
let ataqueEspecial = document.getElementById("ataqueEspecial"); 
let ataqueEspecialNum = document.getElementById("ataqueEspecialNum"); 
let defensaEspecial = document.getElementById("defensaEspecial"); 
let defensaEspecialNum = document.getElementById("defensaEspecialNum"); 
let velocidad = document.getElementById("velocidad"); 
let velocidadNum = document.getElementById("velocidadNum"); 
let evolucion1 = document.getElementById("evolucion1"); 
let evolucion2 = document.getElementById("evolucion2"); 
let evolucion2Extra1 = document.getElementById("evolucion2Extra1"); 
let evolucion2Extra2 = document.getElementById("evolucion2Extra2"); 
let evolucion3 = document.getElementById("evolucion3"); 
let trigger0 = document.getElementById("trigger0"); 
let trigger00 = document.getElementById("trigger00"); 
// let trigger1 = document.getElementById("trigger1"); 
// let trigger2 = document.getElementById("trigger2"); 
// let trigger3 = document.getElementById("trigger3"); 

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

const itemTranslations = {
  water: 'Agua',
  thunder: 'Trueno',
  fire: 'Fuego',
  moon: 'Lunar',
  leaf: 'Hoja',
  level: 'Nivel',
  item: 'Piedra',
  trade: 'Cable Link'
};

function Mostrar(){
  fetch(urlApi) //Pasamos el pokemon específico y mostramos los datos
  .then(response => response.json())
  .then(data => {
    //console.log(data);
  
  nombre.innerHTML = data.name.charAt(0).toUpperCase() + data.name.slice(1); 
  document.getElementById('imagenPokemon').src = data.sprites.other.home.front_default;
  numero.innerHTML = `#${pokemonId.padStart(3, "0")}`; 
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
          .then(priEvolu => {
            //1º Evolución
            // console.log(priEvolu.chain);
            let id1Evolucion = parseInt(priEvolu.chain.species.url.substr(42,3)); //ID
            let nombre1Evolucion = priEvolu.chain.species.name; //NOMBRE
            // console.log("1º Evolución: " + nombre1Evolucion + " // Id: " + id1Evolucion); 
            
            if(id1Evolucion <= 151){
              evolucion1.innerHTML = nombre1Evolucion.charAt(0).toUpperCase() + nombre1Evolucion.slice(1);
              document.getElementById('evolucion1Img').src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id1Evolucion}.png`;
              document.getElementById('irA').href = `especifico.html?id=${id1Evolucion}`;
                if(id1Evolucion != 83){ //No hay más evoluciones
                  document.getElementById('flecha1').src = `./img/flecha2.png`; 
                }
            }
            
            //2º Evolución
              priEvolu.chain.evolves_to.forEach(sencEvolu => {
                //1º a 2º
                sencEvolu.evolution_details.forEach(evoluDetail => { 
                  if(id1Evolucion <= 151 && id1Evolucion == 27 || id1Evolucion == 28){ //Sandshrew
                    // console.log(evoluDetail.trigger.name);
                    // console.log("1º Forma de evolucionar " + evoluDetail.trigger.name.slice(0,5));
                    trigger0.innerHTML = itemTranslations[sencEvolu.evolution_details[0].trigger.name.slice(0,5)] + " " + sencEvolu.evolution_details[0].min_level; 
                  }
                  else if(id1Evolucion <= 151 && id1Evolucion == 37 || id1Evolucion == 38){ //Vulpix
                    // console.log(evoluDetail.trigger.name);
                    // console.log("1º Forma de evolucionar " + evoluDetail.trigger.name.slice(4,8));
                    trigger0.innerHTML = itemTranslations[sencEvolu.evolution_details[0].trigger.name.slice(4,8)] + " " + itemTranslations[sencEvolu.evolution_details[0].item.name.slice(0,-6)]; 
                  }
                  else if(id1Evolucion <= 151){
                    if(evoluDetail.trigger.name == "use-item"){
                      //PIEDRA
                      // console.log("1º Forma de evolucionar " + evoluDetail.trigger.name.slice(4,8));
                      trigger0.innerHTML += itemTranslations[evoluDetail.trigger.name.slice(4,8)] + " ";
                      trigger0.innerHTML += itemTranslations[evoluDetail.item.name.slice(0,-6)];
                    }                 
                    else if(evoluDetail.trigger.name == "trade"){
                      //Cable Link
                      // console.log("1º Forma de evolucionar " + evoluDetail.trigger.name.slice(0,5));
                      trigger0.innerHTML = itemTranslations[evoluDetail.trigger.name.slice(0,5)];
                    }
                    else if(evoluDetail.trigger.name == "level-up"){
                      //NIVEL
                      // console.log(evoluDetail.trigger.name);
                      // console.log("1º Forma de evolucionar " + evoluDetail.trigger.name.slice(0,5));
                      trigger0.innerHTML = itemTranslations[evoluDetail.trigger.name.slice(0,5)] + " " + sencEvolu.evolution_details[0].min_level; 
                    }
                  }
                })

            
            
          
            //  console.log(sencEvolu);
            /*if(sencEvolu.species.name == "vaporeon")
            {
                sencEvolu.evolution_details.forEach(dato1 => {
                    // console.log("Evolución: " + sencEvolu.species.name + " " + dato1.trigger.name + " " + itemTranslations[dato1.item.name.slice(0, -6)]);
                    trigger1.innerHTML = itemTranslations[dato1.item.name.slice(0, -6)];
                    document.getElementById('flecha1V').src = `./img/flecha2.png`;
                });
              }
            else if(sencEvolu.species.name == "jolteon")
            {
                sencEvolu.evolution_details.forEach(dato1 => {
                    // console.log("Evolución: " + sencEvolu.species.name + " " + dato1.trigger.name + " " + itemTranslations[dato1.item.name.slice(0, -6)]);
                    trigger2.innerHTML = itemTranslations[dato1.item.name.slice(0, -6)];
                    document.getElementById('flecha1J').src = `./img/flecha2.png`;
                });
            }
            else if(sencEvolu.species.name == "flareon")
            {
                sencEvolu.evolution_details.forEach(dato1 => {
                    // console.log("Evolución: " + sencEvolu.species.name + " " + dato1.trigger.name + " " + itemTranslations[dato1.item.name.slice(0, -6)]);
                    trigger3.innerHTML = itemTranslations[dato1.item.name.slice(0, -6)];
                });
            }*/

            let id2Evolucion = parseInt(sencEvolu.species.url.substr(42,3));
            if(sencEvolu.species.name != null && id2Evolucion <= 151 && id2Evolucion != 134  && id2Evolucion != 135  && id2Evolucion != 136){
                // console.log("2º Evolución: " + sencEvolu.species.name + " // Id: " + id2Evolucion); 
                evolucion2.innerHTML = sencEvolu.species.name.charAt(0).toUpperCase() + sencEvolu.species.name.slice(1);
                document.getElementById('evolucion2Img').src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id2Evolucion}.png`;
                document.getElementById('irA2').href = `especifico.html?id=${id2Evolucion}`;
            }
          /*
            else if(id2Evolucion == 134 )
            {
              evolucion2.innerHTML = sencEvolu.species.name.charAt(0).toUpperCase() + sencEvolu.species.name.slice(1);
              document.getElementById('evolucion2Img').src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id2Evolucion}.png`;
            }
            else if(id2Evolucion == 135 )
            {
              evolucion2Extra1.innerHTML = sencEvolu.species.name.charAt(0).toUpperCase() + sencEvolu.species.name.slice(1);
              document.getElementById('evolucion2ImgExtra1').src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id2Evolucion}.png`;
            }
            else if(id2Evolucion == 136 )
            {
              evolucion2Extra2.innerHTML = sencEvolu.species.name.charAt(0).toUpperCase() + sencEvolu.species.name.slice(1);
              document.getElementById('evolucion2ImgExtra2').src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id2Evolucion}.png`;
          
            }*/

            
              //3º Evolución
              sencEvolu.evolves_to.forEach(terEvolu => {

                let valor = terEvolu.species.url.substr(42,3);
                //Si no tiene 3º evolución y es menor de id 151 o el número incluya / es decir /numero, que son dos o una cifra -> Para evitar coger evoluciones de otras generaciones
                if(terEvolu.evolves_to != 0 && valor <= 151 || valor.includes("/")){ 
                   console.log(terEvolu.species.url.substr(42,3));
                  document.getElementById('flecha2').src = `./img/flecha2.png`; 
                
                //2º a 3º
                terEvolu.evolution_details.forEach(evoluDetail2 => {
                  // console.log(evoluDetail2);
                  if(id2Evolucion <= 151){
                    //PIEDRA
                    if(evoluDetail2.trigger.name == "use-item")
                    {
                      // console.log("2º Forma de evolucionar " + evoluDetail2.trigger.name.slice(4,8));
                      trigger00.innerHTML = itemTranslations[evoluDetail2.trigger.name.slice(4,8)] + " ";
                      trigger00.innerHTML += itemTranslations[evoluDetail2.item.name.slice(0,-6)];
                    }
                    else if(evoluDetail2.trigger.name == "trade")
                    {
                    //Cable Link
                    // console.log("1º Forma de evolucionar " + evoluDetail2.trigger.name.slice(0,5));
                    trigger00.innerHTML += itemTranslations[evoluDetail2.trigger.name.slice(0,5)];
                    }
                    //NIVEL
                    else if(evoluDetail2.trigger.name == "level-up"){
                      // console.log("2º Forma de evolucionar " + evoluDetail2.trigger.name);
                      trigger00.innerHTML = itemTranslations[evoluDetail2.trigger.name.slice(0,5)] + " " + terEvolu.evolution_details[0].min_level;
                    }
                  }
                })
              }


              let id3Evolucion = parseInt(terEvolu.species.url.substr(42,3));
                if(terEvolu.species.name != null && id3Evolucion <= 151){
                    // console.log("3º evolución " + terEvolu.species.name + " // Id: " + id3Evolucion);
                    evolucion3.innerHTML = terEvolu.species.name.charAt(0).toUpperCase() + terEvolu.species.name.slice(1);
                    document.getElementById('evolucion3Img').src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id3Evolucion}.png`;
                    document.getElementById('irA3').href = `especifico.html?id=${id3Evolucion}`;
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






