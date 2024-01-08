Wetter-App mit OpenWeather API
Aufgabenstellung
In diesem Projekt erstellen wir gemeinsam eine Wetter-App unter Verwendung der Open Weather API. Die API-Dokumentation findest du hier.

Schritte
API-Key erhalten: Registriere dich auf der OpenWeather-Website, um deinen persönlichen API-Key zu erhalten. Diesen Schlüssel benötigen wir, um Daten von der API abzurufen.

Daten abrufen: Verwende den erhaltenen API-Key, um Wetterdaten von der Open Weather API abzurufen. Achte dabei auf die verschiedenen Endpunkte und Parameter, die die API anbietet.

App entwickeln: Nutze die abgerufenen Daten, um eine ansprechende App zu gestalten, die das aktuelle Wetter aufzeigt. Wir können gemeinsam überlegen, wie wir das Design und die Funktionen der App am besten umsetzen.

Hinweise
Bitte geh vertraulich mit deinem API-Key um und teile ihn nicht öffentlich.
Denke darüber nach, wie wir die Wetterdaten benutzerfreundlich und ansprechend darstellen können.
Wir können zusätzliche Funktionen hinzufügen, wie beispielsweise Wetterprognosen, Temperaturtrends oder standortbasierte Features.
Ressourcen
Open Weather API Dokumentation
Beispielcode
Hier ist ein einfaches Beispiel in Python mit der requests-Bibliothek:

python
Copy code
import requests

def get_weather(api_key, city):
    base_url = "https://api.openweathermap.org/data/2.5/weather"
    params = {"q": city, "appid": api_key}

    response = requests.get(base_url, params=params)

    if response.status_code == 200:
        weather_data = response.json()
        # Hier können wir die Daten weiterverarbeiten und die App gestalten
        print(weather_data)
    else:
        print(f"Fehler beim Abrufen der Wetterdaten: {response.status_code}")

# Beispielaufruf
api_key = "DEIN_API_KEY"
stadt = "Berlin"
get_weather(api_key, stadt)
Ersetze DEIN_API_KEY durch deinen tatsächlichen API-Key und wir können gemeinsam den Code nach unseren Bedürfnissen anpassen.

Viel Spaß beim gemeinsamen Entwickeln der Wetter-App!

Designet und entwickelt by Farhad und Philip
