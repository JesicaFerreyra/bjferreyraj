import _ from 'underscore';
import './style.css';
/**
 * 2C TWO OF CLUBS(TREBOL)
 * 2H TWO OF HEARTS
 * 2D TWO OF DIAMONDS
 * 2S TWO OF SPADES (ESPADAS)
 */


//variables globales

let deck                  = [];
let puntosJugador         =0;
let puntosComputadora     = 0;
const tipos               = ['C','D','H','S'];
const especiales          = ['A','J','K','Q'];
const btnPedir            = document.querySelector('#btnPedir');
const btnNuevo            = document.querySelector('#btnNuevo');
const btnDetener          = document.querySelector('#btnDetener');
const ptsJugador          = document.querySelector('#ptsJugador');
const ptsComputadora      = document.querySelector('#ptsComputadora');
//DIV DONDE SE ENCUENTRAN LAS IMAGENES DE LAS CARTAS DEL JUGADOR
const divCartasJugador    = document.querySelector('#jugador-cartas');
const divCartasComputadora= document.querySelector('#computadora-cartas');

let mensaje ='';


// funciones
const crearDeck=()=>{
    //CREO EL MAZO CON LAS CARTA COMUNES
    for(let i= 2; i<=10; i++){
        for(let tipo of tipos){
            deck.push(i+tipo);
        }
    }

    //CREO EL MAZO CON LAS CARTAS ESPECIALES
    for(let tipo of tipos){
        for (let esp of especiales){
            deck.push(esp + tipo )
        }
    }

    deck=_.shuffle(deck);  
};


const pedirCarta= () =>{
    let carta = deck.pop();// extrae el ultimo elemento del arreglo y lo devuelve.
    if(deck.length===0){
        throw 'NO HAY MAS CARTAS EN EL MAZO';
    }
    return carta;
};


const valorCarta=(carta)=>{
    //extraer el valor de la carta
    let valor = carta.substring(0,carta.length-1);//AH , 5H, 10H
    let puntos = 0;
    if(isNaN(valor)){
        console.log('no es un numero');
        if(valor === 'A'){
            puntos= 11;
        }
        else{//si no es A ya sabre que es J, K o Q
            puntos = 10;
        }
        // puntos= (valor === 'A')? 11 : 10; // ternario
    }else{
        puntos= valor * 1;
    }
    return puntos;
};

const turnoComputadora =(puntosMinimos)=>{

    do{
        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        ptsComputadora.innerText= puntosComputadora;
        const imgCarta  = document.createElement('img');
        imgCarta.classList.add('carta');
        imgCarta.src=`assets/cartas/${carta}.png`;
        divCartasComputadora.append(imgCarta);
        if(puntosMinimos>21)
            {
                mensaje= 'COMPUTADORA GANA';
                break;
            }
    }while(puntosComputadora<puntosMinimos && (puntosMinimos<= 21) )
    if(puntosComputadora=== 21){
        mensaje='EMPATE';
    }else{
        mensaje='JUGADOR 1 GANA';
    }
};

//EVENTOS

btnPedir.addEventListener('click',()=>{
    let estado;
    const carta= pedirCarta();
    puntosJugador= puntosJugador+ valorCarta(carta);
    ptsJugador.innerText= puntosJugador;
    //<img class="carta" src="assets/cartas/10C.png"></img>
    const imgCarta  = document.createElement('img');
    imgCarta.classList.add('carta');
    imgCarta.src=`assets/cartas/${carta}.png`;
    divCartasJugador.append(imgCarta);

    //controlar que el jugador llegue a 21 pts

    if(puntosJugador>21)
    {
        console.warn('perdiste');
        estado= 'A';
        btnPedir.disabled= true;
        btnDetener.disabled= true;
        turnoComputadora(puntosJugador);
    }else if(puntosJugador===21)
    {
        console.warn("turno de la computadora");
        btnPedir.disabled=true;
        btnDetener.disabled= true;
        turnoComputadora(puntosJugador);
    }

});

btnDetener.addEventListener('click', ()=>{

        btnPedir.disabled=true;
        btnDetener.disabled= true;
        turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener('click', ()=>{
    ptsComputadora.innerText      =0;
    ptsJugador.innerText          =0;
    divCartasComputadora.innerHTML="";
    divCartasJugador.innerHTML    ="";
    puntosComputadora             =0;
    puntosJugador                 =0;
});


//programa


crearDeck();



