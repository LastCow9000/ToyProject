const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_Local_Storage = "currentUser"
SHOWING_Class_Name = "showing";

/* LocalStroage에 폼에 입력한 유저명 저장 */
function saveName(userName) {
  localStorage.setItem(USER_Local_Storage, userName);
}

/* submit의 기본 이벤트를 막고 input에 입력된 값으로 
유저명 저장, 인사말 작성 함수 실행
*/
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

/* 입력폼을 보여주는 함수 */
function askForName() {
  form.classList.add(SHOWING_Class_Name);
  form.addEventListener("submit", handleSubmit);
}

/* 입력폼을 사라지게 하고 인사말을 작성하는 함수 */
function paintGreeting(userName) {
  form.classList.remove(SHOWING_Class_Name);
  greeting.classList.add(SHOWING_Class_Name);
  greeting.innerHTML = `Hello ${userName}`;
}

/* LocalStroage에 있는 값 로드해서 
  값이 없다면 이름작성폼 함수 실행
  값이 있다면 인사말 작성 함수 실행
  */
function loadName() {
  const currentUser = localStorage.getItem(USER_Local_Storage);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();