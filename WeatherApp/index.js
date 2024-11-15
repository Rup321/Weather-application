const userTab = document.querySelector("[data-userweather]")
const usercontainer = document.querySelector("[weather-container]")
const searchTab = document.querySelector("[data-searchweather]")
const grantAceessContainer = document.querySelector("[grantAceessContainer]")
// const searchform = document.getElementsByClassName("form-container")
const searchform = document.querySelector("[data-searchform]")
const loadingScreen = document.querySelector("[loading-container]")
const userinfoContainer = document.querySelector(".weather-info")
let oldTab = userTab;
const API_key = "9a2ecd72157095cd6fc03e30ef4c4330";
oldTab.classList.add("current-tab")
getfromSessionStorage();
function switched(newTab) {
    if (newTab != oldTab) {
        oldTab.classList.remove("current-tab")
        oldTab = newTab
        oldTab.classList.add("current-tab")
        if (!searchform.classList.contains("active")) {
            userinfoContainer.classList.remove("active");
            searchform.classList.add("active");
            grantAceessContainer.classList.remove("active")

        }
        else {
            searchform.classList.remove("active");
            userinfoContainer.classList.remove("active");
            getfromSessionStorage();
        }
    }
}
userTab.addEventListener("click", function () {
    switched(userTab)
})
searchTab.addEventListener("click", function () {
    switched(searchTab)
})

function getfromSessionStorage() {
    const loacalCordinates = sessionStorage.getItem("user-coordinates");
    if (!loacalCordinates) {
        grantAceessContainer.classList.add("active");
    }
    else {
        let coordinates = JSON.parse(loacalCordinates)
        fetchUserWeatherInfo(coordinates);

    }
}

async function fetchUserWeatherInfo(coordinates) {
    const { lat, lon } = coordinates;
    grantAceessContainer.classList.remove("active");
    loadingScreen.classList.add("active")
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`);
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userinfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch (err) {
        loadingScreen.classList.remove("active")
    }

}


function renderWeatherInfo(weatherInfo) {
    const cityname = document.querySelector("[data-cityname]")

    const countryIcon = document.querySelectorAll("[data-countryIcon]")
    const desc = document.querySelector("[data-weatherdes]")
    const weatherIcon = document.querySelector("[data-weathericon]")
    const windspeed = document.querySelector('[data-windspeed]')
    const humidity = document.querySelector("[data-humidity]")
    const cloudiness = document.querySelector("[data-cloudiness]")
    const temp = document.querySelector("[data-temp]")
    console.log(weatherInfo);
    cityname.innerText = weatherInfo?.name;

    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity} %`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all} %`;

}


function getlocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showposition)
    }
    else {
        alert("Loaction coordinates are not fetched")
    }
}
function showposition(position) {
    const usercordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }
    sessionStorage.setItem("user-coordinates", JSON.stringify(usercordinates));
    fetchUserWeatherInfo(usercordinates)
}
let grantbtn = document.querySelector("[grantacessBtn]")
grantbtn.addEventListener("click", getlocation)



const searchinput = document.querySelector("[data-searchinput]")
searchform.addEventListener("submit", function (e) {
    e.preventDefault();
    let cityname = searchinput.value;
    if (cityname === "") {
        alert("not getting data")
    }
    else {
        featchSearchWeather(cityname)
    }
})
async function featchSearchWeather(city) {
    loadingScreen.classList.add("active");
    grantAceessContainer.classList.remove("active");
    userinfoContainer.classList.remove("active")
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`
        );
        let data = await response.json();
        loadingScreen.classList.remove("active");
        userinfoContainer.classList.add("active")
        renderWeatherInfo(data);
    }
    catch (err) {
        alert("error is genertaed")
    }
}

