//1 Cash the dom or Define our UI variabes
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collections");
const cardBtn = document.querySelector(".clear-task");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");
const design = document.querySelector("#main");

//2 Load all event Listeners
loadEventListeners();
function loadEventListeners() {
  //add task event
  form.addEventListener("submit", addTask);
  //remove task
  taskList.addEventListener("click", removeTask);
  //clear Task Event
  cardBtn.addEventListener("click", clearTasks);
  //background body design
  //   design.addEventListener("mousemove", bodyDesign);
  //filter taskEvents
  filter.addEventListener("keyup", filterTasks);
  //dom load event
  document.addEventListener("DOMContentLoaded", getTasks);
}

//10 GET TASKS FROM LOCAL STORAGE
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function(task) {
    //create li element
    const li = document.createElement("li");
    //add a class
    li.className = "collection-item";
    //create text node and append to li
    li.appendChild(document.createTextNode(task));
    // creare new link element
    const link = document.createElement("a");
    //add class
    link.className = "delete-item list-group-item-secondary";
    //add icon html
    link.innerHTML = '<a href="#">X</a>';

    //append link to li
    li.appendChild(link);
    taskList.appendChild(li);
  });
}

// 3 ADD TASK FUNCTION
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  } else {
    //create li element
    const li = document.createElement("li");
    //add a class
    li.className = "collection-item";
    //create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // creare new link element
    const link = document.createElement("a");
    //add class
    link.className = "delete-item list-group-item-secondary";
    //add icon html
    link.innerHTML = '<a href="#">X</a>';

    //append link to li
    li.appendChild(link);
    taskList.appendChild(li);

    // 9 STORE TASK IN LOCAL STORAGE
    storeTaskInLocalStorage(taskInput.value);

    //clear input
    taskInput.value = "";
  }

  e.preventDefault();
}

//8 LOCAL STORAGE FUNCTION
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 4 REMOVE TASK FUNCTION
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("are you sure?")) {
      e.target.parentElement.parentElement.remove();

      //removeTaskFromLocalStorage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function(task) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 5 CLEAR TASK FUNCTION
function clearTasks() {
  //clear task list
  taskList.innerHTML = "";

  //faster in the console
  while (taskList.firstChild) {
    taskList.remove(taskList.firstChild);
  }
  clearTaskFromLocalStorage();
}
function clearTaskFromLocalStorage() {
  localStorage.clear();
}

// //7 BODY DESIGN FUNCTION
// function bodyDesign(e) {
//   document.body.style.backgroundColor = `rgb(${e.offsetX}, ${e.offsetY}, 40)`;
// }

//6 FILTER TASK FUNCTION
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) !== -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
