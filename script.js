// Definr our UL variable

const form = document.querySelector('#task-form'),
    task = document.querySelector('#task'),
    ul = document.querySelector('.collection'),
    clrBtn = document.querySelector('.clear-tasks'),
    Filter = document.querySelector('#filter');


form.addEventListener('submit', addTask);
ul.addEventListener('click', removeItem);
clrBtn.addEventListener('click', clearAll);

Filter.addEventListener('keyup',filter);



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
        // remove string from input bar
        task.value = '';
    }

    e.preventDefault();
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
                    e.target.parentElement.parentElement.remove();
                    swal("Your Task has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("Your Task is safe!");
                }
            });

    }
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
    
                    swal("Your Tasks has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("Your Tasks are safe!");
                }
            });
    }
}

function filter(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach((task)=>{
        const item = task.firstChild.textContent; 
        if (item.toLocaleLowerCase().indexOf(text) !== -1) {
            task.style.display = 'block';
        }else{

            task.style.display = 'none';
        }
    });
}