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

    if (data && data.name && data.main && data.weather && data.sys && data.coord && data.timezone) {
        locationNameElement.textContent = `Wetter in ${data.name}`;

        const temperatureValue = data.main.temp !== undefined ? Math.round(data.main.temp - 273.15) : undefined;
        temperatureElement.innerHTML = temperatureValue !== undefined ? `<div id="temperatureValue" style="font-size: ${calculateFontSize(temperatureValue)};">${temperatureValue}°C</div>` : `<div id="temperatureValue">Temperatur nicht verfügbar</div>`;

        const weatherDescription = data.weather[0].description.toLowerCase();
        weatherIconElement.innerHTML = getWeatherIcon(weatherDescription);

        const localTime = new Date((data.dt + data.timezone) * 1000); // Berücksichtige die Zeitzone
        localTimeElement.textContent = `Lokalzeit: ${localTime.toLocaleTimeString()}`;


        windSpeedElement.textContent = `Windgeschwindigkeit: ${data.wind ? data.wind.speed : 'N/A'} m/s`;
        cloudinessElement.textContent = `Bewölkung: ${data.weather[0].description || 'N/A'}`;
        pressureElement.textContent = `Luftdruck: ${data.main.pressure ? data.main.pressure + ' hPa' : 'N/A'}`;
        humidityElement.textContent = `Luftfeuchtigkeit: ${data.main.humidity ? data.main.humidity + ' %' : 'N/A'}`;
        sunriseElement.textContent = `Sonnenaufgang: ${data.sys.sunrise ? new Date(data.sys.sunrise * 1000 + data.timezone * 1000).toLocaleTimeString() : 'N/A'}`;
        sunsetElement.textContent = `Sonnenuntergang: ${data.sys.sunset ? new Date(data.sys.sunset * 1000 + data.timezone * 1000).toLocaleTimeString() : 'N/A'}`;
        geoCoordsElement.textContent = `Geografische Koordinaten: [${data.coord.lat || 'N/A'}, ${data.coord.lon || 'N/A'}]`;
    } else {
        console.error("Ungültige oder unvollständige Datenstruktur in der API-Antwort.");
        alert("Ungültige oder unvollständige Datenstruktur in der API-Antwort.");
    }
}

function getWeatherIcon(description) {
    const lowercaseDescription = description.toLowerCase();
    const weatherIcons = {
        'sun': '<img src="./assets/img/sonnig.png" alt="Sonnig" style="width: 100px; height: 100px;">',
        'few clouds': '<img src="./assets/img/wolkig.png" alt="Wolkig" style="width: 100px; height: 100px;">',
        'overcast clouds': '<img src="./assets/img/teilSonneTeilewolkeregen.png" alt="Teilweise Sonne, Teile Wolken, Regen" style="width: 100px; height: 100px;">',
        'ice': '<img src="./assets/img/eissig.png" alt="Eisig" style="width: 100px; height: 100px;">',
        'rain': '<img src="./assets/img/regen.png" alt="Regen" style="width: 100px; height: 100px;">',
        'heavy snow': '<img src="./assets/img/schnee.png" alt="Schnee" style="width: 100px; height: 100px;">'
    };

    return weatherIcons[lowercaseDescription] || description;
}

function calculateFontSize(temperature) {
    return `${Math.max(20, 40 - temperature)}px`;
}
function getWeatherIcon(description) {
    const lowercaseDescription = description.toLowerCase();

    if (lowercaseDescription.includes('sun') || lowercaseDescription.includes('clear sky') || lowercaseDescription.includes('haze') || lowercaseDescription.includes('smoke')) {
        return '<img src="./assets/img/sonnig.png" alt="Sonnig" style="width: 100px; height: 100px;">';
    } else if (lowercaseDescription.includes('few clouds') || lowercaseDescription.includes('overcast') || lowercaseDescription.includes('broken clouds')) {
        return '<img src="./assets/img/wolkig.png" alt="Wolkig" style="width: 100px; height: 100px;">';
    } else if (lowercaseDescription.includes('overcast clouds') || lowercaseDescription.includes('scattered clouds')) {
        return '<img src="./assets/img/teilSonneTeilewolkeregen.png" alt="Teilweise Sonne, Teile Wolken, Regen" style="width: 100px; height: 100px;">';
    } else if (lowercaseDescription.includes('ice')) {
        return '<img src="./assets/img/eissig.png" alt="Eisig" style="width: 100px; height: 100px;">';
    } else if (lowercaseDescription.includes('rain') || lowercaseDescription.includes('light rain')) {
        return '<img src="./assets/img/regen.png" alt="Regen" style="width: 100px; height: 100px;">';
    } else if (lowercaseDescription.includes('heavy snow')) {
        return '<img src="./assets/img/schnee.png" alt="Schnee" style="width: 100px; height: 100px;">';
    } else {
        return description;
    }
}


function calculateFontSize(temperature) {
    return `${Math.max(20, 40 - temperature)}px`;
}

