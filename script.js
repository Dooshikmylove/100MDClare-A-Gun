/* =======================================================
   100 MEXICANOS DIJERON
   CLARE A. GUNN

   Motor principal del juego
======================================================= */


// =============================
// VARIABLES DEL JUEGO
// =============================

let preguntaActual = 0;

let puntos = 0;

let tiempo = 20;

let intervalo;


// =============================
// ELEMENTOS HTML
// =============================

const loader = document.getElementById("loader");

const menu = document.getElementById("menu");

const juego = document.getElementById("juego");

const pantallaFinal = document.getElementById("pantallaFinal");


const btnJugar =
document.getElementById("btnJugar");


const btnInstrucciones =
document.getElementById("btnInstrucciones");


const modal =
document.getElementById("modal");


const cerrarModal =
document.getElementById("cerrarModal");


const pregunta =
document.getElementById("pregunta");


const respuestas =
[
document.getElementById("r0"),
document.getElementById("r1"),
document.getElementById("r2")
];


const puntaje =
document.getElementById("puntaje");


const temporizador =
document.getElementById("temporizador");


const contador =
document.getElementById("contador");


const btnSiguiente =
document.getElementById("btnSiguiente");


const resultado =
document.getElementById("resultado");


const medalla =
document.getElementById("medalla");


const reiniciar =
document.getElementById("reiniciar");



// =============================
// PANTALLA DE CARGA
// =============================


window.addEventListener("load",()=>{

setTimeout(()=>{

loader.style.display="none";

},2500);


});



// =============================
// BOTONES DEL MENÚ
// =============================


btnJugar.addEventListener("click",()=>{


menu.style.display="none";


juego.style.display="block";


cargarPregunta();


});


btnInstrucciones.addEventListener("click",()=>{


modal.style.display="flex";


});


cerrarModal.addEventListener("click",()=>{


modal.style.display="none";


});



// =============================
// CARGAR PREGUNTA
// =============================


function cargarPregunta(){


detenerTiempo();


tiempo=20;


const actual =
preguntas[preguntaActual];



pregunta.innerHTML =
actual.pregunta;



respuestas.forEach((boton,index)=>{


boton.innerHTML =

String.fromCharCode(65+index)
+
") "
+
actual.respuestas[index];



boton.disabled=false;


boton.className="respuesta";



});



contador.innerHTML =

`${preguntaActual+1} / ${preguntas.length}`;



puntaje.innerHTML =

`⭐ ${puntos}`;



btnSiguiente.style.display="none";



iniciarTiempo();



}


// =============================
// TEMPORIZADOR
// =============================


function iniciarTiempo(){


temporizador.innerHTML =
"⏳ "+tiempo;



intervalo=setInterval(()=>{


tiempo--;


temporizador.innerHTML =
"⏳ "+tiempo;



if(tiempo<=0){


detenerTiempo();


mostrarRespuestaCorrecta();



}


},1000);



}



function detenerTiempo(){


clearInterval(intervalo);


}



// =============================
// RESPUESTAS
// =============================


respuestas.forEach((boton,index)=>{


boton.addEventListener("click",()=>{


verificarRespuesta(index);


});


});



function verificarRespuesta(eleccion){


detenerTiempo();



const actual =
preguntas[preguntaActual];



respuestas.forEach(boton=>{


boton.disabled=true;


});



if(eleccion === actual.correcta){


respuestas[eleccion]
.classList.add("correcta");


puntos += actual.puntos;



puntaje.innerHTML =
`⭐ ${puntos}`;



}else{


respuestas[eleccion]
.classList.add("incorrecta");



respuestas[actual.correcta]
.classList.add("correcta");



}



btnSiguiente.style.display="inline-block";



}



// =============================
// CUANDO TERMINA EL TIEMPO
// =============================


function mostrarRespuestaCorrecta(){


const actual =
preguntas[preguntaActual];



respuestas.forEach(boton=>{


boton.disabled=true;


});



respuestas[actual.correcta]
.classList.add("correcta");



btnSiguiente.style.display="inline-block";



}



// =============================
// SIGUIENTE PREGUNTA
// =============================


btnSiguiente.addEventListener("click",()=>{


preguntaActual++;



if(preguntaActual >= preguntas.length){


terminarJuego();


return;


}



cargarPregunta();



});



// =============================
// FINAL DEL JUEGO
// =============================


function terminarJuego(){


juego.style.display="none";


pantallaFinal.style.display="flex";



resultado.innerHTML =

`Puntaje final: ${puntos} puntos`;



if(puntos >= 500){


medalla.innerHTML =
"🥇 Experto en Clare A. Gunn";


}

else if(puntos >=350){


medalla.innerHTML =
"🥈 Excelente";


}

else{


medalla.innerHTML =
"🥉 Sigue practicando";


}



}



// =============================
// REINICIAR
// =============================


reiniciar.addEventListener("click",()=>{


preguntaActual=0;


puntos=0;



pantallaFinal.style.display="none";


menu.style.display="flex";


});
