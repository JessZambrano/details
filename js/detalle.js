// Título y poema para la carta
const letterTitle = "Ecos del Alma";
const letterPoem = `Como el sol que acaricia en calma,
como el viento que juega en la mañana,
así mi amor te envuelve, sin prisa,
en cada latido, en cada sonrisa.

Es un eco que vibra y se queda,
como huella en la arena trazada.
No importa si el tiempo se aleja,
mi amor, como el mar, siempre regresa.

❤️❤️❤️❤️`;
const letterMesag = `¡Felices 4 meses mi amor!
Te quiero mucho mi cielito
🥰😍😘`;

// Variables para el efecto de escritura
const letterContent = document.getElementById("letterContent");
let index = 0;

// Agregar título, contenido, mensaje
letterContent.innerHTML = `<div class="title">${letterTitle}</div>
<div class="poem" id="poemContent"></div>
<div class="mesag" id="mesagContent">${letterMesag}</div>`;
const poemContent = document.getElementById("poemContent");
const mesagContent = document.getElementById("mesagContent");

// Función para escribir el poema con efecto de máquina de escribir
function typeLetter() {
    if (index < letterPoem.length) {
        poemContent.innerHTML += letterPoem.charAt(index);
        index++;
        setTimeout(typeLetter, 100); // Tiempo entre cada letra
    }
}

// Iniciar el efecto de escritura después de que la carta se abra
window.addEventListener("load", () => {
    setTimeout(() => {
        letterContent.style.opacity = 1;
        typeLetter();
    }, 2000); // Espera a que se complete la animación de apertura
});
