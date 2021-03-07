const weather = document.querySelector(".js-weather");

const API_KEY = "58429235997d45bdfa99539c607bf4df"; // https://openweathermap.org/api
const COORDS = "coords";

/* fetch api를 이용하여 ajax로 openweather api의 날씨 데이터 수신 */
function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  ).then(function (response) {
    return response.json();
  }).then(function (json) {
    const temperature = json.main.temp;
    const place = json.name;
    weather.innerText = `${temperature} @ ${place}`;  //span 태그에 출력
  });
}

/* localstorage에 좌표 문자열로 변환하여 저장 */
function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

/* Geo location 정보를 얻는데 성공 시
위도와 경도를 받아서 객체로 만들어줌*/
function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude: latitude,
    longitude: longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);  // 좌표에 의한 날씨 정보 얻어오는 함수 실행
}

/* Geo location 정보 얻기 실패 시 경고*/
function handleGeoError() {
  console.log("Can't access geo location");
}

/* 현재 유저의 지역 정보를 얻어옴 */
function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

/* localStorage에 저장된 좌표정보 로드 */
function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {  //기존에 저장된 위치정보가 없을 경우 얻는 함수 실행
    askForCoords();
  } else {  // 있을 경우 json으로 변환 후 날씨 정보 얻어오는 함수 실행
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();