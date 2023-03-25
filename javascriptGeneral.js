const apiURL = "https://pokeapi.co/api/v2/";
const pokemonURL = apiURL + "pokemon?limit=151";

fetch(pokemonURL)
  .then((response) => response.json())
  .then((data) => {
    const pokemon = data.results;
    const container = document.querySelector(".grid-container");
    const searchInput = document.querySelector("#search-input");
    
    // Función que actualiza la lista de Pokémon en función del término de búsqueda
    const updatePokemonList = () => {
      const searchTerm = searchInput.value.toLowerCase();
    
    // Elimina los Pokémon actuales del contenedor
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    // Filtra los Pokémon que coinciden con el término de búsqueda y construye una tarjeta de Pokémon para cada uno
        pokemon
          .filter((p) => p.name.toLowerCase().includes(searchTerm))
          .forEach((p) => {
            const card = document.createElement("div");
            card.classList.add("pokemon-card");
            
            const name = document.createElement("h2");
            name.textContent = p.name;
            card.appendChild(name);

            const image = document.createElement("img");
            fetch(p.url)
              .then((response) => response.json())
              .then((data) => {
                image.src = data.sprites.front_default;
              })
              .catch((error) => {
                console.error(error);
              });
            card.appendChild(image);

            // Agregar estilos CSS para centrar la tarjeta
            card.style.display = "flex";
            card.style.flexDirection = "column";
            card.style.justifyContent = "center";
            card.style.width = "200px";
            card.style.height = "250px";
            card.style.border = "1px solid #ddd";
            card.style.borderRadius = "10px";
            card.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.2)";
            card.style.textAlign = "center";

            container.appendChild(card);
          });
      };

      // Actualiza la lista de Pokémon cuando se cambia el término de búsqueda
      searchInput.addEventListener("input", updatePokemonList);

      // Construye la lista de Pokémon inicial
      updatePokemonList();

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
