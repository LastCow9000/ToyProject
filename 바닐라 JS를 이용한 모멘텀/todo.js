const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

const toDos = []; //

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // js Obj를 string으로 바꿔줌, localStorage는 string만 저장하기 때문에
}

function paintToDo(text) {
  const li = document.createElement("li");  // html 요소를 만들어줌
  const delBtn = document.createElement("button");
  delBtn.innerText = "❌";
  const span = document.createElement("span");
  span.innerText = text;
  const newId = toDos.length + 1;
  li.appendChild(span); // 요소의 자식요소로 추가
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = { //js obj
    text: text,
    id: newId
  };
  toDos.push(toDoObj); // 배열에 추가
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = ""; //수행 후 폼 초기화
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos); // string을 js obj로 바꿔줌
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit)
}

init();