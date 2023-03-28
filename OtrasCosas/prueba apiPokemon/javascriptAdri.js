const pokemonDetailsContainer = document.getElementById("pokemon-details");
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const pokemonName = urlParams.get("name");

      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => response.json())
        .then(data => {
          pokemonDetailsContainer.innerHTML = `
            <h2>${data.name}</h2>
            <img src="${data.sprites.other.home.front_default}" alt="${data.name}" />
            <p>Height: ${data.height} | Weight: ${data.weight}</p>
          `;
        })
        .catch(error => {
          console.error(error);
          pokemonDetailsContainer.textContent = "Error loading Pokémon details";
        });

















/*const pokemonContainer = document.querySelector('.pokemonContainer'); //Metemos en el Container del div creado en el html

//Coge TODOS los pokemons que queremos
function takeAll(number){
  for(let i = 1; i <= number; i++){
    takePokemon(i);
  }
}
// takeAll(150);
takeAll(5);

//Coge DATOS de CADA POKEMON
function takePokemon(id){
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(resp => resp.json())
    .then(datoPokemon => console.log(datoPokemon))
    .then(datoPokemon => { 
      createPokemons(datoPokemon) 
    });
  }
  // takePokemon(1);

//ESPECIFICA los DATOS de CADA pokemon
function createPokemons(pokemon){
  const card = document.createElement('div');

  const name = document.createElement('p');
  name.textContent = pokemon.name;

  card.appendChild(name); //Agregamos a la carta de arriba el nombre

  pokemonContainer.appendChild(card); //Metemos la tarjeta en el Container del div del html creado
}

     


  // card.classList.add('xS');

  //const spriteContainer = document.createElement('div');
  /* spriteContainer.classList.add('x');

  const sprite = document.createElement('img');
  sprite.src = pokemon.sprites.front_default

  spriteContainer.appendChild(sprite);
  
  card.appendChild(spriteContainer);

  */






/*Si clicamos en el botón del sol, borrarémos la clase css modoOscuro del div 
con id modo y se aplicará el estilo modoClaro al sol*/
/*document.getElementById('sol').onclick = function(){
  document.getElementById('modo').classList.remove('modoOscuro')
//   document.getElementById('luna').classList.remove('modoClaro')
  this.classList.add('modoClaro')
}
/*Si clicamos en el botón de la luna, añadiremos la clase css modoOscuro del div 
con id modo y se aplicará el estilo modoClaro a la luna*/
/*document.getElementById('luna').onclick = function(){
  document.getElementById('modo').classList.add('modoOscuro')
//   document.getElementById('sol').classList.remove('modoClaro')
  this.classList.add('modoOscuro')
}*/

/*CAMBIAR THIS POR ALGO, POR ESO NO FUNCIONA */

/*fetch ("https://pokeapi.co/api/v2/pokemon/pikachu")
        .then(response => response.json())
        .then(datoPokemon => document.getElementById("demo").innerHTML = getDatos(datoPokemon));

        function getDatos(pokemon){
            return '<img src=\"'+pokemon.sprites.front_default+'\"/>';*/
       // }//pokemon.other.dream_world.front_default
