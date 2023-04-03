window.onscroll = function() {
  const myBtn = document.getElementById("myBtn");
  myBtn.style.display = (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) ? "block" : "none"; };
function topFunction() {
  document.documentElement.scrollTop = 0; }

const toggleModeButton = document.querySelector("#claroscuro");
const lunaImage = document.querySelector("#luna");
const solImage = document.querySelector("#sol");


toggleModeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark_mode");
  document.querySelector(".pokemon_card").classList.toggle("dark_mode");
  toggleModeButton.classList.toggle('active');

  if (document.body.classList.contains("dark_mode")) {
    lunaImage.style.display = "none";
    solImage.style.display = "block";
    localStorage.setItem('modeDark', 'true'); } 
  else {
    lunaImage.style.display = "block";
    solImage.style.display = "none";
    localStorage.setItem('modeDark','false'); }

  if(localStorage.getItem('modeDark') == 'true'){
    document.body.classList.add('dark_mode');
    toggleModeButton.classList.add('active'); }
else{
    document.body.classList.remove('dark_mode');
    toggleModeButton.classList.remove('active'); }
 
  const pokemonCards = document.querySelectorAll(".pokemon_card");
  pokemonCards.forEach((card) => {
  card.style.backgroundColor = document.body.classList.contains("dark_mode") ? "#666" : "#f1f1f1";
  card.querySelector(".name").style.color = document.body.classList.contains("dark_mode") ? "#fff" : "#000";
 card.querySelector("span:nth-of-type(2)").style.color = document.body.classList.contains("dark_mode") ? "#fff" : "#000";
  });
});


fetch("https://pokeapi.co/api/v2/pokemon?limit=151") 
  .then(response => response.json())
  .then(data => {
    const pokemon = data.results; 
    const container = document.querySelector(".grid-container");
    const searchInput = document.querySelector("#search-input");
    const typeColors = {
      normal: '#A8A878',  fire: '#F08030',  water: '#6890F0',
      electric: '#F8D030',  grass: '#78C850',  ice: '#98D8D8',
      fighting: '#C03028',  poison: '#A040A0',  ground: '#E0C068',
      flying: '#A890F0',  psychic: '#F85888',  bug: '#A8B820',
      rock: '#B8A038',  ghost: '#705898',  dragon: '#7038F8',
      dark: '#705848',  steel: '#B8B8D0',  fairy: '#EE99AC'
    };
    const typeTranslations = {
      normal: 'normal',  fire: 'fuego',  water: 'agua',
      electric: 'eléctrico',  grass: 'planta',  ice: 'hielo',  
      fighting: 'lucha',  poison: 'veneno',  ground: 'tierra',
      flying: 'volador',  psychic: 'psíquico',  bug: 'bicho',  
      rock: 'roca',  ghost: 'fantasma',  dragon: 'dragón',
      dark: 'siniestro',  steel: 'acero',  fairy: 'hada'
    };
    const updatePokemonList = () => {
      const searchTerm = searchInput.value.toLowerCase();
      container.innerHTML = '';
      pokemon.filter(p => p.name.toLowerCase().includes(searchTerm))
        .forEach(p => {
          const card = document.createElement("div");
          card.classList.add("pokemon_card");
          card.innerHTML = `
            <span class="name">${p.name.charAt(0).toUpperCase() + p.name.slice(1)}</span>
            <span class="numero">#${p.url.split("/")[6].padStart(3, "0")}</span>
            <img src="">
            <div class="types"></div>`;
          
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