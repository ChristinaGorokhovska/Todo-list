const input = document.getElementById("input");
const inputEdit = document.getElementById("inputEdit");
const addBtn = document.querySelector(".add-btn");
const todoItems = document.querySelector(".todo-items");
const deleteAllBtn = document.querySelector(".delete-all");

// Display previous tasks
displayToDoList();

// Add task
function addTask(task) {
  let todoList =
    localStorage.getItem("todoList") != null && localStorage.getItem("todoList").length > 0
      ? JSON.parse(localStorage.getItem("todoList"))
      : [];

  let newTask = {
    id: Date.now(),
    val: task.trim(),
    checkBox: false,
  };

  todoList.push(newTask);
  localStorage.setItem("todoList", JSON.stringify(todoList));

  input.value = "";
}

// Edit task
function editTask(id, taskValue) {
  const modal = document.querySelector("#modal");
  openModal(modal, taskValue);

  document.querySelector(".edit-btn").addEventListener("click", () => {
    if (document.querySelector(".msgBox")) {
      document.querySelector(".inputEdit").removeChild(document.querySelector(".msgBox"));
    }

    if (checkIfEmpty(inputEdit)) {
      const newTaskValue = modal.querySelector("input").value.trim();

      let todoList = JSON.parse(localStorage.getItem("todoList"));
      const index = todoList.findIndex(function (obj) {
        return obj.id == id;
      });

      todoList[index].val = newTaskValue;
      localStorage.setItem("todoList", JSON.stringify(todoList));

      closeModal(modal);
      displayToDoList();
    } else {
      let msgElement = document.createElement("p");
      msgElement.classList = "msgBox";
      msgElement.innerHTML = `Can not add empty task`;

      document.querySelector(".inputEdit").appendChild(msgElement);
    }
  });
}

// Delete task
function deleteTask(id) {
  let todoList = JSON.parse(localStorage.getItem("todoList"));

  todoList.splice(
    todoList.findIndex(function (obj) {
      return obj.id == id;
    }),
    1
  );

  localStorage.setItem("todoList", JSON.stringify(todoList));
  displayToDoList();
}

// Delete all
function deleteAll() {
  localStorage.removeItem("todoList");
}

// Display all tasks
function displayToDoList() {
  if (localStorage.getItem("todoList") != null && JSON.parse(localStorage.getItem("todoList")).length > 0) {
    let todoList = JSON.parse(localStorage.getItem("todoList"));
    todoItems.innerHTML = "";

    todoList.forEach((item) => {
      todoItems.innerHTML += `<li><input id="${item.id}" type="checkbox" ${
        item.checkBox ? "checked" : ""
      } onclick="checkBoxSelection(${item.id})"><span></span><p>${
        item.val
      }</p><img class="edit" data-modal-target="#modal" onclick="editTask(${item.id}, '${
        item.val
      }')" src="./img/pencil.svg" alt="edit"><img class="delete" data-delete="${item.id}" onclick="deleteTask(${
        item.id
      })" src="./img/bin.svg" alt="delete"></li>`;
    });

    document.querySelector(".delete-all").style.display = "inline-block";
  } else {
    todoItems.innerHTML = `<p>There are not tasks</p>`;
    document.querySelector(".delete-all").style.display = "none";
  }
}

// Checkbox selection
function checkBoxSelection(id) {
  let todoList = JSON.parse(localStorage.getItem("todoList"));
  const index = todoList.findIndex(function (obj) {
    return obj.id == id;
  });

  todoList[index].checkBox = document.getElementById(`${id}`).checked;

  localStorage.setItem("todoList", JSON.stringify(todoList));
  displayToDoList();
}

// Check if input is empty
function checkIfEmpty(input) {
  return input.value.trim();
}

// On click add
addBtn.addEventListener("click", () => {
  if (document.querySelector(".msgBox")) {
    document.querySelector(".input").removeChild(document.querySelector(".msgBox"));
  }

  if (checkIfEmpty(input)) {
    addTask(input.value);
    displayToDoList();
  } else {
    let msgElement = document.createElement("p");
    msgElement.classList = "msgBox";
    msgElement.innerHTML = `Can not add empty task`;

    document.querySelector(".input").appendChild(msgElement);
  }
});

// On click delete all
deleteAllBtn.addEventListener("click", () => {
  deleteAll();
  displayToDoList();
});

// TO DO
//
