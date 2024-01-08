const apiKey = "41ad82297cf0fd9fcb842c3a02bb8abd";


function checkWeather() {
    const locationName = document.getElementById("locationInput").value;

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationName}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error("Fehler beim Abrufen der Wetterdaten:", error);
            alert("Fehler beim Abrufen der Wetterdaten. Überprüfe die Konsole für Details.");
        });
}

function displayWeather(data) {

    const locationNameElement = document.getElementById("locationName");
    const temperatureElement = document.getElementById("temperature");
    const weatherIconElement = document.getElementById("weatherIcon");
    const localTimeElement = document.getElementById("localTime");
    const windSpeedElement = document.getElementById("windSpeed");
    const cloudinessElement = document.getElementById("cloudiness");
    const pressureElement = document.getElementById("pressure");
    const humidityElement = document.getElementById("humidity");
    const sunriseElement = document.getElementById("sunrise");
    const sunsetElement = document.getElementById("sunset");
    const geoCoordsElement = document.getElementById("geoCoords");


    if (data && data.name && data.main && data.weather && data.sys && data.coord) {

        locationNameElement.textContent = `Wetter in ${data.name}`;

        if (data.main.temp !== undefined) {
            temperatureElement.innerHTML = `<div id="temperatureValue">${Math.round(data.main.temp - 273.15)}°C</div>`;
        } else {
            temperatureElement.innerHTML = `<div id="temperatureValue">Temperatur nicht verfügbar</div>`;
        }

        const weatherDescription = data.weather[0].description.toLowerCase();
        weatherIconElement.innerHTML = getWeatherIcon(weatherDescription);

        localTimeElement.textContent = `Lokalzeit: ${new Date(data.dt * 1000).toLocaleTimeString()}`;
        windSpeedElement.textContent = `Windgeschwindigkeit: ${data.wind ? data.wind.speed : 'N/A'} m/s`;
        cloudinessElement.textContent = `Bewölkung: ${data.weather[0].description || 'N/A'}`;
        pressureElement.textContent = `Luftdruck: ${data.main.pressure ? data.main.pressure + ' hPa' : 'N/A'}`;
        humidityElement.textContent = `Luftfeuchtigkeit: ${data.main.humidity ? data.main.humidity + ' %' : 'N/A'}`;
        sunriseElement.textContent = `Sonnenaufgang: ${data.sys.sunrise ? new Date(data.sys.sunrise * 1000).toLocaleTimeString() : 'N/A'}`;
        sunsetElement.textContent = `Sonnenuntergang: ${data.sys.sunset ? new Date(data.sys.sunset * 1000).toLocaleTimeString() : 'N/A'}`;
        geoCoordsElement.textContent = `Geografische Koordinaten: [${data.coord.lat || 'N/A'}, ${data.coord.lon || 'N/A'}]`;
    } else {
        console.error("Ungültige oder unvollständige Datenstruktur in der API-Antwort.");
        alert("Ungültige oder unvollständige Datenstruktur in der API-Antwort.");
    }
}

function getWeatherIcon(description) {
    const lowercaseDescription = description.toLowerCase();

    if (lowercaseDescription.includes('sun') || lowercaseDescription.includes('clear sky') || lowercaseDescription.includes('haze') || lowercaseDescription.includes('smoke')) {
        return '<img src="./assets/img/sonnig.png" alt="Sonnig" style="width: 50px; height: 50px;">';
    } else if (lowercaseDescription.includes('few clouds') || lowercaseDescription.includes('overcast')) {
        return '<img src="./assets/img/wolkig.png" alt="Wolkig" style="width: 50px; height: 50px;">';
    } else if (lowercaseDescription.includes('overcast clouds')) {
        return '<img src="./assets/img/teilSonneTeilewolkeregen.png" alt="Teilweise Sonne, Teile Wolken, Regen" style="width: 50px; height: 50px;">';
    } else if (lowercaseDescription.includes('ice')) {
        return '<img src="./assets/img/eissig.png" alt="Eisig" style="width: 50px; height: 50px;">';
    } else if (lowercaseDescription.includes('rain')  || lowercaseDescription.includes('light rain')) {
        return '<img src="./assets/img/regen.png" alt="Regen" style="width: 50px; height: 50px;">';
    } else if (lowercaseDescription.includes('heavy snow')) {
        return '<img src="./assets/img/schnee.png" alt="Schnee" style="width: 50px; height: 50px;">';
    } else {
        return description;
    }
}

