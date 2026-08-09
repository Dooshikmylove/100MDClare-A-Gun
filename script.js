/* =========================================================
   100 POTROMOCHILEROS DIJERON
   SCRIPT OFICIAL DEL JUEGO
========================================================= */


/* =========================================================
   VARIABLES DEL JUEGO
========================================================= */

let preguntaActual = 0;
let esSegundoEquipo = false;
let puntos = {
    azul: 0,
    rojo: 0
};

let errores = 0;

let tiempo = 30;

let intervaloTiempo = null;

let juegoActivo = false;

let musicaActivada = true;

let sonidosActivados = true;


/* =========================================================
   ELEMENTOS DEL HTML
========================================================= */

const pantallaInicio =
    document.getElementById("pantallaInicio");

const pantallaInstrucciones =
    document.getElementById("pantallaInstrucciones");

const pantallaConfiguracion =
    document.getElementById("pantallaConfiguracion");

const pantallaCreditos =
    document.getElementById("pantallaCreditos");

const pantallaEquipos =
    document.getElementById("pantallaEquipos");

const pantallaJuego =
    document.getElementById("pantallaJuego");

const pantallaGanador =
    document.getElementById("pantallaGanador");


const btnJugar =
    document.getElementById("btnJugar");

const btnInstrucciones =
    document.getElementById("btnInstrucciones");

const btnConfiguracion =
    document.getElementById("btnConfiguracion");

const btnCreditos =
    document.getElementById("btnCreditos");


const volverInicio1 =
    document.getElementById("volverInicio1");

const volverInicio2 =
    document.getElementById("volverInicio2");

const volverInicio3 =
    document.getElementById("volverInicio3");


const equipoAzul =
    document.getElementById("equipoAzul");

const equipoRojo =
    document.getElementById("equipoRojo");


const preguntaElemento =
    document.getElementById("pregunta");

const numeroPregunta =
    document.getElementById("numeroPregunta");

const temporizador =
    document.getElementById("temporizador");

const puntajeAzul =
    document.getElementById("puntajeAzul");

const puntajeRojo =
    document.getElementById("puntajeRojo");

const equipoTurno =
    document.getElementById("equipoTurno");


const respuestas =
    document.querySelectorAll(".respuesta");


const error1 =
    document.getElementById("error1");

const error2 =
    document.getElementById("error2");

const error3 =
    document.getElementById("error3");


const btnCambiarEquipo =
    document.getElementById("btnCambiarEquipo");

const btnSiguiente =
    document.getElementById("btnSiguiente");


const popupCorrecto =
    document.getElementById("popupCorrecto");

const popupIncorrecto =
    document.getElementById("popupIncorrecto");

const popupTurno =
    document.getElementById("popupTurno");

const popupTiempo =
    document.getElementById("popupTiempo");


const textoCambioTurno =
    document.getElementById("textoCambioTurno");


const textoGanador =
    document.getElementById("textoGanador");


const btnReiniciar =
    document.getElementById("btnReiniciar");


const confeti =
    document.getElementById("confeti");


/* =========================================================
   AUDIOS
========================================================= */

const musicaFondo =
    document.getElementById("musicaFondo");

const audioCorrecto =
    document.getElementById("audioCorrecto");

const audioIncorrecto =
    document.getElementById("audioIncorrecto");

const audioCambio =
    document.getElementById("audioCambio");

const audioVictoria =
    document.getElementById("audioVictoria");


/* =========================================================
   FUNCIONES GENERALES
========================================================= */

function ocultarTodasLasPantallas() {

    document
        .querySelectorAll(".pantalla")
        .forEach(pantalla => {

            pantalla.classList.add("oculto");

        });

}


function mostrarPantalla(pantalla) {

    ocultarTodasLasPantallas();

    pantalla.classList.remove("oculto");

}


/* =========================================================
   SONIDOS
========================================================= */

function reproducirSonido(audio) {

    if (!sonidosActivados) {
        return;
    }

    audio.currentTime = 0;

    audio.play().catch(() => {});

}


function iniciarMusica() {

    if (!musicaActivada) {
        return;
    }

    musicaFondo.volume = 0.25;

    musicaFondo.play().catch(() => {});

}


/* =========================================================
   MENÚ PRINCIPAL
========================================================= */

btnJugar.addEventListener("click", () => {

    mostrarPantalla(pantallaEquipos);

});


btnInstrucciones.addEventListener("click", () => {

    mostrarPantalla(pantallaInstrucciones);

});


btnConfiguracion.addEventListener("click", () => {

    mostrarPantalla(pantallaConfiguracion);

});


btnCreditos.addEventListener("click", () => {

    mostrarPantalla(pantallaCreditos);

});


volverInicio1.addEventListener("click", () => {

    mostrarPantalla(pantallaInicio);

});


volverInicio2.addEventListener("click", () => {

    mostrarPantalla(pantallaInicio);

});


volverInicio3.addEventListener("click", () => {

    mostrarPantalla(pantallaInicio);

});


/* =========================================================
   CONFIGURACIÓN DE SONIDO
========================================================= */

const activarMusica =
    document.getElementById("activarMusica");

const activarSonidos =
    document.getElementById("activarSonidos");


activarMusica.addEventListener("change", () => {

    musicaActivada =
        activarMusica.checked;

    if (musicaActivada) {

        iniciarMusica();

    } else {

        musicaFondo.pause();

    }

});


activarSonidos.addEventListener("change", () => {

    sonidosActivados =
        activarSonidos.checked;

});


/* =========================================================
   SELECCIÓN DEL EQUIPO
========================================================= */

equipoAzul.addEventListener("click", () => {

    iniciarPartida("azul");

});


equipoRojo.addEventListener("click", () => {

    iniciarPartida("rojo");

});


/* =========================================================
   INICIAR PARTIDA
========================================================= */

function iniciarPartida(equipo) {

    preguntaActual = 0;

    puntos.azul = 0;

    puntos.rojo = 0;

    equipoActual = equipo;

    errores = 0;

    esSegundoEquipo = false;

    juegoActivo = true;

    actualizarMarcadores();

    mostrarPantalla(pantallaJuego);

    iniciarMusica();

    cargarPregunta();

}


/* =========================================================
   CARGAR PREGUNTA
========================================================= */

function cargarPregunta() {

    detenerTemporizador();

    errores = 0;

    limpiarErrores();

    respuestas.forEach(respuesta => {

        respuesta.disabled = false;

        respuesta.classList.remove(
            "correcta",
            "incorrecta",
            "seleccionada",
            "revelada"
        );

    });


    if (preguntaActual >= preguntas.length) {

        finalizarJuego();

        return;

    }


    const datos =
        preguntas[preguntaActual];


    preguntaElemento.textContent =
        datos.pregunta;


    numeroPregunta.textContent =
        `PREGUNTA ${preguntaActual + 1} / ${preguntas.length}`;


    respuestas.forEach((boton, indice) => {

        boton.querySelector("p").textContent =
            datos.opciones[indice];

    });


    actualizarTurno();

    iniciarTemporizador();

    const marco =
        document.querySelector(".marcoExterior");

    marco.classList.remove("preguntaActiva");

    void marco.offsetWidth;

    marco.classList.add("preguntaActiva");

}


/* =========================================================
   ACTUALIZAR TURNO
========================================================= */

function actualizarTurno() {

    if (equipoActual === "azul") {

        equipoTurno.textContent =
            "EQUIPO AZUL";

        equipoTurno.className =
            "azul";

    } else {

        equipoTurno.textContent =
            "EQUIPO ROJO";

        equipoTurno.className =
            "rojo";

    }


    document
        .querySelector(".marcador.azul")
        .classList.toggle(
            "activo",
            equipoActual === "azul"
        );


    document
        .querySelector(".marcador.rojo")
        .classList.toggle(
            "activo",
            equipoActual === "rojo"
        );

}


/* =========================================================
   TEMPORIZADOR
========================================================= */

function iniciarTemporizador() {

    tiempo = 30;

    actualizarTemporizador();


    intervaloTiempo =
        setInterval(() => {

            tiempo--;

            actualizarTemporizador();


            if (tiempo <= 0) {

                detenerTemporizador();

                tiempoAgotado();

            }

        }, 1000);

}


function actualizarTemporizador() {

    temporizador.textContent =
        tiempo;


    temporizador.classList.remove(
        "alerta",
        "critico"
    );


    if (tiempo <= 10 && tiempo > 5) {

        temporizador.classList.add(
            "alerta"
        );

    }


    if (tiempo <= 5) {

        temporizador.classList.add(
            "critico"
        );

    }

}


function detenerTemporizador() {

    if (intervaloTiempo !== null) {

        clearInterval(intervaloTiempo);

        intervaloTiempo = null;

    }

}


/* =========================================================
   RESPUESTAS
========================================================= */

respuestas.forEach(boton => {

    boton.addEventListener("click", () => {

        if (!juegoActivo) {
            return;
        }

        if (boton.disabled) {
            return;
        }

        const indice =
            Number(
                boton.dataset.indice
            );

        comprobarRespuesta(
            indice,
            boton
        );

    });

});


/* =========================================================
   COMPROBAR RESPUESTA
========================================================= */

function comprobarRespuesta(
    indice,
    boton
) {

    const datos =
        preguntas[preguntaActual];


    boton.classList.add(
        "seleccionada"
    );


    if (indice === datos.correcta) {

        respuestaCorrecta(
            boton,
            datos.puntos
        );

    } else {

        respuestaIncorrecta(
            boton
        );

    }

}


/* =========================================================
   RESPUESTA CORRECTA
========================================================= */

function respuestaCorrecta(
    boton,
    puntosGanados
) {

    detenerTemporizador();

    boton.classList.remove(
        "seleccionada"
    );

    boton.classList.add(
        "correcta",
        "revelada"
    );


    respuestas.forEach(
        respuesta => {

            respuesta.disabled = true;

        }
    );


   let recompensa = puntosGanados;


/*
   Si el segundo equipo está
   respondiendo después de un cambio,
   recibe menos puntos.
*/

if (errores === 0 && tiempo <= 15) {

    recompensa =
        Math.floor(
            puntosGanados / 2
        );

}


puntos[equipoActual] +=
    recompensa;

    actualizarMarcadores();

    reproducirSonido(
        audioCorrecto
    );


    mostrarPopup(
        popupCorrecto
    );


    mostrarPuntos(
        `+${puntosGanados}`
    );


    setTimeout(() => {

        ocultarPopup(
            popupCorrecto
        );

    }, 1200);


    setTimeout(() => {

        siguientePregunta();

    }, 1500);

}


/* =========================================================
   RESPUESTA INCORRECTA
========================================================= */
function respuestaIncorrecta(boton) {

    boton.classList.remove(
        "seleccionada"
    );

    boton.classList.add(
        "incorrecta"
    );

    boton.disabled = true;

    errores++;

    mostrarError(errores);

    reproducirSonido(
        audioIncorrecto
    );


    /* =========================================
       PRIMER ERROR
    ========================================= */

    if (errores === 1) {

        restarPuntos(50);

        mostrarPopup(
            popupIncorrecto
        );

        setTimeout(() => {

            ocultarPopup(
                popupIncorrecto
            );

        }, 800);

        return;
    }


    /* =========================================
       SEGUNDO ERROR
    ========================================= */

    if (errores === 2) {

        restarPuntos(100);

        mostrarPopup(
            popupIncorrecto
        );

        setTimeout(() => {

            ocultarPopup(
                popupIncorrecto
            );

        }, 800);

        return;
    }


    /* =========================================
       TERCER ERROR
       CAMBIO AUTOMÁTICO DE EQUIPO
    ========================================= */

    if (errores >= 3) {

        detenerTemporizador();

        cambiarTurnoPorError();

    }

}


/* =========================================================
   MOSTRAR ERROR
========================================================= */

function mostrarError(numero) {

    if (numero === 1) {

        error1.classList.add(
            "activo"
        );

    }

    if (numero === 2) {

        error2.classList.add(
            "activo"
        );

    }

    if (numero === 3) {

        error3.classList.add(
            "activo"
        );

    }

}

function restarPuntos(cantidad) {

    puntos[equipoActual] -= cantidad;

    /*
       Evitamos que el marcador
       baje de cero.
    */

    if (puntos[equipoActual] < 0) {

        puntos[equipoActual] = 0;

    }

    actualizarMarcadores();

    mostrarPuntos(
        `-${cantidad}`
    );

}


/* =========================================================
   LIMPIAR ERRORES
========================================================= */

function limpiarErrores() {

    error1.classList.remove(
        "activo"
    );

    error2.classList.remove(
        "activo"
    );

    error3.classList.remove(
        "activo"
    );

}


/* =========================================================
   TIEMPO AGOTADO
========================================================= */

function tiempoAgotado() {

    reproducirSonido(
        audioIncorrecto
    );


    mostrarPopup(
        popupTiempo
    );


    setTimeout(() => {

        ocultarPopup(
            popupTiempo
        );


        cambiarTurno();

    }, 1300);

}


/* =========================================================
   CAMBIAR EQUIPO
========================================================= */
function cambiarTurnoPorError() {

    equipoActual =
        equipoActual === "azul"
            ? "rojo"
            : "azul";

    errores = 0;

    esSegundoEquipo = true;

    limpiarErrores();

    actualizarTurno();

    reproducirSonido(
        audioCambio
    );

    textoCambioTurno.textContent =
        equipoActual === "azul"
            ? "EQUIPO AZUL"
            : "EQUIPO ROJO";

    mostrarPopup(
        popupTurno
    );

    setTimeout(() => {

        ocultarPopup(
            popupTurno
        );

        prepararSegundoEquipo();

    }, 1300);

}

function prepararSegundoEquipo() {

    tiempo = 15;

    actualizarTemporizador();

    iniciarTemporizador();

    respuestas.forEach(
        respuesta => {

            respuesta.disabled = false;

            respuesta.classList.remove(
                "seleccionada",
                "incorrecta",
                "correcta",
                "revelada"
            );

        }
    );

}



/* =========================================================
   BOTÓN CAMBIAR EQUIPO
========================================================= */

btnCambiarEquipo.addEventListener(
    "click",
    () => {

        if (!juegoActivo) {
            return;
        }

        cambiarTurno();

    }
);


/* =========================================================
   SIGUIENTE PREGUNTA
========================================================= */

btnSiguiente.addEventListener(
    "click",
    () => {

        if (!juegoActivo) {
            return;
        }

        siguientePregunta();

    }
);


function siguientePregunta() {

    detenerTemporizador();

    preguntaActual++;

    if (
        preguntaActual >=
        preguntas.length
    ) {

        finalizarJuego();

        return;

    }


    cargarPregunta();

}


/* =========================================================
   MARCADORES
========================================================= */

function actualizarMarcadores() {

    puntajeAzul.textContent =
        puntos.azul;

    puntajeRojo.textContent =
        puntos.rojo;

}


/* =========================================================
   POPUPS
========================================================= */

function mostrarPopup(popup) {

    popup.classList.remove(
        "oculto"
    );

}


function ocultarPopup(popup) {

    popup.classList.add(
        "oculto"
    );

}


/* =========================================================
   ANIMACIÓN DE PUNTOS
========================================================= */

function mostrarPuntos(texto) {

    const elemento =
        document.createElement(
            "div"
        );


    elemento.className =
        "puntosAnimacion";


    elemento.textContent =
        texto;


    if (texto.startsWith("-")) {

        elemento.classList.add(
            "puntosNegativos"
        );

    }


    elemento.style.left =
        "50%";

    elemento.style.top =
        "45%";


    document.body.appendChild(
        elemento
    );


    setTimeout(() => {

        elemento.remove();

    }, 1300);

}


/* =========================================================
   FINALIZAR JUEGO
========================================================= */

function finalizarJuego() {

    detenerTemporizador();

    juegoActivo = false;


    let ganador;


    if (
        puntos.azul >
        puntos.rojo
    ) {

        ganador =
            "EQUIPO AZUL";

    }

    else if (
        puntos.rojo >
        puntos.azul
    ) {

        ganador =
            "EQUIPO ROJO";

    }

    else {

        ganador =
            "¡EMPATE!";

    }


    textoGanador.textContent =
        ganador;


    mostrarPantalla(
        pantallaGanador
    );


    reproducirSonido(
        audioVictoria
    );


    lanzarConfeti();

}


/* =========================================================
   CONFETI
========================================================= */

function lanzarConfeti() {

    confeti.innerHTML = "";


    const cantidad = 120;


    for (
        let i = 0;
        i < cantidad;
        i++
    ) {

        const pieza =
            document.createElement(
                "div"
            );


        pieza.className =
            "confetiPieza";


        pieza.style.left =
            Math.random() * 100 + "%";


        pieza.style.setProperty(
            "--duracion",
            (3 + Math.random() * 4) + "s"
        );


        pieza.style.setProperty(
            "--movimiento",
            (-150 + Math.random() * 300) + "px"
        );


        pieza.style.background =
            obtenerColorConfeti();


        pieza.style.animationDelay =
            Math.random() * 1.5 + "s";


        confeti.appendChild(
            pieza
        );

    }


    setTimeout(() => {

        confeti.innerHTML = "";

    }, 8000);

}


function obtenerColorConfeti() {

    const colores = [

        "#ffd633",
        "#ff4d6d",
        "#2aa9ff",
        "#47d85f",
        "#ffffff",
        "#b66cff"

    ];


    return colores[
        Math.floor(
            Math.random() *
            colores.length
        )
    ];

}


/* =========================================================
   REINICIAR
========================================================= */

btnReiniciar.addEventListener(
    "click",
    () => {

        detenerTemporizador();

        juegoActivo = false;

        confeti.innerHTML = "";

        mostrarPantalla(
            pantallaInicio
        );

    }
);


/* =========================================================
   INICIALIZACIÓN
========================================================= */

actualizarMarcadores();

mostrarPantalla(
    pantallaInicio
);


