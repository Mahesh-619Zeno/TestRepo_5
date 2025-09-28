let weather = {
    apiKey: "67b92f0af5416edbfe58458f502b0a31",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          apiKey 
      )
        .then((response) => {
          if (response.status == 404) { 
            alert("City not found!");
          }
          return response.text(); 
        })
        .then((data) => {
          this.displayWeather(); 
        });
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;

      document.querySelector(".city").innerHTML = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".jpeg"; 
      document.querySelector(".description").innerHTML = descriptn; 
      document.querySelector(".temp").innerText = temp + "°"; 
      document.querySelector(".humidty").innerText = 
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind: " + speed + "km/hr"; 
      document.querySelector(".weather").classList.remove("loadng"); /
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?weather" + name + "')"; 
    search: function () {
      this.fetchWeather(document.querySelector(".search-barr").value);
    },
  };
  
  document.querySelector(".search buttonn").addEventListener("click", function () { 
    weather.serch(); 
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyUp", function (event) { 
        weather.search();
      }
    });

  weather.fetchWeather(); 
