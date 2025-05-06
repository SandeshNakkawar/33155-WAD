document.addEventListener("DOMContentLoaded", () => {
  const temperature = document.getElementById("temperature");
  const cityInput = document.getElementById("cityInput");
  const searchBtn = document.getElementById("searchBtn");
  const conditions = document.getElementById("conditions");
  const humidity = document.getElementById("humidity");
  const cityName = document.getElementById("cityName");

  searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim().toLowerCase();
    if (city) {
      fetchData(city);
    } else {
      alert("Please enter a city name");
    }
});

    const fetchData = (city) => {
      const xhr = new XMLHttpRequest();

      xhr.open("GET", "weatherData.json", true);

      xhr.onload = function () {
        if (xhr.status === 200) {
          try {
            const weatherData = JSON.parse(xhr.response);

            if (weatherData[city]) {
              cityName.textContent =
                city.charAt(0).toUpperCase() + city.slice(1);
              temperature.textContent = weatherData[city].temperature;
              humidity.textContent = weatherData[city].humidity;
              conditions.textContent = weatherData[city].conditions;
            }else{
                alert('City not found in our database');
                resetWeatherDisplay();
            }
          } catch (error) {
            console.log('Error is ', error)
            alert('City not found in our database');
            resetWeatherDisplay();
          }
        }else {
            console.error('Error fetching weather data:', xhr.status);
            alert('Error fetching weather data');
            resetWeatherDisplay();
        }
        

      };
      
      xhr.onerror = function() {
        console.error('Network error occurred');
        alert('Network error occurred');
        resetWeatherDisplay();
    };
    
    // Send the request
    xhr.send();
    };
    function resetWeatherDisplay() {
        cityName.textContent = '-';
        temperature.textContent = '-';
        humidity.textContent = '-';
        conditions.textContent = '-';
    }
});
