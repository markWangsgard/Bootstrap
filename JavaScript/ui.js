import {
  AddItem,
  DeleteItem,
  GetIncompleteItems,
  GetCompleteItems,
  ToggleComplete,
} from "./domain.js";

AddItem("Cheese");
AddItem("Apple");
// ToggleComplete("Apple");

//Create Each Item
const generateTodoList = () => {
  const todoListElement = document.getElementById("todo-list");
  todoListElement.replaceChildren();
  if (GetCompleteItems().length === 0 && GetIncompleteItems().length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.classList.add("text-center", "text-white", "my-4");
    emptyMessage.textContent = "No tasks available, please add a task to get started.";
    todoListElement.appendChild(emptyMessage);
  }
  generateTodoItemsFromArray(GetIncompleteItems());
  generateTodoItemsFromArray(GetCompleteItems());
  updateTasksCompleted();
};

const generateTodoItemsFromArray = (itemArray) => {
  const todoListElement = document.getElementById("todo-list");
  itemArray.forEach((i) => {
    const listItemElement = document.createElement("li");
    listItemElement.classList.add("d-flex", "container", "justify-content-center","justify-content-sm-between", "align-items-center", "mt-2", "px-5")
    
    const itemContainerElement = document.createElement("div");
    const checkboxElement = document.createElement("input");
    checkboxElement.type = "checkbox";
    checkboxElement.name = i.Item + "Checkbox";
    checkboxElement.id = i.Item + "Checkbox";
    checkboxElement.classList.add("form-check-input");
    checkboxElement.addEventListener("input", (e) => {
      e.preventDefault();
      ToggleComplete(i);
      generateTodoList();
    });
    const labelElement = document.createElement("label");
    labelElement.htmlFor = i.Item + "Checkbox";
    labelElement.textContent = i.Item;
    labelElement.classList.add("px-3", "form-check-label")
    if (i.Complete) {
      checkboxElement.checked = true;
      labelElement.classList.add("text-decoration-line-through");
    }

    const deleteElement = document.createElement("button");
    // deleteElement.textContent = "Delete";
    deleteElement.classList.add("btn-close", "btn-close-white");
    deleteElement.addEventListener("click", (e) => {
      e.preventDefault();
      DeleteItem(i);
      generateTodoList();
    });

    itemContainerElement.appendChild(checkboxElement);
    itemContainerElement.appendChild(labelElement);
    listItemElement.appendChild(itemContainerElement);
    listItemElement.appendChild(deleteElement);
    todoListElement.appendChild(listItemElement);
  });
};

const updateTasksCompleted = () => {
  const completedTasksDisplayElement =
    document.getElementById("tasks-completed");
  const numberOfCompletedTasks = GetCompleteItems().length;
  const numberOfIncompleteTasks = GetIncompleteItems().length;
  completedTasksDisplayElement.textContent =
    numberOfCompletedTasks +
    "/" +
    (numberOfCompletedTasks + numberOfIncompleteTasks);
};


const addEventListeners = () => {
  const newTaskFormElement = document.getElementById("new-task-form");
  newTaskFormElement.addEventListener("submit", (e) => {
    e.preventDefault();
    const newTaskInputElement = document.getElementById("new-task");
    const newTaskName = newTaskInputElement.value.trim();
    if (newTaskName) {
      AddItem(newTaskName);
      newTaskInputElement.value = "";
      generateTodoList();
    }
  });
};
generateTodoList();
updateTasksCompleted();
addEventListeners();

// <input type="checkbox" name="input1" id="input1">
// <label for="input1">Milk the cows</label>
