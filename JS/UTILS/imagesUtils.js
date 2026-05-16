export function iniciarAnimacionFondo() {
    
    const body = document.body;

    // Establecemos la gradiente original
    body.style.background = "linear-gradient(16deg, rgba(10, 64, 18, 0.99) 0%, rgb(33, 128, 72) 50%, rgb(31, 116, 107) 100%)";

    body.style.backgroundSize = "200% 200%"; // Le damos margen para que la transicion se mueva

    function generarGradiente() { // Funcion interna para generar variaciones de la paleta de colores

        const angulo = Math.floor(Math.random() * 360); // Angulo aleatorio entre 0 y 360 grados
        
        const color1 = `hsl(${Math.floor(Math.random() * 20) + 120}, 73%, 15%)`; // Variacion del primer color
        
        const color2 = `hsl(${Math.floor(Math.random() * 15) + 140}, 59%, 32%)`;  // Variacion del segundo color
        
        const color3 = `hsl(${Math.floor(Math.random() * 15) + 170}, 58%, 29%)`;   // Variacion del tercer color 

        return `linear-gradient(${angulo}deg, ${color1} 0%, ${color2} 50%, ${color3} 100%)`;
    }
    
    setInterval(() => { // Cambiamos el patron cada 15 segundos

        body.style.background = generarGradiente();

        body.style.backgroundSize = "200% 200%"; // Aseguramos que el tamaño se mantenga 

        body.style.backgroundAttachment = "fixed"; // Hacemos que el fondo se mantenga fijo
    }, 15000);
}