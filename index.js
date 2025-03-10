const weatherSection = document.querySelector('#weatherSection')
const skyBody = document.querySelector('#skyBody')
// const dayTime = new Date().getHours()
const browserWidth = window.innerWidth
const API_KEY = "587e68d48da6132276762c7c6cf629aa"
const API_ADRESS = `https://api.openweathermap.org/data/2.5/weather`
const dataContainer = document.createElement('div')

// Test-Tageszeit
const dayTime = 8

const calcPosition = () => {
    let position = 0;

    if (dayTime >= 6 && dayTime < 18) {
        // Sonne bewegt sich von 6 bis 18 Uhr über den Bildschirm
        position = ((dayTime - 6) / 12) * browserWidth;
    } else {
        // Mond bewegt sich von 18 bis 6 Uhr über den Bildschirm
        const nightTime = (dayTime >= 18) ? (dayTime - 18) : (dayTime + 6);
        position = (nightTime / 12) * browserWidth;
    }

    return position;
}

calcPosition()

if (dayTime > 5 && dayTime < 18) {
    // lade alles für Tag
    weatherSection.style.background = "url(./images/day.gif) 100%/100% no-repeat";
    skyBody.src = "./images/sun.png"
} else {
    // lade alles für Nacht
    weatherSection.style.background = "url(./images/night.gif) 100%/cover no-repeat";
    skyBody.src = "./images/moon.png"
}

skyBody.style.left = `${calcPosition()}px`;

const fetchWeatherData = (city = "Miami") => {
    fetch(`${API_ADRESS}?q=${city}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            dataContainer.innerHTML = ""
            dataContainer.innerHTML = `
                <p>${data.name}</p>
                <p>${data.weather[0].description}</p>
                <p>${(data.main.temp - 273.15).toFixed(2)}°C</p>
                <p class="cold">${(data.main.temp_min - 273.15).toFixed(2)}°C</p>
                <p class="hot">${(data.main.temp_max - 273.15).toFixed(2)}°C</p>
            `
            weatherSection.append(dataContainer)
        })
        .catch(err => console.log(err))
}
fetchWeatherData()

document.querySelector('#searchForm').addEventListener('submit', e => {
    e.preventDefault()
    fetchWeatherData(e.target.search.value)
})