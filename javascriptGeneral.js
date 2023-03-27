fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
  .then((response) => response.json())
  .then((data) => {
    const pokemon = data.results;
    const container = document.querySelector(".grid-container");
    const searchInput = document.querySelector("#search-input");
    const updatePokemonList = () => {
      const searchTerm = searchInput.value.toLowerCase();

      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }

      pokemon
        .filter((p) => p.name.toLowerCase().includes(searchTerm))
        .forEach((p) => {
          
          const card = document.createElement("div");
          card.classList.add("pokemon-card");

          const name = document.createElement("span");
          name.textContent = p.name;
          name.style.marginTop = "10px";

          const idSpan = document.createElement("span");
          idSpan.textContent = `#${p.url.split("/")[6].padStart(3, "0")}`;
          idSpan.style.fontWeight = "bold";
          idSpan.style.display = "block";
          idSpan.style.textAlign = "center";

          const image = document.createElement("img");
          
          fetch(p.url)
            .then((response) => response.json())
            .then((data) => {
              image.src = data.sprites.other.home.front_default;
            })
            .catch((error) => {
              console.error(error);
            });

          card.appendChild(name);
          card.appendChild(idSpan); 
          card.appendChild(image);
          
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
          
          container.appendChild(card);
        });
    };

    searchInput.addEventListener("input", updatePokemonList);
 
    updatePokemonList();

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