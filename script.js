const apiKey = "bff842268ade253f4d4315b02a00624f";
const loadApi = async () => {
    const api = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=${city.value}&appid=${apiKey}`
    const fetchApi = await fetch(api)
    let result = await fetchApi.json()
    console.log(result)
}