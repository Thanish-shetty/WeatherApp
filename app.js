const apiKey = "9328c6f9322c40119ef150257260408";

const cityInput = document.querySelector("#cityInput");
const searchBtn = document.querySelector("#searchBtn");
const message = document.querySelector("#message");
const weatherInfo = document.querySelector("#weatherInfo");

async function getWeather() {
  const city = cityInput.value.trim();

  // Stop if the input is empty.
  if (city === "") {
    message.textContent = "Please enter a city name.";
    weatherInfo.hidden = true;
    return;
  }

  message.textContent = "Loading weather...";
  weatherInfo.hidden = true;

  try {
    // Get current weather data for the entered city.
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`;
    const response = await fetch(url);
    const data = await response.json();

    // WeatherAPI returns an error object when a city is not found.
    if (!response.ok || data.error) {
      throw new Error(data.error?.message || "City not found.");
    }

    // Put the received data into the page.
    document.querySelector("#cityName").textContent = `${data.location.name}, ${data.location.country}`;
    document.querySelector("#condition").textContent = data.current.condition.text;
    document.querySelector("#temperature").textContent = data.current.temp_c;
    document.querySelector("#humidity").textContent = data.current.humidity;
    document.querySelector("#windSpeed").textContent = data.current.wind_kph;

    message.textContent = "";
    weatherInfo.hidden = false;
  } catch (error) {
    message.textContent = error.message || "Something went wrong. Please try again.";
  }
}

searchBtn.addEventListener("click", getWeather);

// Search when the user presses Enter in the input box.
cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getWeather();
  }
});
