//const apiButton = document.getElementById('apiBoton'); //Seleccionamos el html y metemos variable para trabajar con él
/*const apiData = document.getElementById('apiData');
const baseExp = document.getElementById('baseExp');

const callAPI = () => { //Creamos función que asignaremos al botón luego
    // alert("Llama API")
    fetch('https://pokeapi.co/api/v2/pokemon/pikachu') //metemos la dirección API
        .then(res => res.json()) //Entonces lo pasamos a JSON para trabajar con la información que nos llega
        //.then(data => console.log(data)); //Entonces el dato que nos llega y transformado a json lo pasamos a console para verlo
        .then(data => {
            apiData.innerText = JSON.stringify(data.name); //funciona si es un solo pokemon -> pokemon/pikachu
            apiData.innerText += data.name; //sin comillas
            baseExp.innerText =`Experiencia ${JSON.stringify(data.base_experience)}` //mirar diferencia con innerHtml
        })
        .catch(e => console.error(new Error(e)));
}

callAPI();*/
//apiButton.addEventListener('click', callAPI); //Aplicamos al botón la función al hacer click

let container = document.querySelector(".pokemons");

const urlPokeApi = "https://pokeapi.co/api/v2/pokemon/";

//Coge el CONJUNTO de TODOS los pokemons
const getPokemons = (url) => {
    fetch(url)
        .then(resp => resp.json())
        .then(data => {
            console.log(data); //Muestra todos los pokemons con su url y nombre solo
            showPokemons(data.results); //Muestra todos los pokemons pero con sus especificaciones
        })
}

//Coge TODOS los pokemons pero por SEPARADO
const showPokemons = (array) => {
    array.map(item => { //filtramos el resultado
        fetch(item.url) //Cogemos el enlace de cada pokemon
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            loadCard(data);
        })
        
    })
}

const loadCard = (data) => {
    const imagen = data.sprites.other.home.front_default;
    const name = data.name;

    let card = document.createElement("div");
    //especifico es la otra web, le pasamos nombre e id
    let content = `
    <a href ="especifico.html?id=${data.id}&name=${data.name}">  
        <img src="${imagen}" alt="${name}" width="100px">
    </a>
        <p>${name}</p>
        <p>${data.id}</p>
   
    `;
    card.innerHTML = content;
    container.appendChild(card);
}

      

getPokemons(`${urlPokeApi}?offset=0&limit=151`)


