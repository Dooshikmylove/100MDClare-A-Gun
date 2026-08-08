/*=========================================
    100 POTROMOCHILEROS DIJERON

            SCRIPT PRINCIPAL

=========================================*/


// ========================================
// VARIABLES GENERALES
// ========================================


let equipoActual = "";

let puntosAzul = 0;

let puntosRojo = 0;


let preguntaActual = 0;

let errores = 0;


let tiempo = 20;

let tiempoInicial = 20;


let temporizador;



let configuracion = {

    cantidadPreguntas:12,

    tiempo:20

};



// ========================================
// ELEMENTOS HTML
// ========================================


const inicio = document.getElementById("inicio");

const seleccionEquipos =
document.getElementById("seleccionEquipos");


const juego =
document.getElementById("juego");


const ganador =
document.getElementById("pantallaGanador");



const btnJugar =
document.getElementById("btnJugar");


const btnInstrucciones =
document.getElementById("btnInstrucciones");


const btnConfiguracion =
document.getElementById("btnConfiguracion");


const btnCreditos =
document.getElementById("btnCreditos");



const equipoAzul =
document.getElementById("equipoAzul");


const equipoRojo =
document.getElementById("equipoRojo");



const preguntaTexto =
document.getElementById("pregunta");



const respuestas =
document.querySelectorAll(".respuesta");



const puntajeAzul =
document.getElementById("puntajeAzul");


const puntajeRojo =
document.getElementById("puntajeRojo");



const tiempoTexto =
document.getElementById("temporizador");



const numeroPregunta =
document.getElementById("numeroPregunta");



// ========================================
// INICIAR JUEGO
// ========================================


btnJugar.addEventListener(
"click",
()=>{


    inicio.style.display="none";


    seleccionEquipos.style.display="flex";


});




// ========================================
// SELECCIONAR EQUIPO
// ========================================



equipoAzul.addEventListener(
"click",
()=>{


equipoActual="azul";


iniciarPartida();


});




equipoRojo.addEventListener(
"click",
()=>{


equipoActual="rojo";


iniciarPartida();


});




// ========================================
// COMENZAR PARTIDA
// ========================================


function iniciarPartida(){


seleccionEquipos.style.display="none";


juego.style.display="block";


preguntaActual=0;


errores=0;


cargarPregunta();


}

// ========================================
// CARGAR PREGUNTA
// ========================================


function cargarPregunta(){


    errores = 0;


    limpiarErrores();



    if(preguntaActual >= preguntas.length ||
       preguntaActual >= configuracion.cantidadPreguntas){


        finalizarJuego();

        return;

    }



    let pregunta = preguntas[preguntaActual];



    numeroPregunta.innerHTML = 
    `
    Pregunta ${preguntaActual + 1} / 
    ${configuracion.cantidadPreguntas}
    `;



    preguntaTexto.innerHTML =
    pregunta.pregunta;



    let letras = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F"
    ];



    respuestas.forEach((boton,index)=>{


        boton.classList.remove(
            "correcta",
            "incorrecta"
        );


        boton.querySelector("span").innerHTML =
        letras[index];


        boton.querySelector("p").innerHTML =
        pregunta.opciones[index];



        boton.disabled=false;



        boton.onclick=()=>{

            comprobarRespuesta(index);

        };



    });



    iniciarTiempo();


}



// ========================================
// COMPROBAR RESPUESTA
// ========================================


function comprobarRespuesta(opcion){



    let pregunta =
    preguntas[preguntaActual];



    respuestas.forEach(btn=>{

        btn.disabled=true;

    });



    if(opcion === pregunta.correcta){



        mostrarCorrecto();


        sumarPuntos(
            pregunta.puntos
        );



        respuestas[opcion]
        .classList.add(
            "correcta"
        );



        setTimeout(()=>{


            siguientePregunta();


        },2000);



    }

    else{


        errores++;


        mostrarError();


        restarPuntos();



        respuestas[opcion]
        .classList.add(
            "incorrecta"
        );



        actualizarErrores();



        if(errores >=3){



            setTimeout(()=>{


                cambiarEquipo();



            },2000);



        }

        else{


            setTimeout(()=>{


                respuestas.forEach(btn=>{

                    btn.disabled=false;

                });



            },1500);


        }


    }


}




// ========================================
// SIGUIENTE PREGUNTA
// ========================================


function siguientePregunta(){


preguntaActual++;


detenerTiempo();


cargarPregunta();


}

// ========================================
// PUNTOS
// ========================================


function sumarPuntos(puntos){



if(equipoActual==="azul"){


    puntosAzul += puntos;


    puntajeAzul.innerHTML =
    puntosAzul;


}



else{


    puntosRojo += puntos;


    puntajeRojo.innerHTML =
    puntosRojo;


}



}




function restarPuntos(){



if(equipoActual==="azul"){


    puntosAzul -=10;


    if(puntosAzul<0)
    puntosAzul=0;


    puntajeAzul.innerHTML =
    puntosAzul;



}


else{


    puntosRojo -=10;


    if(puntosRojo<0)
    puntosRojo=0;


    puntajeRojo.innerHTML =
    puntosRojo;


}



}


// ========================================
// ERRORES
// ========================================


function actualizarErrores(){


let x = document.querySelectorAll(".error");



if(errores<=3){


    x[errores-1]
    .classList.add(
        "activo"
    );


}



}



function limpiarErrores(){


document.querySelectorAll(".error")
.forEach(x=>{


    x.classList.remove(
        "activo"
    );


});



}


// ========================================
// CAMBIO DE EQUIPO
// ========================================


function cambiarEquipo(){



limpiarErrores();


errores=0;



if(equipoActual==="azul"){


    equipoActual="rojo";


}


else{


    equipoActual="azul";


}



alert(
"El turno cambia al equipo " 
+ equipoActual.toUpperCase()
);



cargarPregunta();



}


// ========================================
// TEMPORIZADOR
// ========================================


function iniciarTiempo(){


    tiempo = configuracion.tiempo;


    tiempoTexto.innerHTML = tiempo;



    clearInterval(temporizador);



    temporizador = setInterval(()=>{


        tiempo--;



        tiempoTexto.innerHTML = tiempo;



        if(tiempo <= 0){



            detenerTiempo();



            mostrarError();



            restarPuntos();



            cambiarEquipo();


        }



    },1000);



}



function detenerTiempo(){


    clearInterval(temporizador);


}


// ========================================
// EFECTOS VISUALES
// ========================================


function mostrarCorrecto(){


    const pantalla =
    document.getElementById(
        "pantallaCorrecto"
    );


    const flash =
    document.getElementById(
        "flashVerde"
    );



    pantalla.style.display="block";


    flash.classList.add(
        "activarVerde"
    );



    reproducirSonido(
        "correcto"
    );



    setTimeout(()=>{


        pantalla.style.display="none";


        flash.classList.remove(
            "activarVerde"
        );


    },1000);



}





function mostrarError(){



    const pantalla =
    document.getElementById(
        "pantallaError"
    );


    const flash =
    document.getElementById(
        "flashRojo"
    );



    pantalla.style.display="block";


    flash.classList.add(
        "activarRojo"
    );



    reproducirSonido(
        "error"
    );



    setTimeout(()=>{


        pantalla.style.display="none";


        flash.classList.remove(
            "activarRojo"
        );


    },1000);



}


// ========================================
// SONIDOS
// ========================================


function reproducirSonido(tipo){



let audio;



switch(tipo){


case "correcto":


audio =
document.getElementById(
"audioCorrecto"
);


break;



case "error":


audio =
document.getElementById(
"audioIncorrecto"
);


break;



case "victoria":


audio =
document.getElementById(
"audioVictoria"
);


break;



}



if(audio){


audio.currentTime=0;


audio.play()
.catch(()=>{});


}



}


// ========================================
// FINALIZAR JUEGO
// ========================================


function finalizarJuego(){



detenerTiempo();



juego.style.display="none";



ganador.style.display="flex";



let nombre;


let puntos;



if(puntosAzul > puntosRojo){



nombre="🔵 EQUIPO AZUL";


puntos=puntosAzul;



}

else if(puntosRojo > puntosAzul){



nombre="🔴 EQUIPO ROJO";


puntos=puntosRojo;



}

else{


nombre="🤝 EMPATE";


puntos=puntosAzul;


}



document.getElementById(
"equipoGanador"
).innerHTML =
nombre;



document.getElementById(
"puntajeGanador"
).innerHTML =
puntos+" puntos";



reproducirSonido(
"victoria"
);



crearConfeti();



}


// ========================================
// CONFETI
// ========================================


function crearConfeti(){


const contenedor =
document.getElementById(
"confeti"
);



for(let i=0;i<100;i++){



let pieza =
document.createElement(
"span"
);



pieza.style.position="absolute";


pieza.style.width="10px";


pieza.style.height="10px";


pieza.style.left =
Math.random()*100+"%";



pieza.style.top="-20px";



pieza.style.background =
"hsl("+Math.random()*360+",100%,50%)";



pieza.style.animation =
"caer 3s linear";



contenedor.appendChild(
pieza
);



}



}





// ========================================
// REINICIAR
// ========================================


document
.getElementById(
"btnReiniciar"
)
.addEventListener(
"click",
()=>{


location.reload();


});


// ========================================
// MÚSICA DE FONDO
// ========================================


const musica =
document.getElementById(
"musicaFondo"
);



function iniciarMusica(){


if(musica){


musica.volume =
0.6;


musica.play()
.catch(()=>{});


}


}



document.addEventListener(
"click",
()=>{


iniciarMusica();


},
{
once:true
});




// ========================================
// INSTRUCCIONES
// ========================================


btnInstrucciones.addEventListener(
"click",
()=>{


document
.getElementById(
"modalInstrucciones"
)
.style.display="flex";


});




document
.getElementById(
"cerrarInstrucciones"
)
.addEventListener(
"click",
()=>{


document
.getElementById(
"modalInstrucciones"
)
.style.display="none";


});




// ========================================
// CONFIGURACIÓN
// ========================================


btnConfiguracion.addEventListener(
"click",
()=>{


document
.getElementById(
"modalConfiguracion"
)
.style.display="flex";


});




document
.getElementById(
"guardarConfiguracion"
)
.addEventListener(
"click",
()=>{


configuracion.tiempo =
parseInt(
document
.getElementById(
"configTiempo"
)
.value
);



configuracion.cantidadPreguntas =
parseInt(
document
.getElementById(
"configCantidad"
)
.value
);



document
.getElementById(
"modalConfiguracion"
)
.style.display="none";



});




// ========================================
// CRÉDITOS
// ========================================


btnCreditos.addEventListener(
"click",
()=>{


document
.getElementById(
"modalCreditos"
)
.style.display="flex";


});




document
.getElementById(
"cerrarCreditos"
)
.addEventListener(
"click",
()=>{


document
.getElementById(
"modalCreditos"
)
.style.display="none";


});




// ========================================
// CAMBIO MANUAL DE EQUIPO
// ========================================


document
.getElementById(
"btnCambiarEquipo"
)
.addEventListener(
"click",
()=>{


cambiarEquipo();


});




// ========================================
// INICIO DE PANTALLA
// ========================================


window.addEventListener(
"load",
()=>{


setTimeout(()=>{


document
.getElementById(
"loader"
)
.style.display="none";


},
2500);



});
