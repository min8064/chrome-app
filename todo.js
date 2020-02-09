const toDoForm = document.querySelector(".js-toDoForm");
const toDoinput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList"); //pending
const fnList = document.querySelector(".js-finishedList"); //finished
let toDos = []; //Pending array
let fnDos = []; //finished array

function saveToDos() {
  localStorage.setItem("PENDING", JSON.stringify(toDos));
}

function saveFnDos() {
  localStorage.setItem("FINISHED", JSON.stringify(fnDos));
}

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function deleteFinish(event) {
  const btn = event.target;
  const li = btn.parentNode;
  fnList.removeChild(li);
  const cleanFnDos = fnDos.filter(function(fnDo) {
    return fnDo.id !== parseInt(li.id);
  });
  fnDos = cleanFnDos;
  saveFnDos();
}

function backTodo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  fnList.removeChild(li);
  const cleanFnDos = fnDos.filter(function(fnDo) {
    return fnDo.id !== parseInt(li.id);
  });
  fnDos = cleanFnDos;
  saveFnDos();
  paintToDo(li.querySelector("span").innerHTML);
}

function paintFnDo(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const backBtn = document.createElement("button");
  const newId = fnDos.length + 1;
  span.innerText = text;
  delBtn.innerText = "x";
  delBtn.addEventListener("click", deleteFinish);
  backBtn.innerText = "back";
  backBtn.addEventListener("click", backTodo);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(backBtn);
  li.id = newId;
  fnList.appendChild(li);
  const fnObj = {
    text: text,
    id: newId
  };
  fnDos.push(fnObj);
  saveFnDos();
}

function finishToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
  paintFnDo(li.querySelector("span").innerHTML);
}

function paintToDo(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const finBtn = document.createElement("button");
  const newId = toDos.length + 1;
  span.innerText = text;
  delBtn.innerText = "x";
  delBtn.addEventListener("click", deleteToDo);
  finBtn.innerText = "done";
  finBtn.addEventListener("click", finishToDo);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(finBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoinput.value;
  paintToDo(currentValue);
  toDoinput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem("PENDING");
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    });
  }
}

function loadFnDos() {
  const loadedFnDos = localStorage.getItem("FINISHED");
  if (loadedFnDos !== null) {
    const parsedFnDos = JSON.parse(loadedFnDos);
    parsedFnDos.forEach(function(fnDo) {
      paintFnDo(fnDo.text);
    });
  }
}

function init() {
  loadToDos();
  loadFnDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
