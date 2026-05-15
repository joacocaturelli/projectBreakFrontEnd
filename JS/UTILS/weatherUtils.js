const defaultCity = 'Barcelona'; // Ciudad por defecto por si ocurre algun error

export const getLocalWeather = () => { // Funcion para buscar la localizacion del usuario

    if (navigator.geolocation) { // Comprobamos si el navegador soporta geolocalización

        navigator.geolocation.getCurrentPosition( // Usamos el metodo para tomar la localizacion del usuario

            (position) => {

                const location = `${position.coords.latitude}, ${position.coords.longitude}` // Guardamos la latitud y longitud

                fetchWeather(location); // Con estas coordenadas, llamamos a la API
            },
            (error) => {
                console.error("El usuario denegó el acceso o hubo un error", error); // El usuario no acepto la geolocalizacion o fallo la api
                
                fetchWeather(defaultCity) // Dejamos lista una ciudad por defecto
            }
        );
    } else {

        console.log("Tu navegador no soporta geolocalización"); // Si el ordenador es muy viejo y no soporta geolocalizacion

        fetchWeather(defaultCity)
    }
};


const fetchWeather = async (location) => { // Funcion para llamar a la API 

    const apiKey = 'e724bf96508349c990f151349262004' 

    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=2&aqi=no` // La URL de la API con la key y la localizacion

    try {

        const response = await fetch(url) // Llamamos a la API

        if (!response.ok) throw new Error('Error en la respuesta de la API')

        const data = await response.json() // Parseamos la respuesta a JSON

        renderWeather(data) // Llamamos a la funcion de renderizar pasandole la respuesta parseada

    } catch (error) {

        console.error('No se pudo obtener el clima', error);
    }
}

const renderWeather = (data) => { // Funcion para renderizar el widget

    if (!data) {
        console.error("No se recibieron datos válidos de la API", data);
        return;
    }

    // Guardamos la informacion necesaria
    const city = data.location.name;
    const country = data.location.country;
    const tempActual = Math.round(data.current.temp_c);
    const condition = data.current.condition.text;
    const iconActual = `https:${data.current.condition.icon}`;
    const precipitaciones = data.current.chance_of_rain;
    const humidity = data.current.humidity;
    const viento = data.current.wind_kph;
    const uv = data.current.uv;
    const rain = data.current.chance_of_rain;

    const todayHours = data.forecast.forecastday[0].hour; // Obtenemos el pronostico de hoy
    const tomorrowHours = data.forecast.forecastday[0].hour; // Obtenemos el pronostico de mañana
    const allHours = [...todayHours, ...tomorrowHours]; // Unimos todas las horas en un solo array

    const currentHour = new Date().getHours(); // Obtenemos la hora actual del usuario

    const next24Hours = allHours.slice(currentHour + 1, currentHour + 25); // Guardamos las proximas 24 horas del usuario

    const hourHTML = next24Hours.map(hora => {

        const hourStr = hora.time.split(' ')[1]; // Extraemos la hora
        const tempHour = Math.round(hora.temp_c); // Extraemos la temperatura
        const iconHour = `https:${hora.condition.icon}`; // Extraemos el icono

        // Creamos la tarjeta de cada hora
        return `
            <div class="hour-item">
                <span class="hour-time">${hourStr}</span>
                <img src="${iconHour}" alt="clima" class="hour-icon" />
                <span class="hour-temp">${tempHour}°C</span>
            </div>
        `
    }).join(' ')
  
    const widget = document.getElementById('weather-container') // Guardamos el contenedor en una variable

    if (widget) {

        // Creamos el HTML para la tarjeta con el widget
        widget.innerHTML = `
            <div class='widget-card card'>
                <div class='main-temperature-container'>
                    <div class='location-container'>
                        <p class='weather-location'>${city} / ${country}</p>
                        <p class='weather-condition'>${condition}</p>
                    </div>
                    <div class='temperature-container'>
                        <div class='icon-container'>
                            <img src='${iconActual}' alt='${condition}' class='weather-icon' />
                            <p class='weather-temperature'>${tempActual}°C</p>
                        </div>
                        <div class='info-container'>
                            <p class='weather-precipitations'>Precipitaciones: ${precipitaciones}%</p>
                            <p class='weather-rain'>Probabilidad de lluvia: ${rain}%</p>
                            <p class='weather-humidity'>Humedad: ${humidity}%</p>
                            <p class='weather-wind'>Viento: ${viento}Km/h</p>
                            <p class='weather-uv'>Rayos UV: ${uv}</p>
                        </div>
                    </div> 
                </div>
                <div class='forecast-24hs'>
                    ${hourHTML}
                </div>
            </div>
        
        `
    }
    
}
