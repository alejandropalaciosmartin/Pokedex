fetch("https://pokeapi.co/api/v2/pokemon?limit=151") // Obtener los primeros 151 Pokémon de la PokéAPI
  .then(response => response.json())
  .then(data => {
    const pokemon = data.results; // Almacenar el array de objetos Pokémon en una variable
    // Obtener referencias al elemento contenedor y al elemento de entrada de búsqueda
    const container = document.querySelector(".grid-container");
    const searchInput = document.querySelector("#search-input");
    // Definir un objeto para almacenar los colores de fondo para cada tipo de Pokémon
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
    // Definir un objeto para almacenar las traducciones al español para cada tipo de Pokémon
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
    // Definir una función para actualizar la lista de Pokémon
    const updatePokemonList = () => {
      // Obtener el término de búsqueda del elemento de entrada y convertirlo a minúsculas
      const searchTerm = searchInput.value.toLowerCase();
      // Limpiar el contenido del elemento contenedor
      container.innerHTML = '';
      // Filtrar el array de Pokémon para incluir solo aquellos cuyo nombre incluye el término de búsqueda
      pokemon.filter(p => p.name.toLowerCase().includes(searchTerm))
        // Iterar sobre cada Pokémon en el array filtrado
        .forEach(p => {
          // Crear un nuevo elemento div para representar la tarjeta del Pokémon
          const card = document.createElement("div");
          card.classList.add("pokemon-card");
          // Establecer el contenido HTML de la tarjeta con los datos del Pokémon
          card.innerHTML = `
            <span class="name" style="margin-top: 10px; text-align:center; font-size: 18px;">${p.name.charAt(0).toUpperCase() + p.name.slice(1)}</span>
            <span style="font-weight:bold; display:block; text-align:center;">#${p.url.split("/")[6].padStart(3, "0")}</span>
            <img src="">
            <div class="types" style="display:flex; justify-content:center;"></div>
          `;
          // Establecer los estilos CSS de la tarjeta
          card.style.cssText = "display:flex; flex-direction:column; justify-content:center; width:250px; height:350px; border:1px solid #ddd; border-radius:10px; background-color:#f1f1f1;";
          // Obtener los datos detallados del Pokémon de la PokéAPI
          fetch(p.url)
            .then(response => response.json())
            .then(data => {
              // Establecer la fuente de la imagen en la tarjeta con la imagen del Pokémon
              card.querySelector('img').src = data.sprites.other.home.front_default;
              // Obtener una referencia al elemento contenedor de tipos en la tarjeta
              const typesContainer = card.querySelector('.types');
              // Iterar sobre cada tipo del Pokémon
              data.types.forEach(type => {
                // Obtener el nombre del tipo en inglés
                const typeName = type.type.name;
                // Crear un nuevo elemento div para representar el tipo del Pokémon
                const typeElement = document.createElement('div');
                // Establecer el contenido de texto del elemento con la traducción al español del nombre del tipo
                typeElement.textContent = typeTranslations[typeName];
                // Establecer los estilos CSS del elemento para mostrarlo como una caja con esquinas redondeadas y texto blanco con borde negro
                typeElement.style.cssText = `background-color:${typeColors[typeName]}; color:white; padding:5px 10px; border-radius:10px; margin-right:5px; text-shadow:-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000; border:solid black 2px`;
                // Agregar el elemento de tipo al contenedor de tipos en la tarjeta
                typesContainer.appendChild(typeElement);
              });
            })
            .catch(error => console.error(error));
          // Agregar la tarjeta al elemento contenedor
          container.appendChild(card);
        });
    };
    // Agregar un controlador de eventos al elemento de entrada para actualizar la lista de Pokémon cuando cambie su valor
    searchInput.addEventListener("input", updatePokemonList);
    // Llamar a la función updatePokemonList para actualizar inicialmente la lista de Pokémon
    updatePokemonList();
  });