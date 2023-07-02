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

// ~~~~~ Functions ~~~~~
// Adding an item 
const addTask = (e) => {
    e.preventDefault();
    const id = new Date().getTime().toString();
    // assigns added value to the const value
    const value = formTask.value;
    // creates item
    if (value && !editFlag){
        // passing new item to add to list
        createItem(id, value);
        taskContainer.classList.add('display-container');
    // edits item
    } else if (value && editFlag) {
        console.log("edit item");
    // no item alerts user to submit one
    } else {
        console.log("no value submitted")
    }
};

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
    taskList.appendChild(element);
}
// display the alert 

// remove the alert 

// clear items 

// delete single item 

// edit func 

// ~~~~ Event listeners ~~~~
// submit form 
form.addEventListener('submit', addTask);
// clear btn 
// load items 


// local storage 

