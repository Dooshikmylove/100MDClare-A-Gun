/*=========================================
        100 POTROMOCHILEROS DIJERON

              SISTEMA DE SONIDOS

=========================================*/


// ========================================
// CONTROL DE AUDIO
// ========================================


const sonidos = {


    correcto:
    document.getElementById(
        "audioCorrecto"
    ),


    error:
    document.getElementById(
        "audioIncorrecto"
    ),


    victoria:
    document.getElementById(
        "audioVictoria"
    ),


    cambio:
    document.getElementById(
        "audioCambio"
    ),


    fondo:
    document.getElementById(
        "musicaFondo"
    )

};




// ========================================
// REPRODUCIR SONIDO
// ========================================


function reproducir(tipo){


    if(sonidos[tipo]){


        sonidos[tipo].currentTime = 0;


        sonidos[tipo]
        .play()
        .catch(()=>{});


    }


}




// ========================================
// MÚSICA DE FONDO
// ========================================


function iniciarMusica(){


    if(sonidos.fondo){


        sonidos.fondo.volume = 0.5;


        sonidos.fondo
        .play()
        .catch(()=>{});


    }


}




function detenerMusica(){


    if(sonidos.fondo){


        sonidos.fondo.pause();


    }


}




// ========================================
// CAMBIO DE TURNO
// ========================================


function sonidoCambioEquipo(){


    reproducir("cambio");


}


