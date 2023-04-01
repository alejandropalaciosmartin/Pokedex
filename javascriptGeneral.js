window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
}

// Cuando se hace clic en el botón, se desplaza hacia arriba hasta la parte superior de la página
function topFunction() {
  document.body.scrollTop = 0; // Para Safari
  document.documentElement.scrollTop = 0; // Para Chrome, Firefox, IE y Opera
}



const toggleModeButton = document.querySelector("#claroscuro");
const lunaImage = document.querySelector("#luna");
const solImage = document.querySelector("#sol");


toggleModeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  toggleModeButton.classList.toggle('active');

  // Actualizamos la imagen del botón
  if (document.body.classList.contains("dark-mode")) {
    lunaImage.style.display = "none";
    solImage.style.display = "block";
    localStorage.setItem('modeDark', 'true');
  } else {
    lunaImage.style.display = "block";
    solImage.style.display = "none";
    localStorage.setItem('modeDark','false');
  }

  //Obtener el modo actual
if(localStorage.getItem('modeDark') === 'true'){ //Coge (get) la clave (modeDark) y comparamos si es igual al valor que marcamos arriba
                                                 //en este caso true, podría ser otro, depend elo que pusimos arriba
   document.body.classList.add('dark-mode');  //Metemos el efecto dark del archivo .css
   modoOscuro.classList.add('active');   //Añadimos también que está activo
}
else{
    document.body.classList.remove('dark-mode'); //Borramos el efecto dark del archivo .css
    modoOscuro.classList.remove('active');  //Borramos el efecto que indica que esta activo, para que se vea que no lo esta ya
}

  // Actualizamos el estilo de las tarjetas de Pokémon
  const pokemonCards = document.querySelectorAll(".pokemon-card");
  pokemonCards.forEach((card) => {
    card.style.backgroundColor = document.body.classList.contains("dark-mode") ? "#666" : "#f1f1f1";
    card.querySelector(".name").style.color = document.body.classList.contains("dark-mode") ? "#fff" : "#000";
    card.querySelector("span:nth-of-type(2)").style.color = document.body.classList.contains("dark-mode") ? "#fff" : "#000";
  });
});




fetch("https://pokeapi.co/api/v2/pokemon?limit=151") 
  .then(response => response.json())
  .then(data => {
    const pokemon = data.results; 
    const container = document.querySelector(".grid-container");
    const searchInput = document.querySelector("#search-input");
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
    const updatePokemonList = () => {
      const searchTerm = searchInput.value.toLowerCase();
      container.innerHTML = '';
      pokemon.filter(p => p.name.toLowerCase().includes(searchTerm))
        .forEach(p => {
          const card = document.createElement("div");
          card.classList.add("pokemon-card");
          card.classList.add("mover");
          card.innerHTML = `
            <span class="name" style="margin-top: 10px; text-align:center; font-size: 18px;">${p.name.charAt(0).toUpperCase() + p.name.slice(1)}</span>
            <span style="font-weight:bold; display:block; text-align:center;">#${p.url.split("/")[6].padStart(3, "0")}</span>
            <img src="" class="mover">
            <div class="types" style="display:flex; justify-content:center;"></div>`;
          card.style.cssText = "cursor: pointer; display:flex; flex-direction:column; justify-content:center; width:250px; height:350px; border:1px solid #ddd; border-radius:10px; background-color:#f1f1f1;";
          
          card.addEventListener('click', () => { window.location.href = `especifico.html?id=${p.url.split("/")[6]}`; });
                 
          fetch(p.url)
            .then(response => response.json())
            .then(data => {
              card.querySelector('img').src = data.sprites.other.home.front_default;
              const typesContainer = card.querySelector('.types');
              data.types.forEach(type => {
                const typeName = type.type.name;
                const typeElement = document.createElement('div');
                typeElement.textContent = typeTranslations[typeName];
                typeElement.style.cssText = `background-color:${typeColors[typeName]}; color:white; padding:5px 10px; border-radius:10px; margin-right:5px; text-shadow:-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000; border:solid black 2px`;
                typesContainer.appendChild(typeElement);
              });
            })
            .catch(error => console.error(error));
          container.appendChild(card);
        });
    };
    searchInput.addEventListener("input", updatePokemonList);
    updatePokemonList();
  });