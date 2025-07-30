import { AddItem, DeleteItem, GetIncompleteItems, GetCompleteItems, ToggleComplete } from "./domain.js";


AddItem("Cheese");
AddItem("Apple");
console.log(GetIncompleteItems());
ToggleComplete("Apple");
console.log(GetIncompleteItems());
console.log(GetCompleteItems());

//Create Each Item
const generateTodoList = () => {
    const todoListElement = document.getElementById("todo-list");
    todoListElement.replaceChildren();
    const incompleteItems = GetIncompleteItems();
    const completeItems = GetCompleteItems();
    incompleteItems.forEach( i => {
        const listItemElement = document.createElement("li");
        const checkboxElement = document.createElement("input");
        checkboxElement.type = "checkbox";
        checkboxElement.name = i.Item + "Checkbox";
        checkboxElement.id = i.Item + "Checkbox";
        checkboxElement.addEventListener("input", (e) => {
            e.preventDefault();
            ToggleComplete(i);
            generateTodoList();
        })
        const labelElement = document.createElement("label");
        labelElement.htmlFor = i.Item + "Checkbox";
        labelElement.textContent = i.Item;
        listItemElement.appendChild(checkboxElement);
        listItemElement.appendChild(labelElement);
        todoListElement.appendChild(listItemElement);
    });
    completeItems.forEach( i => {
        const listItemElement = document.createElement("li");
        const checkboxElement = document.createElement("input");
        checkboxElement.type = "checkbox";
        checkboxElement.name = i.Item + "Checkbox";
        checkboxElement.id = i.Item + "Checkbox";
        checkboxElement.checked = true;
        checkboxElement.addEventListener("input", (e) => {
            e.preventDefault();
            ToggleComplete(i);
            generateTodoList();
        })
        const labelElement = document.createElement("label");
        labelElement.classList.add("text-decoration-line-through");
        labelElement.htmlFor = i.Item + "Checkbox";
        labelElement.textContent = i.Item;
        listItemElement.appendChild(checkboxElement);
        listItemElement.appendChild(labelElement);
        todoListElement.appendChild(listItemElement);
    });
};

generateTodoList();
                
                    // <input type="checkbox" name="input1" id="input1">
                    // <label for="input1">Milk the cows</label> 
                