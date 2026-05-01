// ==============HEADER=======================
import { mainHeaderTemplate } from "./TEMPLATES/templates.js"; // Importamos la función del template para el header

const mainHeader = document.getElementById("main-header") // Guardamos el contenedor en una variable

mainHeader.innerHTML = mainHeaderTemplate(); // Renderizamos el header


// ==============GENERADOR DE CONTRASEÑAS========================
import { passwordsGenerator } from "./UTILS/passwordsUtils.js"; // Importamos la función para generar contraseñas

const btnPassword = document.getElementById("btn-generatePassword"); // Guardamos el boton en una variable

const resultPasswordContainer = document.getElementById("resultPassword");  // Guardamos el contenedor en una variable

const passwordContainer = document.getElementById('password-generated-container');  // Guardamos el contenedor en una variable

if (btnPassword) { //Comprobamos si existe el boton antes de ejecutar el codigo

    btnPassword.addEventListener("click", () => { // Agregamos un event listener al botón de generar contraseña
    
        const passwordLength = parseInt(document.getElementById("lengthPassword").value); // Obtenemos la longitud de la contraseña

        const password = passwordsGenerator(passwordLength); //Generamos y guardamos la contraseña en una variable

        if (!password) {

            passwordContainer.classList.add('hide') //Si por alguna situacion deja de verse la contraseña, desaparece el contenedor

            return;
        }

        passwordContainer.classList.remove('hide') // Hacemos que se vea el contenedor

        resultPasswordContainer.textContent = password; // Renderizamos la contraseña
    }); 
}


//=================RELOJ====================
import { printTime } from "./UTILS/clockUtils.js"; // Importamos las funciones para imprimir la hora

import { hourPhrases } from './DATA/clockData.js'; // Importamos el array con fraces para las distintas horas

const clockTime = document.getElementById('clock-time'); // Guardamos el contenedor en una variable

if (clockTime) { // Comprobamos si existe el contenedor del reloj

    printTime(hourPhrases) // Ejecutamos la funcion para renderizar el reloj

    setInterval(()=> printTime(hourPhrases), 1000); // Volvemos a ejecutar la funcion cada segundo para que se actualice el reloj
}