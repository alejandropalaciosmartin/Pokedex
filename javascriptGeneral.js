window.onscroll = function() {
  const myBtn = document.getElementById("myBtn");
  myBtn.style.display = (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) ? "block" : "none"; };
  
function topFunction() {
  document.documentElement.scrollTop = 0; }

  const toggleModeButton = document.querySelector("#lightDark");
  const moonImage = document.querySelector("#moon");
  const sunImage = document.querySelector("#sun");

  toggleModeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark_mode");
    document.querySelector(".pokemon_card").classList.toggle("dark_mode");

    if (document.body.classList.contains("dark_mode")) {
      moonImage.style.display = "none";
      sunImage.style.display = "block";
      localStorage.setItem('modeDark', 'true'); } 
    else {
      moonImage.style.display = "block";
      sunImage.style.display = "none";
      localStorage.setItem('modeDark','false'); }
});
if(localStorage.getItem('modeDark') == 'true'){
  document.body.classList.add('dark_mode');
  moonImage.style.display = "none";
  sunImage.style.display = "block";
}
else{
  document.body.classList.remove('dark_mode');
  moonImage.style.display = "block";
  sunImage.style.display = "none";
}

 fetch("https://pokeapi.co/api/v2/pokemon?limit=151") 
 .then(response => response.json())
 .then(data => {
   const pokemon = data.results; 
   const container = document.querySelector(".grid-container");
   container.style = "justify-content:center;alight-item:center;";
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
           <span class="number">#${p.url.split("/")[6].padStart(3, "0")}</span>
           <img src="">
           <div class="types"></div>`;

         card.addEventListener('click', () => { window.location.href = `single.html?id=${p.url.split("/")[6]}`; });
               
         fetch(p.url)
           .then(response => response.json())
           .then(data => {
             card.querySelector('img').src = data.sprites.other.home.front_default;
             const typesContainer = card.querySelector('.types');
             data.types.forEach(typeData => {
               const typeName = typeData.type.name;
               const typeElement = document.createElement('div');
               typeElement.textContent = typeTranslations[typeName];
               typeElement.style.cssText = `background-color:${typeColors[typeName]}; color:white; padding:5px 10px; border-radius:10px; margin-right:5px; text-shadow:-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000; border:solid black 2px`;
               typesContainer.appendChild(typeElement);
              });
           })
          container.appendChild(card);
       });
    };
   searchInput.addEventListener("input", updatePokemonList);
   updatePokemonList();
 });