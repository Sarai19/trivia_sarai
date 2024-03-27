
const botonIniciar = document.getElementById("btnIniciar");
const botonCancelar = document.getElementById("btnCancelar");
const contenedorPreguntas = document.getElementById("preguntas");
const botonResultado = document.getElementById("btnResultado");
const sumaFinal = document.getElementById("resultadoFinal");
const selectorCategoria = document.getElementById("selectorCategoria");
const selectorDificultad = document.getElementById("selectorDificultad");
const selectorTipo = document.getElementById("selectorTipo");
 

//fetch me permite consultar las respuestas
function obtenerPreguntas(endPoint) {
  fetch(endPoint)
    //aquì se maneja la respuesta
    .then((response) => {
      console.log(response);
      return response.json(); //promesa
    })
    .then((preguntas) => {
      console.log(preguntas);
      preguntas.results.forEach((element) => {
        //console.log(element.question);
        //Procesar Preguntas

        const respuestaCorrecta =element.correct_answer;



        const arregloRespuestas = [
          element.correct_answer,
          ...element.incorrect_answers,
        ]; //spread sintax ecam scrip 6
        console.log(arregloRespuestas);

        arregloRespuestas.sort();

        let listaRespuesta = "";

        arregloRespuestas.forEach((respuesta) => {
          if (respuestaCorrecta == respuesta){
            listaRespuesta += `<li class = "list-group-item respuestaCorrecta">${respuesta}</li>`;  
          }
          else{
            listaRespuesta += `<li class = "list-group-item">${respuesta}</li>`;
          }

          
        });

        const pregunta = document.createElement("div");


        pregunta.innerHTML = `
         <div>
            <p>${element.question}</p>
            <ul class="list-group">
               ${listaRespuesta}
            </ul>
         </div>
        `;
        contenedorPreguntas.appendChild(pregunta);
      });
    })
    .catch((error) => {
      console.log("Error al obtener preguntas");
    });
}

// Evento click para poner activa la opción del usuario
contenedorPreguntas.addEventListener('click', function (evento) {

  // Verificar si el elemento clickeado es un elemento de lista (list-group-item)
  if (evento.target.classList.contains('list-group-item')) {

      // Obtener todos los elementos 'li' dentro del 'ul' padre del elemento clickeado
      console.log(evento.target);
      const todosLosItems = evento.target.parentNode.querySelectorAll('.list-group-item');

      // Quitar la clase 'active' de todos los elementos para resetear el estado
      todosLosItems.forEach(item => item.classList.remove('active'));

      // Añadir la clase 'active' al elemento clickeado
      evento.target.classList.add('active');
  }
});

// Evento de Click iniciar
botonIniciar.addEventListener("click", function (event) {
  //console.log("Clic Iniciar");
  let URL_Api = "https://opentdb.com/api.php?amount=10";

  if (selectorCategoria.value != "any") {
    URL_Api = URL_Api + "&category=" + selectorCategoria.value
  }

  if (selectorDificultad.value != "any"){
    URL_Api = URL_Api + "&difficulty=" + selectorDificultad.value
  }

  if (selectorTipo.value != "any"){
    URL_Api = URL_Api + "&type=" + selectorTipo.value
  }


  obtenerPreguntas(URL_Api);
});

//Evento del click Cancelar
botonCancelar.addEventListener("click", function (event) {
  contenedorPreguntas.innerHTML = "";
  sumaFinal.textContent="";
});

botonResultado.addEventListener("click", function (event) {
  console.log("resultado");
  const respuestas = document.querySelectorAll(".list-group-item");

  let sumarPuntos = 0;

  respuestas.forEach(respuesta => {
    if (respuesta.classList.contains("active") && respuesta.classList.contains("respuestaCorrecta")) {
      sumarPuntos = sumarPuntos + 100;

    }

  });

  //console.log(sumarPuntos);

  sumaFinal.textContent = sumarPuntos + "/1000";
});
