//Define our UI variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filterText = document.querySelector("#filter");
const taskInput = document.querySelector("#task");
const taskBtn = document.querySelector(".btn");
const startBtn = document.querySelector(".start-btn");
const start = document.getElementById("start");
const insidePage = document.getElementById("inside-page");
// const filter = document.getElementById("filter");

loadEventListeners();

function loadEventListeners() {
  startBtn.addEventListener("click", startApp);
  document.addEventListener("DOMContentLoaded", getTasks);
  form.addEventListener("submit", addTask);
  taskList.addEventListener("click", removeTask);
  clearBtn.addEventListener("click", clearTask);
  filterText.addEventListener("keyup", filter);
}

//enter todo app
function startApp() {
  insidePage.style.display = "block";
  start.style.display = "none";
}

//get task from localstorage
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    //create li
    let li = document.createElement("li");
    //add a className
    li.className = "list-Item";
    //append text node
    li.appendChild(document.createTextNode(task));
    //create link
    let deleteItem = document.createElement("a");
    //give it a class name
    deleteItem.className = "delete-item secondary-content";
    //add icon
    deleteItem.innerHTML = '<i class="fa fa-remove"></i>';
    //append to li
    li.appendChild(deleteItem);
    //append to ul
    taskList.appendChild(li);
  });
}

function addTask(e) {
  // console.log(taskInput.value);

  //check if input was inserted before submmit
  if (taskInput.value === "") {
    alert("Please insert a task...");
  } else {
    //create an li
    let li = document.createElement("li");
    //add a className
    li.className = "list-Item";
    //append text node
    li.appendChild(document.createTextNode(taskInput.value));
    //create link
    let deleteItem = document.createElement("a");
    //give it a class name
    deleteItem.className = "delete-item secondary-content";
    //add icon
    deleteItem.innerHTML = '<i class="fa fa-remove"></i>';
    //append to li
    li.appendChild(deleteItem);
    //append to ul
    taskList.appendChild(li);

    //storeInLocalStorage
    storeInLocalStorage(taskInput.value);
    //clear input
    taskInput.value = "";
  }

  e.preventDefault();
}

function removeTask(e) {
  if (e.target.parentElement.className ="delete-item") {
    e.target.parentElement.parentElement.remove();
  }

  //remove task from local storage
  removeTaskFromLocalStorage(e.target.parentElement.parentElement);
}

//Remove from local storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearTask(e) {
  taskList.innerHTML = "";

  clearTaskFromLocalStorage();
}

function clearTaskFromLocalStorage() {
  localStorage.clear();
}

//fillter task;
function filter(e) {
  const text = e.target.value.toLowerCase();
  console.log(text);

  document.querySelectorAll("li").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

//store in local storage
function storeInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
