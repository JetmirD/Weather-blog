const temperatureField = document.querySelector(".temp h2");
const locationField = document.querySelector(".time_location h3");
const dateField = document.querySelector(".time_location span")
const DailyTemp = document.querySelector(".DailyTemp p");
const searchField = document.querySelector(".search_area");
const feelLikes = document.querySelector(".feelLike");
const maindescription = document.querySelector(".maindescription");
const descriptionn = document.querySelector(".description");
const form = document.querySelector("form")

//Per hourly display
const hour_temp = document.getElementById("hour_temp")
const timee= document.getElementById("tablee")
const hourlyIcon = document.getElementById("hourly_icons")

//Per airConditions
const real_feel = document.getElementById("Real_feel")
const chance_rain = document.getElementById("Chance_of_rain")
const wind = document.getElementById("Wind")
const UV_index = document.getElementById("UV_index")

form.addEventListener('submit', searchForLocation)
let target = 'Kosovo'


const fetchResults = async(targetLocation)=>{

        let url = `https://api.weatherapi.com/v1/forecast.json?key=c8a101a2148e4ec5ab6191532232106&q=${targetLocation}&days=6&aqi=no&alerts=no`

        const res = await fetch(url)

        const data = await res.json()

        //Temperatura 
        const tempDisplay = data.current.temp_c;
    
        //condition
        const condition =data.current.condition.text;

        //icon
        const icon = data.current.condition.icon
        
        //Location Name
        const locationName = data.location.name
        const name = data.location.country

        const forecastdata = data.forecast.forecastday
        const dates = forecastdata.map((forecastItem) => forecastItem.date);

        forecastdata.forEach((forecastItem)=>{
            const date = forecastItem.date
            const tempDay = forecastItem.day.maxtemp_c

            //Kjo i dergon t dhanat ne updateform function     
            updateTodayWeather(tempDisplay, locationName, name, condition, icon, date, tempDay, dates)
        })
        // Clear previous data
        timee.innerHTML = ""; // Clear the content of the row before fetching new data
        hourlyIcon.innerHTML = ""; // Clear the content of the row before fetching new data



        //PER HOURLY WEATHER
        const forecastHourlyData = data.forecast.forecastday[0].hour;

        forecastHourlyData.forEach((forecastHourlyDataItem, index) => {
            const HourlyTemp = forecastHourlyDataItem.temp_c;
            const HourlyIcon = forecastHourlyDataItem.condition.icon;
            
            if (index % 4 === 0) {
          
            hourlyWeather(HourlyTemp, HourlyIcon);
            console.log(HourlyIcon  )

            }

          })
          

          //Air conditions

          const realfeel = data.current.feelslike_c;
          const chanceofrain = data.forecast.forecastday[0].day.daily_chance_of_rain
          const windkmh = data.current.wind_mph;
          const UVindex = data.current.uv
          
          AirCondition(realfeel, chanceofrain, windkmh, UVindex)

        }



    //Me marr motin e sotit
    function updateTodayWeather(temp, location, name, condition, icon, date, tempDay){ 

        //Temperatura
        temperatureField.innerText = temp + "°C"

        //per lokacion
        locationField.innerText = location +", "+ name
        const weatherIcon = document.getElementById("weatherIcon");
        weatherIcon.src = `${icon}`;

      
        //feelLike
        feelLikes.innerText = "Feels Like: "+condition; 

        // Append the forecast item text to the DailyTemp element
        const forecastItemText = `<b>${date}</b> - ${tempDay}°C<br>`;
        DailyTemp.innerHTML += forecastItemText;
  
    }

    //funksion per me marr motin hourly
    function hourlyWeather( HourlyTemp, HourlyIcon) {
        const tempDiv = document.createElement("div");
        const tempElement = document.createElement("p");

        const tempCell = document.createElement("td");
        tempCell.textContent = HourlyTemp.toString() + "°C"; // Convert HourlyTemp to a string
        tempElement.id = "hourlytemp";


        const imageCell = document.createElement("td");
        const imageElement = document.createElement("img");
        imageElement.src = HourlyIcon;
        imageElement.alt = "Weather Icon";
        imageCell.appendChild(imageElement);
      
        tempDiv.appendChild(tempElement);
      
        timee.appendChild(tempCell);

        hourlyIcon.appendChild(imageCell);

      }
      
      
      function AirCondition(realfeel, chanceofrain, windkmh, UVindex){
        real_feel.innerText = realfeel+" °C"
        chance_rain.innerText = chanceofrain+"%"
        wind.innerText = windkmh+" km/h"
        UV_index.innerText = UVindex
      }
    //Funksion per me marr vleren e search
    function searchForLocation(e){
            e.preventDefault()

            target = searchField.value
            fetchResults(target)
    
    }


fetchResults(target)
