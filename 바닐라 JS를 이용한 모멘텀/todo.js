const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = []; // toDo들을 저장할 배열

/* ToDo 삭제 */
function deleteToDo(event) {
  const btn = event.target; // 이벤트가 발생한 타겟
  const li = btn.parentNode; // 이벤트가 발생한 타겟의 부모요소
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) { // toDos배열 안에 있는 각 요소들을 필터 함수 -> 삭제 버튼을 누른 li를 제외한 나머지 값들만 반환하여 다시 배열로 만듬
    return toDo.id !== parseInt(li.id); // 문자열을 숫자로
  });
  toDos = cleanToDos; // 삭제된 배열로 다시 재할당
  saveToDos();
}

/* ToDo들을 LocalStorage에 저장 */
function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // js Obj를 string으로 바꿔줌, localStorage는 string만 저장하기 때문에
}

/* ToDo를 화면에 표현 */
function paintToDo(text) {
  const li = document.createElement("li");  // html 요소를 만들어줌
  const delBtn = document.createElement("button");
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo); //del버튼 클릭시 삭제 함수 실행
  const span = document.createElement("span");
  span.innerText = text;
  const newId = toDos.length + 1; // 배열안에 아무것도 없을 시 앞으로 만들 요소에 1번 부여
  li.appendChild(span); // 요소의 자식요소로 추가
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = { //js obj
    text: text,
    id: newId
  };
  toDos.push(toDoObj); // 배열에 추가
  saveToDos(); // toDos 배열을 LS에 저장
}

/* submit의 기본 이벤트를 막고 input에 입력된 값으로 
paintToDo 실행
*/
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = ""; //수행 후 폼 초기화
}

/* 초기 ToDo 로드 */
function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) { //LS에 저장된 값이 있다면
    const parsedToDos = JSON.parse(loadedToDos); // string을 js obj로 바꿔줌
    parsedToDos.forEach(function (toDo) { // 배열의 각 항목의 text를 인자값으로 paintToDo 함수 실행
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit)
}

init();