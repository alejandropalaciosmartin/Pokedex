//const apiButton = document.getElementById('apiBoton'); //Seleccionamos el html y metemos variable para trabajar con él
const apiData = document.getElementById('apiData');
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

callAPI();
//apiButton.addEventListener('click', callAPI); //Aplicamos al botón la función al hacer click
