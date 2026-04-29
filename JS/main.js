//========HEADER========
import { mainHeaderTemplate } from "./TEMPLATES/templates.js"; // Importamos la función del template para el header

document.getElementById("main-header").innerHTML = mainHeaderTemplate(); // Renderizamos el header


//========GENERADOR DE CONTRASEÑAS========
import { passwordsGenerator } from "./UTILS/passwordsUtils.js"; // Importamos la función para generar contraseñas

document.getElementById("btn-generatePassword").addEventListener("click", () => { // Agregamos un event listener al botón de generar contraseña
    
    const passwordLength = parseInt(document.getElementById("lengthPassword").value); // Obtenemos la longitud de la contraseña

    const password = passwordsGenerator(passwordLength); //Generamos y guardamos la contraseña en una variable

    if (!password) {
        document.getElementById('password-generated-container').classList.add('hide') //Si por alguna situacion deja de verse la contraseña, desaparece el contenedor
    }

    document.getElementById("resultPassword").textContent = password; // Renderizamos la contraseña
}); 