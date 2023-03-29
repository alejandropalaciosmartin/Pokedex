fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
  .then(response => response.json())
  .then(data => {
    const pokemon = data.results;
    const container = document.querySelector(".grid-container");
    const searchInput = document.querySelector("#search-input");
    const updatePokemonList = () => {
      const searchTerm = searchInput.value.toLowerCase();
      container.innerHTML = '';
      pokemon.filter(p => p.name.toLowerCase().includes(searchTerm))
        .forEach(p => {
          const card = document.createElement("div");
          card.classList.add("pokemon-card");
          card.innerHTML = `
            <span style="margin-top: 10px; text-align: center;">${p.name}</span>
            <span style="font-weight: bold; display: block; text-align: center;">#${p.url.split("/")[6].padStart(3, "0")}</span>
            <img src="">
            <div class="types" style="display: flex; justify-content: center;"></div>
          `;
          card.style.cssText = "display: flex; flex-direction: column; justify-content: center; width: 225px; height: 325px; border: 1px solid #ddd; border-radius: 10px; background-color: #f1f1f1;";
          fetch(p.url)
            .then(response => response.json())
            .then(data => {
              card.querySelector('img').src = data.sprites.other.home.front_default;
              const typesContainer = card.querySelector('.types');
              data.types.forEach(type => {
                const typeElement = document.createElement('img');
                typeElement.src = `./img/tiposPokemon/${type.type.name}.png`;
                typeElement.style.cssText = "width: 30px; height: 30px; margin: 5px;";
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