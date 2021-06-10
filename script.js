// Definr our UL variable

const form = document.querySelector('#task-form'),
    task = document.querySelector('#task'),
    ul = document.querySelector('.collection'),
    clrBtn = document.querySelector('.clear-tasks');


form.addEventListener('submit', addTask);
ul.addEventListener('click', removeItem);
clrBtn.addEventListener('click', clearAll)



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
                    swal("Your imaginary file is safe!");
                }
            });

    }
}

function clearAll(){
    ul.innerHTML = ''
}