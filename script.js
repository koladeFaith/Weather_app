// Toastify
const toast = (text, backgound, color) => {
    Toastify({
        text: text,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: backgound,
            color: color,
        },
        onClick: function () { } // Callback after click
    }).showToast();
}
const apiKey = "bff842268ade253f4d4315b02a00624f";
const loadApi = async () => {
    const cityInfo = document.getElementById('city')
    cityInfo.value = cityInfo.value.toLowerCase()
    const temp = document.getElementById('temp')
    if (city === '') {
        toast('Fill in the input', '#f00', '#fff')
    } else {
        const api = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=${cityInfo.value}&appid=${apiKey}`
        const fetchApi = await fetch(api)
        let result = await fetchApi.json()
        console.log(result)
        if (result.cod === '404' && result.message === 'city not found') {
            toast('City not found', '#ff0', '#000')
            show.innerHTML = ''
            return
        }
        if (result.cod === '400' && result.message === 'Nothing to geocode') {
            toast('Fill in the input', '#f00', '#fff')
            show.innerHTML = ''
            return
        }
        show.innerHTML = `
                 <div class="weather-header" id="weather-header">
            <img
              src="https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png"
              alt="Weather Icon" />
            <div class="temp" id="temp">${result.main.temp}°C</div>
          </div>
<div class='location'>${result.name}, ${result.sys.country}</div>

`
        let descriptionText = '';
        if (result.weather[0].main === "Clear") {
            descriptionText = "☀️ Clear Sky";
        } else if (result.weather[0].main === "Clouds") {
            descriptionText = "☁️ Cloudy";
        } else if (result.weather[0].main === "Rain") {
            descriptionText = "🌧️ Rainy";
        } else if (result.weather[0].main === "Snow") {
            descriptionText = "❄️ Snowy";
        } else if (result.weather[0].main === "Thunderstorm") {
            descriptionText = "⛈️ Thunderstorm";
        } else {
            descriptionText = result.weather[0].description;
        }
        show.innerHTML += `<div class="description" id="description">${descriptionText}</div>
         <div id="humidity">💧 Humidity: ${result.main.humidity}%</div>

         `
        const windSpeed = result.wind.speed
        const speedKmh = Math.round(windSpeed * 3.6)
        show.innerHTML += `
             <div id="wind">🌬️ Wind: ${speedKmh} km/h</div>
        `

    }
}