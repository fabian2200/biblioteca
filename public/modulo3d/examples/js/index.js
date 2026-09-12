function cerrarModal() {
    window.speechSynthesis.cancel();
    document.getElementById('miModal').style.display = 'none';
}

function cambiarPestana(evento, tabId) {
    const contenidos = document.getElementsByClassName('contenido-pestana');
    for (let i = 0; i < contenidos.length; i++) contenidos[i].classList.remove('activa');

    const botones = document.getElementsByClassName('btn-pestana');
    for (let i = 0; i < botones.length; i++) botones[i].classList.remove('activa');

    document.getElementById(tabId).classList.add('activa');
    evento.currentTarget.classList.add('activa');
}

var hablando = false;
document.getElementById('boton-hablar').addEventListener('click', () => {
    var botonHablar = document.getElementById('boton-hablar');
    if (hablando) {
        pararHablar();
        botonHablar.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        hablando = false;
    }else{
        botonHablar.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        hablando = true;
        // ver que pestaña esta activa
        var pestanaContenido = document.querySelector('#tab-descripcion');
        var pestanaFunciones = document.querySelector('#tab-funciones');

        var texto = '';
        if (pestanaContenido.classList.contains('activa')) {
            texto = pestanaContenido.innerText;
        }else if (pestanaFunciones.classList.contains('activa')) {
            texto = pestanaFunciones.innerText;
        }else{
            texto = '';
        }

        if (texto) {
            hablando = true;
            hablar(texto);
        }
    }
});

function cargarVoces() {
    let voces = speechSynthesis.getVoices();

    if (voces.length > 0) {
        console.log(voces);
        return;
    }

    speechSynthesis.onvoiceschanged = () => {
        voces = speechSynthesis.getVoices();
        console.log(voces);
    };
}

cargarVoces();


function pararHablar() {
    // boton de hablar
    var botonHablar = document.getElementById('boton-hablar');
    botonHablar.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    window.speechSynthesis.cancel();
}

function hablar(texto) {

    speechSynthesis.cancel(); // detiene cualquier lectura anterior

    const voces = speechSynthesis.getVoices();

    const voz =
        voces.find(v => v.name === 'Google español de Estados Unidos') ||
        voces.find(v => v.name === 'Microsoft Laura - Spanish (Spain)') ||
        voces.find(v => v.lang.startsWith('es'));

    const mensaje = new SpeechSynthesisUtterance(texto);

    mensaje.voice = voz;
    mensaje.lang = voz ? voz.lang : 'es-ES';

    mensaje.rate = 1.15;
    mensaje.pitch = 1.05;
    mensaje.volume = 1;

    const botonHablar = document.getElementById('boton-hablar');

    mensaje.onend = () => {
        botonHablar.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        hablando = false;
    };

    mensaje.onerror = () => {
        botonHablar.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        hablando = false;
    };

    speechSynthesis.speak(mensaje);
}
