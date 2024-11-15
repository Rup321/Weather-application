console.log("weather application")
const API_key = "9a2ecd72157095cd6fc03e30ef4c4330";
async function weatherShow() {
    // let longi = 15.4222;
    // let latitude = 12.669;

    const city = "Goa";

    let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`)
    let response = await data.json()
    console.log("Response is: ", response);
    document.getElementById("para").innerHTML = response;
}
weatherShow();
async function getWeatherDetails() {
    try {

        let lat = 15.4222;
        let lon = 12.669;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`)
        const data = await response.json()
        console.log(data)
    }

    catch (err) {
        console.log("error is", err)
    }
}
getWeatherDetails()
x = document.getElementById("id")

function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showposition)
    }
    else {
        console.log("erroe occured")
    }


}
function showposition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
}

