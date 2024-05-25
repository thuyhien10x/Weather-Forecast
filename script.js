document.addEventListener('DOMContentLoaded', function() {
    fetchWeather('Hanoi'); // Fetch weather for Hanoi on page load
});

function fetchWeather(city) {
    var location = city || document.getElementById('locationInput').value;
    if (location.trim() === '') {
        alert('Please enter a location.');
        return;
    }

    console.log("Fetching weather for:", location);
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };
       
        fetch("/forecast.php?location=" + encodeURIComponent(location), requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                updateWeatherDisplay(result); 
            })
            .catch(error => {
                console.error('Error fetching weather:', error);
                alert('Failed to fetch weather data.');
            });
}

            function updateWeatherDisplay(data) {
                    document.getElementById('currentCity').innerHTML = data.location.name;
                    document.getElementById('currentWeatherCondition').innerHTML = data.current.condition.text;
                    document.getElementById('currentTemp').innerHTML = data.current.temp_c;
                    document.getElementById('currentUv').innerHTML = data.current.uv;
                    document.getElementById('currentWind').innerHTML = data.current.wind_dir;
                    document.getElementById('currentPrecipitation').innerHTML =data.current.precip_mm;
                    document.getElementById('currentFeel').innerHTML = data.current.feelslike_c;
                    document.getElementById('currentHumidity').innerHTML = data.current.humidity;
                    document.getElementById('currentVisibility').innerHTML =data.current.vis_km;
                    document.getElementById('currentPressure').innerHTML = data.current.pressure_in;
                    document.getElementById('currentCloud').innerHTML = data.current.cloud;
                    console.log(data.current.air_quality.pm2_5);
                    document.getElementById('currentPM25').innerHTML = data.current.air_quality.pm2_5;

                    let html = '';
                    console.log( data.forecast.forecastday.length);
                    data.forecast.forecastday.forEach(day => {
                        let icon = day.day.condition.icon;
                   
                        const date = new Date(day.date);
                          const weekday = date.toLocaleString('en', { weekday: 'long' });  
                        console.log(date);
                        let avgTemp = day.day.avgtemp_c;
                        html += `
                        <div class="day-item" style="display: flex; justify-content: space-around; align-items: center;">
                            <div style="width: 90px;">
                                <p style="font-size: 13px; margin: 0;">${weekday}</p>
                            </div>
                            <img src="${icon}" style="height: auto;">
                            <p style="font-size: 13px; margin: 0;">${avgTemp}°C</p>
                        </div>`;
                });
                    document.getElementById('forecast').innerHTML = html;
    
                    const pm25 = data.current.air_quality.pm2_5;
                    let airQualityProgress = document.getElementById('airQualityProgress');
                    airQualityProgress.value = Math.min(pm25, 200);

                   
                    let qualityLabel = 'Good';
                    if (pm25 > 150.4) {
                        qualityLabel = 'Unhealthy';
                    } else if (pm25 > 55.4) {
                        qualityLabel = 'Unhealthy for Sensitive Groups';
                    } else if (pm25 > 35.4) {
                        qualityLabel = 'Moderate';
                    }
                    document.getElementById('airQualityLabel').innerHTML = qualityLabel;
}