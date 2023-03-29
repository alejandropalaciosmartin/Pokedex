
let container = document.querySelector(".pokemons"); //Seleccionamos clase DONDE se MOSTRARÁ

const urlPokeApi = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=151`;

//Coge el CONJUNTO de TODOS los pokemons
const getPokemons = (url) => { //coge la url la urlPokeApi de getPokemons de abajo
    fetch(url) //Cogemos para trabajar con la API la urlPokeApi
        .then(resp => resp.json()) //Transformamos en json para poder trabajar
        .then(data => {
            console.log(data); //Muestra todos los pokemons con su url y nombre solo
            
            showPokemons(data.results); //results -> Lo mandamos a showPokemons para mostrar todos los pokemons pero con sus especificaciones
            
            //BÚSQUEDA - Botón, COGE valor
            const searchInput = document.querySelector("#SearchInput");
            const updatePokemonList = () => {
            const searchTerm = searchInput.value.toLowerCase(); //pasamos a minúscula lo que escribimos en la búsqueda

            //BÚSQUEDA - LIMPIA la pantalla
            //Mientras tenga 1º hijo container 
              while (container.firstChild) { 
                container.removeChild(container.firstChild); //Borra el 1º hijo de container
              }

              //BÚSQUEDA - COMPARA el valor del cuadro con la Api
              data.results
                .filter((dato) => dato.name.toLowerCase().includes(searchTerm)) //includes -> Determina si el valor(searchTerm) está en dato.name
                                                                                //si buscaramos por otra cosa es cambiar name por otro de la api
              
                //BÚSQUEDA - Por CADA DATO que coincida CREA como se va a ver                                                          
                .forEach((dato) => {
                  
                  //BÚSQUEDA - CREA como se va a ver
                  const card = document.createElement("div");
                  const name = document.createElement("span");
                  name.textContent = dato.name;
                  const idSpan = document.createElement("span");
                  const image = document.createElement("img");
                  
                  //BÚSQUEDA - COGEMOS el valor URL de la API
                  fetch(dato.url)
                    .then((response) => response.json())
                    .then((data) => {
                      //BÚSQUEDA - GUARDAMOS la dirección de la imagen en imagen, en el atributo src
                      image.src = data.sprites.other.home.front_default;
                    })
                    .catch((error) => {
                      console.error(error);
                    });

                  //BÚSQUEDA - METEMOS los VALORES de ETIQUETA (span, span, img) dentro del div
                  card.appendChild(name); //span
                  card.appendChild(idSpan); //span
                  card.appendChild(image); //img
                
                  //BÚSQUEDA - METEMOS el VALOR de card en container, que es donde irá a mostrar en el html (clase .pokemons)
                  container.appendChild(card); 
        });
    };

    //BÚSQUEDA - Escucha cuando introducimos (input) lo detecte al momento de teclear y llama al método para ir buscando según vamos 
    //introduciendo 
    searchInput.addEventListener("input", updatePokemonList);
 
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



