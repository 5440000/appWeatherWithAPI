// const form = document.forms.input;
const btnForm = document.getElementById("btn-form");

const parsCityName = (data) => {
  const cityName = document.getElementById("city-name");
  cityName.innerHTML = data.name + " ." + data.sys.country;
};
const parsFeelsLike = (data) => {
  const divFeelsLike = document.getElementById("feels");
  divFeelsLike.innerHTML = Math.floor(data.main.feels_like) + " &#176F";
};

const parsWindSpeed = (data) => {
  const div = document.getElementById("wind");
  div.innerHTML = data.wind.speed + " м/c";
};

const parsTemp = (data) => {
  const div = document.getElementById("temp");
  div.innerHTML = Math.floor(data.main.temp) + " &#176F";
};

const parsClouds = (data) => {
    const div = document.getElementById("img");
    console.log(data.weather[0].description);
    if (data.weather[0].description === "пасмурно") {
      div.src = "./img/cloudy.png"
    };
    if (data.weather[0].description === "переменная облачность") {
        div.src = "./img/mostlycloudy.png"
      }
};

// const parsDiscription = (data) => {
//     const div = document.getElementById("temp");
//     div.innerHTML = Math.floor(data.main.temp) + " &#176F";
//   };

const createDateToday = () => {
  const newDate = new Date().toLocaleString("ru", {
    day: "numeric",
    month: "long",
  });
  const divData = document.getElementById("date");
  divData.append(newDate);
};

const createTime = function JSClock() {
  var time = new Date();
  var hour = time.getHours();
  var minute = time.getMinutes();
  var temp = "" + (hour > 12 ? hour - 12 : hour);
  if (hour == 0) temp = "12";
  temp += (minute < 10 ? ":0" : ":") + minute;
  //   temp += hour >= 12 ? " p.m." : " a.m.";
  const divTime = document.getElementById("time");
  divTime.append(temp);
  return temp;
};

const getData = async function giveMeFreeDataPlease(url) {
  const promise = await fetch(url);
  const json = await promise.json();
  console.log("🚀 ~ file: script.js ~ line 18 ~ getApi ~ json", json);
  parsCityName(json);
  parsFeelsLike(json);
  parsWindSpeed(json);
  parsTemp(json);
  parsClouds(json);
};

btnForm.addEventListener("click", () => {
  const select = document.getElementById("select");

  const inputUser = select.value;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputUser}&appid=4e6b41e130188f910dd909c2ae141314&lang=ru`;

  getData(url);
});

createDateToday();
createTime();
