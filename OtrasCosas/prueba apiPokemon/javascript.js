
let container = document.querySelector(".pokemons"); //Seleccionamos clase DONDE se MOSTRARÁ

const urlPokeApi = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=151`;

//Coge el CONJUNTO de TODOS los pokemons
const getPokemons = (url) => { //coge la url la urlPokeApi de getPokemons de abajo
    fetch(url) //Cogemos para trabajar con la API la urlPokeApi
        .then(resp => resp.json()) //Transformamos en json para poder trabajar
        .then(data => {
            console.log(data); //Muestra todos los pokemons con su url y nombre solo
            
            showPokemons(data.results); //results -> Lo mandamos a showPokemons para mostrar todos los pokemons pero con sus especificaciones
            
            const searchInput = document.querySelector("#SearchInput");
            const updatePokemonList = () => {
            const searchTerm = searchInput.value.toLowerCase();

     //LIMPIA LA PANTALLA
     //Mientras tenga 1º hijo container 
      while (container.firstChild) { 
        container.removeChild(container.firstChild); //Borra el 1º hijo de container
      }

      data.results
        .filter((p) => p.name.toLowerCase().includes(searchTerm))
        .forEach((p) => {
          
          const card = document.createElement("div");
          const name = document.createElement("span");
          name.textContent = p.name;
          const idSpan = document.createElement("span");
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
        
          container.appendChild(card);
        });
    };

    searchInput.addEventListener("input", updatePokemonList);
 
    updatePokemonList();

    
  })
  .catch((error) => {
    console.error(error);
  });

        
}

//Coge TODOS los pokemons pero por SEPARADO
const showPokemons = (dataResults) => { //Cogemos el resultado de getPokemons
    dataResults.map(item => { //Filtramos el resultado
        fetch(item.url) //url -> Cogemos el enlace de cada pokemon
        .then(resp => resp.json()) 
        .then(data => {
            console.log(data);
            loadCard(data);
        })
    })
}

const loadCard = (data) => {
    const imagen = data.sprites.other.home.front_default; //Metemos imagen
    const name = data.name;

    let card = document.createElement("div"); //CREAMOS div para poder mostrarlos, puede ser p u otro
    //especifico es la otra web, le pasamos nombre e id
    //CONTENIDO que se MOSTRARÁ
    let content = `
    <a href ="especifico.html?id=${data.id}&name=${data.name}">  
        <img src="${imagen}" alt="${name}" width="100px">
    </a>
        <p>${name}</p>
        <p>${data.id}</p>
   
    `;
    
    card.innerHTML = content; //METEMOS el contenido en el div/contenedor
    container.appendChild(card); //METEMOS todo lo GENERADO en la ETIQUETA relacionada
}

getPokemons(urlPokeApi) //offset comienzo, limit cantidad que coge



