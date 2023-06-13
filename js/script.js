const temperatureField = document.querySelector(".temp");
const locationField = document.querySelector(".time_location p");
const dateField = document.querySelector(".time_location span")
const weatherField = document.querySelector(".condition p");
const searchField = document.querySelector(".search_area");

const feelLikes = document.querySelector(".feelLike");
const maindescription = document.querySelector(".maindescription");
const descriptionn = document.querySelector(".description");

const form = document.querySelector("form")
// const weatherIcon = document.getElementById("weatherIcon");

form.addEventListener('submit', searchForLocation)
let target = 'Kosovo'

const fetchResults = async(targetLocation)=>{


    let url = `https://api.openweathermap.org/data/2.5/weather?q=${targetLocation}&appid=befc7d0348b2025a39f3e7683dee5b09`

    const res = await fetch(url)

    const data = await res.json()

    //Temperatura converter
    const tempKelvin = data.main.temp;
    const tempCelsius = (tempKelvin - 273.15).toFixed(0);
    const tempDisplay = `${tempCelsius}`;
    
    //Location Name
     const locationName = data.name
     const name = data.sys.country

     //feelLike
     const feelLikeKelvin = data.main.feels_like;
    const feelLikeCelcius = (feelLikeKelvin - 273.15).toFixed(0);
    const feelLike = `${"Feels Like: "+feelLikeCelcius+ "°C"}`

    //main_description
    

     //Icon, main description
     data.weather.forEach(item => {
        const icon = item.icon
        const main_description = item.main;
        const description = item.description
        updateForm(tempDisplay, locationName, name, icon, feelLike, main_description, description)

     });



}

    function updateForm(temp, location, name, icon, feelLike, main_description, description){ 
        temperatureField.innerText = temp + "°C"
// if(temp<30){
//     alert("asdad")
// }

        locationField.innerText = location +", "+ name
        const weatherIcon = document.getElementById("weatherIcon");
        weatherIcon.src = `https://openweathermap.org/img/wn/${icon}.png`;

        weatherIcon.alt = "Weather Icon";
      
        //feelLike
        feelLikes.innerText = feelLike; 
        //maindescription
        maindescription.innerText = main_description + ", "+description
        //description
    }


function searchForLocation(e){
        e.preventDefault()

         target = searchField.value
        fetchResults(target)
  
}

console.log(target)

fetchResults(target)