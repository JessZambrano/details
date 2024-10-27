// Texto de la carta
const letterText = `Mi amor,

Me gusta la manera en la que me haces sentir.
Me gusta como cada dia tratamos de mejorar.
Me gusta la manera en que me acaricias y me 
me gusta que saques mi lado cursi.

Felices 4 meses bebé.`;

// Variables para el efecto de escritura
const letterContent = document.getElementById("letterContent");
let index = 0;

// Función para escribir el texto de la carta con efecto de máquina de escribir
function typeLetter() {
  if (index < letterText.length) {
    letterContent.innerHTML += letterText.charAt(index);
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
