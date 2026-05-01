export function mainHeaderTemplate() { // Exportamos la funcion para renderizar el Header
  
    const isRoot = !window.location.pathname.includes('/HTML/'); // Guardamos en una variable la raiz index.html

    const homeLink = isRoot ? './index.html' : '../index.html';
        // Si estamos en la raíz, el link es "./index.html"
        // Si estamos en HTML/, el link es "../index.html"

    return `
        <div class="header-container">
            <a href="${homeLink}">
                <h2 class="inicio-header">Inicio</h2>
            </a>
        </div>

    `
}