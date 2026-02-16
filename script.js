// Visual API access : https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchcity}?key=LKSTPX6SU6S3F5ZY9457JG4UF
// GIPHY API access : https://api.giphy.com/v1/gifs/translate?api_key=5tSkjZdDaKdL2UIpy7mGQY9lLhuY7zp5&s=${searchitem}

const searchinput = document.getElementById("searchinput");
const searchbtn = document.getElementById("searchbtn");
const temperaturecontent = document.getElementById("temperaturecontent");
const humiditycontent = document.getElementById("humiditycontent");
const weathergif = document.getElementById("weathergif");

async function getWeather() {
  try {
    const searchcity = searchinput.value;

    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchcity}?key=LKSTPX6SU6S3F5ZY9457JG4UF`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const weatherdata = await response.json();

    const tempF = weatherdata.currentConditions.temp;
    const tempC = Math.round((tempF - 32) * 5 / 9);

    temperaturecontent.textContent =
      `Current temperature in ${weatherdata.address} is ${tempF}°F / ${tempC}°C`;

    humiditycontent.textContent =
      `Humidity: ${weatherdata.currentConditions.humidity}%`;

    const weatherCondition = weatherdata.currentConditions.conditions;
    const gifSearchTerm = ` ${weatherCondition} weather `;

    getWeatherGIF(gifSearchTerm);

  } catch (error) {
    console.error(error);
    temperaturecontent.textContent = "Unable to fetch weather data.";
  }
}

async function getWeatherGIF(condition) {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=5tSkjZdDaKdL2UIpy7mGQY9lLhuY7zp5&s=${encodeURIComponent(condition)}`
    );

    if (!response.ok) {
      throw new Error("GIF not found");
    }

    const data = await response.json();

    weathergif.src =
      data.data.images.original.url;

  } catch (error) {
    console.error(error);
  }
}


searchbtn.addEventListener("click", getWeather);