// Definimos los caracteres que se pueden usar en la generación de contraseñas
const mayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const minusculas = "abcdefghijklmnopqrstuvwxyz";
const numeros = "0123456789";
const simbolos = "!@#$%^&*()-_=+";

// Funcion para generar un número aleatorio entre un rango dado (inclusive)
function random(max) {
  return Math.floor(Math.random() * max);
}

// Funcion para obtener un carácter aleatorio de un array
function getRandom(arrCaracteres) {
  return arrCaracteres[random(arrCaracteres.length)]; 
}

// Funcion para generar una contraseña aleatoria de una longitud dada
 export function passwordsGenerator(length) { // La función recibe la longitud deseada para la contraseña
    
    if (length < 12 || length > 50 ) { // Validamos que la longitud esté dentro de un rango razonable
        alert("Por favor, ingresa una longitud válida para la contraseña.");
        return;
    }

    let newPassword = [ // Inicializamos un array para construir la contraseña, asegurándonos de incluir al menos un carácter de cada tipo
        getRandom(mayusculas),
        getRandom(minusculas),
        getRandom(numeros),
        getRandom(simbolos)
    ];
    
    const allCharacters = mayusculas + minusculas + numeros + simbolos; // Concatenamos todos los caracteres en un solo array

    while (newPassword.length < length) { // Continuamos agregando caracteres aleatorios hasta alcanzar la longitud deseada
        newPassword.push(getRandom(allCharacters)); // Agregamos un carácter aleatorio de cualquier tipo
    }

    newPassword.sort(() => Math.random() - 0.5); // Mezclamos los caracteres para evitar patrones predecibles

    document.getElementById('password-generated-container').classList.remove('hide') //Cuando se renderiza la contraseña, se le quita la clase hide al contenedor

    return newPassword.join(""); // Convertimos el array de caracteres en una cadena y la retornamos
}