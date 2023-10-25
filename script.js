class liEl extends HTMLElement {
    set taskContent(value) {
        this.textContent = value;
    }
}
customElements.define("li-el", liEl);
/* Enter Fucntion */
const inputElement = document.getElementById("task-el");
inputElement.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});
/* Add Task Function */
function addTask() {
    const taskEl = document.getElementById("task-el").value;
    if (taskEl === "") {
        alert("Please enter a valid task.");
    } else {
        let liEl = document.createElement("li-el");
        liEl.id = "unique";
        liEl.innerHTML = ` <span id = "task-text">${taskEl}</span> <div class="icons">
        <i onclick="editTask(this)" class="fa-solid fa-pen-nib" id="edit"></i>
        <i onclick="completeTask(this)" id="solidIcon" class="fa-solid fa-square-check" style= "display: none;"></i>
        <i onclick="completeTask(this)" id="regularIcon" class="fa-regular fa-square-check"></i>
        <i onclick="delTask(this)" class="fa-solid fa-trash" id="del"></i>
        </div>`;
        
        const ulEl = document.getElementById("task-list");
        ulEl.appendChild(liEl);
        document.getElementById("task-el").value = "";
        console.log("Task added:", taskEl);
        const edit = document.getElementById("edit");
        const solidIcon = document.getElementById("solidIcon");
        const regularIcon = document.getElementById("regularIcon");
        const del = document.getElementById("del");
        edit.title = "Clcik here to edit";
        solidIcon.title = "Clcik here to complete";
        regularIcon.title = "Clcik here to complete";
        del.title = "Clcik here to delete";
    }
}
/* Edit Task Function */

function editTask(unique) {
    
    const liEl = unique.parentElement.parentElement;
    const taskText = liEl.querySelector('span#task-text');


    // Check if the element is already being edited
    if (taskText.nodeName !== "INPUT") {
        
        const inputField = document.createElement("input")
        inputField.className = "edit-input";
        inputField.setAttribute("type", "text");
        // Handle saving the updated text
        function saveUpdatedText() {
            const updatedText = inputField.value;
            if(updatedText === ''){
                taskText.taskContent =taskText;
            }
            else{
                taskText.textContent = updatedText; 
            }
            
            liEl.removeChild(inputField);
        }

        inputField.addEventListener("blur", saveUpdatedText);
        inputField.addEventListener("keyup", function (event) {
            if (event.key === "Enter") {
                saveUpdatedText();
            }
        });

        liEl.appendChild(inputField);
        inputField.focus();
    }
}
/* Delete Task */
function delTask(unique) {
    var parentEle = unique.parentElement.parentElement;
    parentEle.style.display = "none";
    setTimeout(() => {
        parentEle.remove();
    }, 500);
}
/* Complete Task */

function completeTask(unique) {
    // Toggle between regular and solid icons
    unique.classList.toggle('fa-regular');
    unique.classList.toggle('fa-solid');

    const taskItem = unique.parentElement.parentElement; // Get the parent li element

    // Toggle a "completed" class for styling
    taskItem.classList.toggle('completed');

    const taskText = taskItem.querySelector('#task-text'); // Find the task text element

    if (taskItem.classList.contains('completed')) {
        taskText.style.textDecoration = 'line-through'; // Apply strikethrough to the task text
    } else {
        taskText.style.textDecoration = 'none'; // Remove strikethrough
    }
}