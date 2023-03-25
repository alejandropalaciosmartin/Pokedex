// Se utiliza la función 'fetch' para obtener los datos de los Pokémon de la URL definida anteriormente.
fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
  // Cuando los datos han sido recibidos, se convierten a formato JSON.
  .then((response) => response.json())
  // Los datos JSON se pasan como argumento a la siguiente función de callback.
  .then((data) => {
    // Se crea una constante 'pokemon' que almacena los resultados obtenidos de la API.
    const pokemon = data.results;
    // Se obtiene la referencia al elemento HTML con clase 'grid-container' y se almacena en la constante 'container'.
    const container = document.querySelector(".grid-container");
    // Se obtiene la referencia al elemento HTML con ID 'search-input' y se almacena en la constante 'searchInput'.
    const searchInput = document.querySelector("#search-input");

    // Se define una función 'updatePokemonList' que se encarga de actualizar la lista de Pokémon que se muestra en la página.
    const updatePokemonList = () => {
      // Se obtiene el término de búsqueda ingresado por el usuario y se convierte a minúsculas.
      const searchTerm = searchInput.value.toLowerCase();

      // Se eliminan todos los elementos hijos del contenedor de Pokémon.
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }

      // Se filtran los resultados de Pokémon para incluir solo aquellos que coincidan con el término de búsqueda.
      pokemon
        .filter((p) => p.name.toLowerCase().includes(searchTerm))
        .forEach((p) => {
          // Se crea un elemento div para cada Pokémon y se le asigna la clase 'pokemon-card'.
          const card = document.createElement("div");
          card.classList.add("pokemon-card");

          // Se crea un elemento span para el nombre del Pokémon y se le asigna el valor del nombre obtenido de la API.
          const name = document.createElement("span");
          name.textContent = p.name;
          name.style.marginTop = "10px";

          // Se crea un elemento span para el número de identificación del Pokémon y se le asigna un valor formateado.
          const idSpan = document.createElement("span");
          idSpan.textContent = `#${p.url.split("/")[6].padStart(3, "0")}`; // Se obtiene el número del Pokémon de la URL y se convierte a un formato #000
          idSpan.style.fontWeight = "bold";
          idSpan.style.display = "block";
          idSpan.style.textAlign = "center";

          // Se crea un elemento img para la imagen del Pokémon.
          const image = document.createElement("img");
          // Se utiliza la función 'fetch' para obtener los datos de la imagen del Pokémon.
          fetch(p.url)
            // Cuando los datos han sido recibidos, se convierten a formato JSON.
            .then((response) => response.json())
            // Los datos JSON se pasan como argumento a la siguiente función de callback.
            .then((data) => {
              // Se asigna la URL de la imagen al atributo 'src' del elemento img.
              image.src = data.sprites.front_default;
            })
            // Se utiliza el método catch para manejar cualquier error que pueda ocurrir durante el proceso de búsqueda y carga de los datos
            .catch((error) => {
              console.error(error);
            }); // Fin de la llamada a catch

          card.appendChild(name);
          card.appendChild(idSpan); 
          card.appendChild(image);
          
          // Agrega estilos CSS para cada tarjeta
          card.style.display = "flex";
          card.style.flexDirection = "column";
          card.style.justifyContent = "center";
          card.style.width = "225px";
          card.style.height = "275px";
          card.style.border = "1px solid #ddd";
          card.style.borderRadius = "10px";
          card.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.7)";
          card.style.textAlign = "center";
          card.style.backgroundColor = "#c24e4e";
          
          // Agrega la tarjeta a la lista de pokemon
          container.appendChild(card);
        });
    };

    // Agrega un event listener para actualizar la lista de pokemon cuando el usuario escriba en el campo de búsqueda
    searchInput.addEventListener("input", updatePokemonList);
 
    // Actualiza la lista de pokemon por defecto
    updatePokemonList();

    // Agrega una tarjeta para cada pokemon sin filtrar (para los estilos CSS)
    pokemon.forEach((pokemon, index) => {
      const card = document.createElement("div");
      card.classList.add("pokemon-card");

      const image = document.createElement("img");
      const imageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`;
      image.src = imageURL;
      card.appendChild(image);

      const name = document.createElement("span");
      name.textContent = pokemon.name;

      const idSpan = document.createElement("span");
      idSpan.textContent = `#${index + 1}`; 
      idSpan.style.fontWeight = "bold";
      idSpan.style.display = "block";
      idSpan.style.textAlign = "center";

      card.appendChild(name);
      card.appendChild(idSpan);

      container.appendChild(card);
    });
  })
  .catch((error) => {
    console.error(error);
  });