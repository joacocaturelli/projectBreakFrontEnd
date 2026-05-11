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

import { printTime } from './UTILS/clockUtils.js'; // Importamos las funciones para imprimir la hora

import { hourPhrases } from './DATA/clockData.js'; // Importamos el array con fraces para las distintas horas

const clockTime = document.getElementById('clock-time'); // Guardamos el contenedor en una variable

if (clockTime) { // Comprobamos si existe el contenedor del reloj

    printTime(hourPhrases) // Ejecutamos la funcion para renderizar el reloj

    setInterval(()=> printTime(hourPhrases), 1000); // Volvemos a ejecutar la funcion cada segundo para que se actualice el reloj
}



//=================LINKS====================

import { linksGenerator } from './UTILS/linksUtils.js'; // Importamos la funcion para crear las tarjetas con links

const btnLinks = document.getElementById('btn-generate-link'); // Guardamos el boton en una variable

const linksName = document.getElementById('links-name'); // Guardamos el nombre del link puesto por el usuario

const urlLinks = document.getElementById('url-links'); // Guardamos el enlace URL puesto por el usuario

let linksArray = JSON.parse(localStorage.getItem('mis-links')) || [];; // Creamos un array para guardar los enlaces, si ya hay enlaces guardados en el localStorage los cargamos, sino lo inicializamos vacio


const saveToStorage = () => { // Funcion para guardar el array de enlaces en el localStorage

    localStorage.setItem('mis-links', JSON.stringify(linksArray)); 
};

const deleteLink = (id) => { // Funcion para eliminar un enlace del array y del localStorage

    linksArray = linksArray.filter(item => item.id !== id); // Filtramos el array para eliminar el enlace con el id que recibimos por parametro

    saveToStorage(); // Guardamos el array actualizado en el localStorage 
};

linksArray.forEach(linkObj => { // Si ya hay enlaces guardados en el localStorage, los renderizamos al cargar la pagina

    linksGenerator(linkObj, deleteLink); 
});

if (btnLinks) { // Comprobamos que exista el boton

    btnLinks.addEventListener('click', ()=> { // Le añadimos un listener 
        
        const title = linksName.value.trim(); // Guardamos el nombre del enlace que ingreso el usuario

        const link = urlLinks.value.trim(); // Guardamos el enlace URL que ingreso el usuario

        if (title && link) { // Comprobamos que los campos no esten vacios

            const newLink = { // Creamos un nuevo objeto 

                id: Date.now(), // ID único basado en tiempo
                title: title, // Nombre del enlace pueso por el usuario
                link: link // Enlace URL puesto por el usuario
            };

            linksArray.push(newLink); // Agregamos el nuevo enlace al array

            saveToStorage(); // Guardamos el array actualizado en el localStorage

            linksGenerator(newLink, deleteLink); // Llamamos a la funcion para crear la tarjeta con el nuevo enlace

            // Limpiar inputs
            linksName.value = '';
            urlLinks.value = '';
        }
    });
}