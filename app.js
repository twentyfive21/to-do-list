const submitBtn = document.querySelector('.submit-btn');
const clearBtn = document.querySelector('.clear-btn');
const alert = document.querySelector('.alert');
const form = document.querySelector('.to-do-form');
const formTask = document.getElementById('task');
const taskContainer = document.querySelector('.to-do-container');
const taskList = document.querySelector('.to-do-items');

// edit option 
let editElement;
let editFlag = false;
let editID = '';

// ~~~~~~~~~~~ Functions ~~~~~~~~~~~~~~~
// load items that already exist 
const setList = () => {
  let list = getLocalStorage();
  if (list.length > 0) {
    list.forEach(task => createItem(task.id, task.value))
  }
  taskContainer.classList.add('display-container');
}
// load items 
window.addEventListener('DOMContentLoaded', setList);

// ------ set back to default -----
const backToDefault = () => {
  formTask.value = '';
  editFlag = false;
  editID = '';
  submitBtn.textContent = 'Submit';
}

// ------ Displays alert  ------- 
const displayAlert = (text, action) => {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  // remove the alert 
  setTimeout(() => {
    alert.textContent = '';
    alert.classList.remove(`alert-${action}`);
  }, 1000);
  }
  
// ------ Adding an item ------- 
const addTask = (e) => {
    e.preventDefault();
    const id = new Date().getTime().toString();
    // assigns added value to the const value
    const value = formTask.value;
    // creates item
    if (value && !editFlag){
        // passing new item to add to list
        createItem(id, value);
         // display alert
         displayAlert('Item added to the list', 'green');
        taskContainer.classList.add('display-container');
        // add to local storage 
        addToLocalStorage(id, value);
        // set back to default 
        backToDefault();
    // edits item
    } else if (value && editFlag) {
      editElement.innerHTML = value;
      displayAlert('Task changed', 'green');
      // local storage 
      editLocalStorage(editID, value);
      backToDefault();
    } else {
        displayAlert('Please enter a value', 'purple');
    }
}

// ------ Adds item to DOM ------- 
const createItem = (id, value) => {
  // creating container to hold each list item with their buttons
  const element = document.createElement('article');
  // adding class for styling only 
  element.classList.add('list-style');
  // adding id to task 
  const attr = document.createAttribute('data-id');
  attr.value = id;
  element.setAttributeNode(attr);
  element.innerHTML = ` <p class="task-style">${value}</p>
  <div class="btn-container">
    <button type="button" class="edit-btn">
      <i class="fas fa-edit"></i>
    </button>
    <button type="button" class="delete-btn">
      <i class="fas fa-trash"></i>
    </button>
  </div>`;
  const deleteBtn = element.querySelector('.delete-btn');
  const editBtn = element.querySelector('.edit-btn'); 
  deleteBtn.addEventListener('click', deleteItem);
  editBtn.addEventListener('click', editItem);
  taskList.appendChild(element);
}

// ------- Clear items --------
const clearItem = () => {
// grabs all list items with the class 
const items = document.querySelectorAll('.list-style');
// loops through if items > than 0 and removes it 
if (items.length > 0) {
  items.forEach(item => taskList.removeChild(item));
}
taskContainer.classList.remove('display-container');
displayAlert('List cleared !', 'green');
backToDefault();
// local storage removes entire list 
localStorage.removeItem('taskList');
}

// ~~~~~~~~~~~~~~ Event listeners ~~~~~~~~~~~
// submit form 
form.addEventListener('submit', addTask);
// clear btn 
clearBtn.addEventListener('click', clearItem)
// load items 

// delete single item 
const deleteItem = (e) => {
  // goes up to parent element of button container , then once more to the article parent container. 
  const element = (e.currentTarget.parentElement.parentElement);
  // Dataset is a property used to access the data id in an attr. Then using dot notation use attr name you want. 
  const id = element.dataset.id;
  taskList.removeChild(element);
  if (taskList.children.length === 0) {
    taskContainer.classList.remove('display-container');
  }
  displayAlert('item removed', 'purple');
  backToDefault();
  // remove from local storage
  removeFromLocalStorage(id);
}
// edit func 
const editItem = (e) => {
  // grabs entire item with id 
  const element = e.currentTarget.parentElement.parentElement;
  // grabs task name 
   editElement = e.currentTarget.parentElement.previousElementSibling;
  console.log(editElement)
  // sets the input form to the edit element 
  formTask.value = editElement.innerHTML;
  editFlag = true;
  editID = element.dataset.id;
  submitBtn.innerHTML = 'edit';
}

// ~~~~~~~~~~~ Local storage  ~~~~~~~~~~~~~~
// check if local storage is empty or not 
const getLocalStorage = () => {
   // Check if 'taskList' item exists in local storage
   // If it exists, parse and return the data else return empty []
  return localStorage.getItem('taskList') 
  ? JSON.parse(localStorage.getItem('taskList'))
  : [];
}

// add to storage 
const addToLocalStorage = (id, value) => {
  // Create an object with id and value
  const newTask = {id, value};
  let list = getLocalStorage();
  // Add the new object to the data array
  list.push(newTask);
   // Store the updated data in local storage
  localStorage.setItem('taskList', JSON.stringify(list));
}
// edit local storage
// Find the item with the specified id and update its value
const editLocalStorage = (id, value) => {
  let list = getLocalStorage();
  list = list.map(task => {
    if(task.id === id) {
      task.value = value;
    }
    return task;
  });
  localStorage.setItem('taskList', JSON.stringify(list));
}
// delete single item from local storage 
const removeFromLocalStorage = id => {
  let list = getLocalStorage();

  list = list.filter(task => {
    if (task.id !== id) {
      return list
    }
  })
  localStorage.setItem('taskList', JSON.stringify(list));
}
