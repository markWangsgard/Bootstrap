import {
  AddItem,
  DeleteItem,
  GetIncompleteItems,
  GetCompleteItems,
  ToggleComplete,
} from "./domain.js";

AddItem("Cheese");
AddItem("Apple");
ToggleComplete("Apple");

//Create Each Item
const generateTodoList = () => {
  const todoListElement = document.getElementById("todo-list");
  todoListElement.replaceChildren();
  generateTodoItemsFromArray(GetIncompleteItems());
  generateTodoItemsFromArray(GetCompleteItems());
  updateTasksCompleted();
};

const generateTodoItemsFromArray = (itemArray) => {
  const todoListElement = document.getElementById("todo-list");
  itemArray.forEach((i) => {
    const listItemElement = document.createElement("li");
    listItemElement.classList.add("d-flex", "container", "justify-content-center","justify-content-sm-start", "pt-2")
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
    listItemElement.appendChild(checkboxElement);
    listItemElement.appendChild(labelElement);
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

DeleteItem("Apple");
generateTodoList();
updateTasksCompleted();

// <input type="checkbox" name="input1" id="input1">
// <label for="input1">Milk the cows</label>
