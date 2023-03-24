const urlPokeApi = "https://pokeapi.co/api/v2/pokemon/"; //Para tener la dirección en una variable
// const urlPokeApi = "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20"; //Coger los siguientes 20 pokemons
const main = document.querySelector("main");//Seleccionamos la etiqueta de destino

//Coge TODOS los pokemons que queremos NO HACE NADA...MEJORAR PARA MOSTRAR TODOS
async function takeAll(url){ 
       // fetch(url)//Cogemos la dirección API para trabajar con ella
       // .then(resp => resp.json()) //La API la pasamos a json para poder trabajar con ella
        //.then(resp => console.log(resp)) //Vemos la información de la API en consola
    //   takePokemon(i);
    try{
        let res = await fetch(url), //Coge la información de la url, ponemos , y no ; porque continúa abajo
        json = await res.json();    //y lo pasa a json en esta línea
        template = ""; //Donde concatenaremos luego el html para mostrar luego


        //console.log(json); //APARECE los 20 PRIMEROS pokemons

        if(!res.ok) throw{status:res.status,statusText: statusText} //Si la respuesta de la API no (!) es ok(es la respuesta que da el
                                                                    //servidor), lanza error guardando en las variables status y 
                                                                    //statusText el estado para informar

        for(let i = 0; i < json.results.length; i++){ //se usa for porque es bloqueante y podemos ir cogiendo y analizando cada paso, con 
                                                      //foreach lo coge del tirón tal como recibe
            //console.log(json.results[i]); //APARECE de CADA pokemon su NOMBRE y URL (donde contiene el resto de información), nada más
            try{
                let res = await fetch(json.results[i].url), //cogemos de la api el json creado al principio, de ese json de la url
                                                            //especificamos que queremos coger el results que aparece en la API pero de cada
                                                            //iteracción/pokemon de la API con [i] y cogemos su dirección específica con .url
                                                            //que aparece también en la API
                pokemon = await res.json(); //Metemos todo lo anterior en un json y lo almacenamos en la variable pokemon

                console.log(res,pokemon); //resp nos indica si ha sido correcto el coger el dato
                                          //pokemon nos APARECE TODA la INFORMACIÓN de CADA pokemon
            if(!res.ok) throw{status:res.status,statusText: statusText}

            //Vamos llenando el html con cada interacción
            template += ` 
            <div>
                <imgsrc="${pokemon.sprites.front_default}></img>
                <p>${pokemon.name}</p>
            </div>
            `; 
            
            }
            catch(err){
                console.log(err);
                let message = err.statusText || "Ocurrió un error"; 
                template +=`
                <figure>
                    <img src="PONER DIRECCION DE LA IMAGEN EN BLANCO" alt="${err.status}:${message}">
                    <figcaption>Error ${err.status}:${message}</figcaption>
                </figure>
                `;
            }
        }
        main.innerHTML += template;
        main.innerHTML += "xx";
    }
    catch(err){
        console.log(err);
        let message = err.statusText || "Ocurrió un error"; //Cogemos statusText del if de arriba, || significa que si viene vacío el error
                                                            //mostramos el mensaje personalizado ("Ocurrió un error") si no viene vacío
                                                            //muestra el mensaje que mande gracias a statusText y lo guardamos en la variable 
                                                            //message
        main.innerHTML = `<p>Error ${err.status}:${message}</p>`; //Muestra el estado del error que nos manda y el mensaje (message) personalizado 
                                                                  //o de la API u otro mandado, según arriba manipulado
    }
}

document.addEventListener("DOMContentLoaded",e=>takeAll(urlPokeApi)); //Donde se va a cargar todo








/*
  // takeAll(150);
  takeAll(9);

//Coge DATOS de CADA POKEMON
function takePokemon(id){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(resp => resp.json())
    .then(datoPokemon => console.log(datoPokemon))
    //   .then(datoPokemon => { 
        //     createPokemons(datoPokemon) 
        //   });
    .then(dato => document.getElementById("demo").innerHTML = getDato(dato));
}
    takePokemon(1);
    //takePokemon(253);


function getDato(pokemon){
    return "<h1>" + pokemon.name + "</h1>";
}*/
