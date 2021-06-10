// Definr our UL variable

const form = document.querySelector('#task-form'),
    task = document.querySelector('#task'),
    ul = document.querySelector('.collection'),
    clrBtn = document.querySelector('.clear-tasks'),
    Filter = document.querySelector('#filter');
load();

function load() {

    form.addEventListener('submit', addTask);
    ul.addEventListener('click', removeItem);
    clrBtn.addEventListener('click', clearAll);
    Filter.addEventListener('keyup', filter);
    document.addEventListener('DOMContentLoaded', getTask);
}
// get localstorage
function getTask() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach((task) => {

        // create li
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.textContent = task;

        // create a.
        const a = document.createElement('a');
        a.className = 'delete-item secondary-content';
        a.setAttribute('href', '#');
        a.innerHTML = '<i class="fa fa-remove"></i>';

        // append a into li.
        li.appendChild(a);

        //append li in to ul
        ul.appendChild(li);

    })
}



function addTask(e) {

    // check user ad input or not
    if (task.value === '') {
        swal("Please Enter Task!");
    } else {

        // create li
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.textContent = task.value;

        // create a.
        const a = document.createElement('a');
        a.className = 'delete-item secondary-content';
        a.setAttribute('href', '#');
        a.innerHTML = '<i class="fa fa-remove"></i>';

        // append a into li.
        li.appendChild(a);

        //append li in to ul
        ul.appendChild(li);

        // Store in local storage
        storeTaskInLocalStorage(task.value);

        // remove string from input bar
        task.value = '';
    }

    e.preventDefault();
}

function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks))
}


function removeItem(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover your Task again!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Your Task has been deleted!", {
                        icon: "success",
                    });
                    e.target.parentElement.parentElement.remove();
                    //remove from local storage
                    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
                    

                } else {
                    swal("Your Task is safe!");
                }
            });

    }
}
//remove from LS
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach((task, index)=>{
        if (taskItem.textContent == task) {
            tasks.splice(index, 1)
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function clearAll() {

    if (ul.innerHTML !== '') {

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover your Tasks again!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    ul.innerHTML = '';
                    // also clear from local storage
                    clearFromLocalStorage();
                    swal("Your Tasks has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("Your Tasks are safe!");
                }
            });
    }
}

//clear all from local storage
function clearFromLocalStorage(){
    localStorage.clear();
}

function filter(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach((task) => {
        const item = task.firstChild.textContent;
        if (item.toLocaleLowerCase().indexOf(text) !== -1) {
            task.style.display = 'block';
        } else {

            task.style.display = 'none';
        }
    });
}