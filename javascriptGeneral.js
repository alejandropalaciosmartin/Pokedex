const apiURL = "https://pokeapi.co/api/v2/";
const pokemonURL = apiURL + "pokemon?limit=151";

fetch(pokemonURL)
  .then((response) => response.json())
  .then((data) => {
    const pokemon = data.results;
    const container = document.querySelector(".grid-container");
    
    // Iterar sobre los datos de los Pokemon y construir una tarjeta de Pokemon para cada uno
    pokemon.forEach((pokemon, index) => {
        
      const card = document.createElement("div");
      card.classList.add("pokemon-card");
      
      const image = document.createElement("img");
      const imageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`;
      image.src = imageURL;
      card.appendChild(image);

      const name = document.createElement("h2");
      name.textContent = pokemon.name;
      card.appendChild(name);
      
      container.appendChild(card);
    });
  })
  .catch((error) => {
    console.error(error);
  });