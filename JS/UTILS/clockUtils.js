function formatTime (num) { // Funcion para formatear la hora

    return String(num).padStart(2, "0"); // Si la longitud del numero es menor a 2 le agregamos el 0 delante
}

const clockTime = document.getElementById('clock-time');

const clockDate = document.getElementById('clock-date');

export function printTime (phrases) { // Exportamos la funcion para imprimir la hora

    let fechaActual = new Date(); // Creamos el objeto Date con la fecha actual y la guardamos en una variable

    // Guardamos info en variables y aplicamos el formateo
    let horas = formatTime(fechaActual.getHours()) 
    let horasNum = fechaActual.getHours() // Esta variable no la transformamos a string para hacer las comparaciones correctamente
    let minutos = formatTime(fechaActual.getMinutes())
    let minutosNum = fechaActual.getMinutes()
    let segundos = formatTime(fechaActual.getSeconds())
    let dias = formatTime(fechaActual.getDate())
    let mes = formatTime(fechaActual.getMonth() + 1) // Los meses tienen indice 0
    let año = fechaActual.getFullYear() // El año no necesita formateo

    let clockSentence = document.getElementById('clock-sentence');

    // Definimos cada frase en el intervalo de horas adecuado
    if (horasNum < 7 || (horasNum === 7 && minutosNum === 0)) {
        clockSentence.textContent = phrases[0]
    } else if (horasNum < 12 || (horasNum === 12 && minutosNum === 0)) {
        clockSentence.textContent = phrases[1]
    } else if (horasNum < 14 || (horasNum === 14 && minutosNum === 0)) {
        clockSentence.textContent = phrases[2]
    } else if (horasNum < 16 || (horasNum === 16 && minutosNum === 0)) {
        clockSentence.textContent = phrases[3]
    } else if (horasNum < 18 || (horasNum === 18 && minutosNum === 0)) {
        clockSentence.textContent = phrases[4]
    } else if (horasNum < 22 || (horasNum === 22 && minutosNum === 0)) {
        clockSentence.textContent = phrases[5]
    } else {
        clockSentence.textContent = phrases[6]
    }

    clockTime.textContent = `${horas}:${minutos}:${segundos}` //Imprimimos la hora

    clockDate.textContent = `${dias}/${mes}/${año}` //Imprimimos la fecha
};