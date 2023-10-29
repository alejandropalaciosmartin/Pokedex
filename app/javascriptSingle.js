/*MODO OSCURO/CLARO*/
function showModeDark(){
  const darkMode = document.getElementById('darkMode'); //Metemos la Id del html
  const moonImage = document.querySelector("#moon");
  const sunImage = document.querySelector("#sun");

    darkMode.addEventListener('click', () => { //Aplicamos al elemento del Id cuando hagamos click...
    document.body.classList.toggle('dark');    //Coge la clase dark del Css que esté aparte o directamente en el html, mientras esté indicado en el html

    //GUARDAMOS el MODO en LOCALSTORAGE
    if(document.body.classList.contains('dark')){ //Si contiene activo la clase dark
      moonImage.style.display = "none";
      sunImage.style.display = "block";
      localStorage.setItem('modeDark', 'true');   //Se guarda (set) de forma ('clave','valor'), ponemos true como podría ser otro valor
    }
    else{
      moonImage.style.display = "block";
      sunImage.style.display = "none";
      localStorage.setItem('modeDark','false');   //Si no contiene ponemos false para indicar que no está activo el efecto dark
    }
  });

  //OBTENER el MODO actual
  if(localStorage.getItem('modeDark') === 'true'){ //Coge (get) la clave (modeDark) y comparamos si es igual al valor que marcamos arriba
    document.body.classList.add('dark');           //Metemos el efecto dark del Css
    moonImage.style.display = "none";
    sunImage.style.display = "block";
  }
  else{
    document.body.classList.remove('dark');      //Borramos el efecto dark del Css
    moonImage.style.display = "block";
    sunImage.style.display = "none";
  }
}

/*COGER DATO URL*/
const locationSearchUrl = window.location.search;                //Coge de las direcciones que llevan ?, la parte final de su url
const urlParams = new URLSearchParams(locationSearchUrl);        //Coge window.location.search y lo mete con URLSearchParams
const pokemonId = urlParams.get("id");                           //Coge de la direccion el número de la id
const urlApi = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`; //Coge la direccion con la id del pokemon seleccionamos para poder trabajar con él

/*VARIABLES que conecta con el HTML*/
let namePokemon = document.getElementById("textPokemon"); //textPokemon id del html
let number = document.getElementById("numberPokemon"); 
let typePokemon = document.getElementById("typePokemon"); 
let typeName = "";
let weight = document.getElementById("weightPokemon"); 
let height = document.getElementById("heightPokemon"); 
let live = document.getElementById("live"); 
let liveNum = document.getElementById("liveNum"); 
let attack = document.getElementById("attack"); 
let attackNum = document.getElementById("attackNum"); 
let defense = document.getElementById("defense"); 
let defenseNum = document.getElementById("defenseNum"); 
let attackSpecial = document.getElementById("attackSpecial"); 
let attackSpecialNum = document.getElementById("attackSpecialNum"); 
let defenseSpecial = document.getElementById("defenseSpecial"); 
let defenseSpecialNum = document.getElementById("defenseSpecialNum"); 
let speed = document.getElementById("speed"); 
let speedNum = document.getElementById("speedNum"); 
let evolution1 = document.getElementById("evolution1"); 
let evolution2 = document.getElementById("evolution2"); 
let evolution2Extra = document.getElementById("evolution2Extra"); 
let evolution2Extra1 = document.getElementById("evolution2Extra1"); 
let evolution2Extra2 = document.getElementById("evolution2Extra2"); 
let evolution3 = document.getElementById("evolution3"); 
let trigger0 = document.getElementById("trigger0"); 
let trigger00 = document.getElementById("trigger00"); 
let trigger1 = document.getElementById("trigger1"); 
let trigger2 = document.getElementById("trigger2"); 
let trigger3 = document.getElementById("trigger3"); 

/*ENUMERACIÓN*/
const typeTranslations = { //Traducción -> Tipos - Nombres
  normal:   'Normal',
  fire:     'Fuego',
  water:    'Agua',
  electric: 'Eléctrico',
  grass:    'Planta',
  ice:      'Hielo',
  fighting: 'Lucha',
  poison:   'Veneno',
  ground:   'Tierra',
  flying:   'Volador',
  psychic:  'Psíquico',
  bug:      'Bicho',
  rock:     'Roca',
  ghost:    'Fantasma',
  dragon:   'Dragón',
  dark:     'Siniestro',
  steel:    'Acero',
  fairy:    'Hada'
};

const typeColors = {  //Especificar por Tipos -> Colores
  normal:   '#A8A878',
  fire:     '#F08030',
  water:    '#6890F0',
  electric: '#F8D030',
  grass:    '#78C850',
  ice:      '#98D8D8',
  fighting: '#C03028',
  poison:   '#A040A0',
  ground:   '#E0C068',
  flying:   '#A890F0',
  psychic:  '#F85888',
  bug:      '#A8B820',
  rock:     '#B8A038',
  ghost:    '#705898',
  dragon:   '#7038F8',
  dark:     '#705848',
  steel:    '#B8B8D0',
  fairy:    '#EE99AC'
};

const itemTranslations = {  //Traducción -> Evolución
  water:   'Agua',
  thunder: 'Trueno',
  fire:    'Fuego',
  moon:    'Lunar',
  leaf:    'Hoja',
  level:   'Nivel',
  item:    'Piedra',
  trade:   'Cable Link'
};

//MOSTRAR IMAGEN/REDIRIGIR 
function showPokemonDetails(evolutionXImg, goX, idXEvolution){
    document.getElementById(evolutionXImg).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${idXEvolution}.png`;
    document.getElementById(goX).href = `single.html?id=${idXEvolution}`;
}

//MOSTRAR NIVEL/PIEDRA/LINK de TODOS incluido EEVEE
function showLevelItemTrade(evoluDetailNew, noEvolution, id1Evolution, triggerNew, newEvolu){
  const eevee = ["vaporeon", "jolteon", "flareon"];
  let trigger = [trigger1, trigger2, trigger3];
  eevee.forEach(data =>{ //Recorremos Eevee para mostrar todas las evoluciones que tiene dentro de los 151
    if(newEvolu.species.name == data || evoluDetailNew.trigger.name == "use-item"  && !noEvolution.includes(id1Evolution)){ 
     //Si es Eevee o necesita PIEDRA para evolucionar y no tiene más evoluciones
        trigger.forEach(dato => {         //Recorremos las etiquetas del html del Eevee para introducir cada Eevee en su correspondiente etiqueta Html
        if(newEvolu.species.name == data) //Si es Eevee
        {
          // console.log("Evolución: " + newEvolu.species.name + " " + dato1.trigger.name + " " + itemTranslations[dato1.item.name.slice(0, -6)]);
          dato.innerHTML = itemTranslations[evoluDetailNew.trigger.name.slice(4,8)] + " " + itemTranslations[evoluDetailNew.item.name.slice(0,-6)]; //Piedra + nombreTipo
        }
        else{ //Si es otro que no sea Eeve
          triggerNew.innerHTML = itemTranslations[evoluDetailNew.trigger.name.slice(4,8)] + " " + itemTranslations[evoluDetailNew.item.name.slice(0,-6)]; 
        }
      })
    }
    else if(evoluDetailNew.trigger.name == "trade"  && !noEvolution.includes(id1Evolution)){ //Necesita CABLE LINK para evolucionar y no tiene más evoluciones
      // console.log("1º Forma de evolucionar " + evoluDetailNew.trigger.name.slice(0,5));
      triggerNew.innerHTML = itemTranslations[evoluDetailNew.trigger.name.slice(0,5)]; //Cable Link
    }
    else if(evoluDetailNew.trigger.name == "level-up" && !noEvolution.includes(id1Evolution)){ //Necesita NIVEL para evolucionar y no tiene más evoluciones
      // console.log("1º Forma de evolucionar " + evoluDetailNew.trigger.name.slice(0,5));
      triggerNew.innerHTML = itemTranslations[evoluDetailNew.trigger.name.slice(0,5)] + " " + newEvolu.evolution_details[0].min_level; //Nivel Número
    }
  })   
}

//MOSTRAR POKEMON Y SUS DATOS
function showPokemon(){
  fetch(urlApi) //Pasamos el pokemon específico y mostramos los datos
  .then(response => response.json())
  .then(data => {
  namePokemon.innerHTML = data.name.charAt(0).toUpperCase() + data.name.slice(1); 
  document.getElementById('imagePokemon').src = data.sprites.other.home.front_default;
  number.innerHTML = `#${pokemonId.padStart(3, "0")}`; 
  weight.innerHTML = data.weight/10 + "kg"; //estaba en hectogramo
  height.innerHTML = data.height/10 + "m";  //estaba en decímetro
  live.value = data.stats[0].base_stat;
  liveNum.innerHTML = `${data.stats[0].base_stat}`;
  attack.value = data.stats[1].base_stat;
  attackNum.innerHTML = `${data.stats[1].base_stat}`;
  defense.value = data.stats[2].base_stat;
  defenseNum.innerHTML = `${data.stats[2].base_stat}`;
  attackSpecial.value = data.stats[3].base_stat;
  attackSpecialNum.innerHTML = `${data.stats[3].base_stat}`;
  defenseSpecial.value = data.stats[4].base_stat;
  defenseSpecialNum.innerHTML = `${data.stats[4].base_stat}`;
  speed.value = data.stats[5].base_stat;
  speedNum.innerHTML = `${data.stats[5].base_stat}`;

  //Realizamos un forEach para poder visualizar los diferentes tipos
  data.types.forEach(dato => {
     typeName = dato.type.name; //Metemos los nombres en una variable
     const typePokemonDiv = document.createElement("div"); //Creamos un div y lo metemos en la variable
     //Creamos estilo al div creado, para que se cree un estilo de color diferente según el que toque, para que sea dinámico
     typePokemonDiv.style.cssText = `background-color:${typeColors[typeName]}; color: white; border-radius:10px; text-shadow:-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000; border:solid black 2px`;
     typePokemonDiv.innerHTML = typeTranslations[typeName]; //Metemos en el div el nombre traducido
     typePokemon.appendChild(typePokemonDiv); //Metemos el div creado en el js (div hijo) en el padre (tipo) que está en el html
  })
  //Realizamos un forEach para poder visualizar los diferentes tipos de EVOLUCIÓN
  fetch(data.species.url) //Pasamos el pokemon específico y mostramos los datos
    .then(response => response.json())
    .then(data => {
          fetch(data.evolution_chain.url)
          .then(response => response.json())
          .then(priEvolu => {
            //1º Evolución
            let id1Evolution = parseInt(priEvolu.chain.species.url.substr(42,3)); //Cogemos de la Url del pokemon su Id
            let name1Evolution = priEvolu.chain.species.name;                     //Nombre
            const noEvolution = [83,95,108,114,115,123,127,128,131,132,133,137,142,144,145,146,150,151]; //Pokemons que no tienen más evoluciones
            let evolutionX1Img = 'evolution1Img'; //Id del html que contiene la imagen
            let goX = 'go';                       //Id del html que contiene el enlace al pokemon e ir a la zona específica
            let hitmonleeHitmonchan = [106, 107]; //Id de Hitmonlee y Hitmonchan
            // console.log("1º Evolución: " + name1Evolution + " // Id: " + id1Evolution); 

            if(id1Evolution <= 151){  //Si el id de la 1º Evolución es menor o igual a 151 trabajamos con él
              evolution1.innerHTML = name1Evolution.charAt(0).toUpperCase() + name1Evolution.slice(1); //Nombre
              showPokemonDetails(evolutionX1Img, goX, id1Evolution); //Imagen y dirección
                  if(!noEvolution.includes(id1Evolution) || id1Evolution == 133 ){ //Si tiene más evoluciones o es Eevee, mostramos la flecha
                  document.getElementById('arrow1').src = `./img/arrow.png`; 
                }
            }

            if(pokemonId == hitmonleeHitmonchan[0]){ 
               evolution1.innerHTML = priEvolu.chain.evolves_to[0].species.name.charAt(0).toUpperCase() + priEvolu.chain.evolves_to[0].species.name.slice(1);
               showPokemonDetails(evolutionX1Img, goX, pokemonId);
            }
            else if(pokemonId == hitmonleeHitmonchan[1]){
              evolution1.innerHTML = priEvolu.chain.evolves_to[1].species.name.charAt(0).toUpperCase() + priEvolu.chain.evolves_to[1].species.name.slice(1);
              showPokemonDetails(evolutionX1Img, goX, pokemonId);
            }
            
            //2º Evolución
              priEvolu.chain.evolves_to.forEach(sencEvolu => {
                //1º a 2º
                sencEvolu.evolution_details.forEach(evoluDetail => { 
                  let triggerNew = trigger0;        //Id del elemento del html
                  const sandshrewSandslash = [27,28]; //Sandshrew y Sandslash
                  const vulpixNinetales = [37,38];    //Vulpix y Ninetales
                  const slowpokeSlowbro = [79,80];    //Slowpoke y Slowbro

                  if(id1Evolution == sandshrewSandslash[0] || id1Evolution == sandshrewSandslash[1]){ 
                    // console.log("1º Forma de evolucionar " + evoluDetail.trigger.name.slice(0,5));
                    trigger0.innerHTML = itemTranslations[sencEvolu.evolution_details[0].trigger.name.slice(0,5)] + " " + sencEvolu.evolution_details[0].min_level; //Nivel + Valor
                  }
                  else if(id1Evolution == vulpixNinetales[0] || id1Evolution == vulpixNinetales[1]){ 
                    // console.log("1º Forma de evolucionar " + evoluDetail.trigger.name.slice(4,8));
                    trigger0.innerHTML = itemTranslations[sencEvolu.evolution_details[0].trigger.name.slice(4,8)] + " " + itemTranslations[sencEvolu.evolution_details[0].item.name.slice(0,-6)]; //Piedra + Tipo 
                  }
                  else if(id1Evolution <= 151){
                    showLevelItemTrade(evoluDetail, noEvolution, id1Evolution, triggerNew, sencEvolu);
                  }
                if(id1Evolution == slowpokeSlowbro[0] || id1Evolution == slowpokeSlowbro[1]) 
                {
                  trigger0.innerHTML = itemTranslations[priEvolu.chain.evolves_to[0].evolution_details[0].trigger.name.slice(0,5)] + " " + priEvolu.chain.evolves_to[0].evolution_details[0].min_level; //Nivel + Valor 
                }
          })
          
            let id2Evolution = parseInt(sencEvolu.species.url.substr(42,3));
            const eevee = [134,135,136];
            if(sencEvolu.species.name != null && id2Evolution <= 151 && id2Evolution != eevee[0]  && id2Evolution != eevee[1]  && id2Evolution != eevee[2] && id1Evolution != 236){ 
            //Si el nombre no es nulo Y su Id es menor o igual a 151 Y 236 es el bebe de Hitmonlee y por eso lo ocultamos
                // console.log("2º Evolución: " + sencEvolu.species.name + " // Id: " + id2Evolution); 
                evolution2.innerHTML = sencEvolu.species.name.charAt(0).toUpperCase() + sencEvolu.species.name.slice(1);
                showPokemonDetails('evolution2Img', 'go2', id2Evolution);
            }
            //Si es una evolución de Eevee
            else if(id2Evolution == eevee[0] )
            {
              evolution2Extra.innerHTML = sencEvolu.species.name.charAt(0).toUpperCase() + sencEvolu.species.name.slice(1);
              showPokemonDetails('evolution2Img2', 'go21', id2Evolution);
            }
            else if(id2Evolution == eevee[1] )
            {
              evolution2Extra1.innerHTML = sencEvolu.species.name.charAt(0).toUpperCase() + sencEvolu.species.name.slice(1);
              showPokemonDetails('evolution2ImgExtra1', 'go22', id2Evolution);
            }
            else if(id2Evolution == eevee[2] )
            {
              evolution2Extra2.innerHTML = sencEvolu.species.name.charAt(0).toUpperCase() + sencEvolu.species.name.slice(1);
              showPokemonDetails('evolution2ImgExtra2', 'go23', id2Evolution);
            }

              //3º Evolución
              sencEvolu.evolves_to.forEach(terEvolu => {
                let valor = terEvolu.species.url.substr(42,3);
                //Si no tiene 3º evolución y es menor o igual del id 151 o el número incluya / es decir /numero, que son dos o una cifra -> Para evitar coger evoluciones de otras generaciones
                if(sencEvolu.evolves_to != 0 && valor <= 151 || valor.includes("/")){ 
                  document.getElementById('arrow2').src = `./img/arrow.png`; 
                
                //2º a 3º
                terEvolu.evolution_details.forEach(evoluDetail2 => {
                  if(id2Evolution <= 151){
                    showLevelItemTrade(evoluDetail2, noEvolution, id1Evolution, trigger00, terEvolu);
                  }
                });
              }
              let id3Evolution = parseInt(terEvolu.species.url.substr(42,3));
                //Si el nombre no es nulo y está dentro de los 151
                if(terEvolu.species.name != null && id3Evolution <= 151){
                    // console.log("3º evolución " + terEvolu.species.name + " // Id: " + id3Evolucion);
                    evolution3.innerHTML = terEvolu.species.name.charAt(0).toUpperCase() + terEvolu.species.name.slice(1);
                    showPokemonDetails('evolution3Img', 'go3', id3Evolution);
                }
              });
          });
        });
    });
  })
  //Si se produce un error al obtener los pokemons
  .catch(error => {
    console.error(error);
    container.textContent = "Error en cargar el Pokemon"; //Muestra el error en el html
  });
}
showModeDark();
showPokemon();