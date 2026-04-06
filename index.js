const task_name = document.querySelector("#task_name")
const submit = document.querySelector(".submit")
let all_tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const tableBody = document.querySelector(".table tbody")
const updateBtn = document.querySelector("#update")
showTasks()


submit.addEventListener("click", () => {
    let task = task_name.value
    console.log(task)
    appendToStorage(task)
    addTaskToTable()
    task_name.value = ""
})

function showTasks() {

    if ((all_tasks || []).length != 0) {

        all_tasks.forEach(e => {
            const taskVal = task_name.value.trim();
            let now = new Date().toLocaleString();
            const formatted_date = now.split(",")[0].trim()
            const formatted_time = now.split(",")[1].trim()
            // space_idx = formatted_date.lastIndexOf(" ")
            // let date_top = formatted_date.slice(0,space_idx) 
            // // let time_down = formatted_date.split() 
            // console.log(space_idx)
            // console.log(date_top)
            const totalRows = tableBody.rows.length + 1;
            const rowHTML = `
            <tr>
            <th scope="row">${totalRows}</th>
            <td>${e}</td>
            <td>${formatted_date}<br>${formatted_time}</td>
            <td>
            <button class="btn btn-edit">Edit</button>
            <button class="btn btn-del">Del</button>
            <button class="btn btn-up" >Up</button>
            <button class="btn btn-down" >Down</button>
            </td>
            </tr>
            `;
            tableBody.insertAdjacentHTML('beforeend', rowHTML);
        });
    }
}

tableBody.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-del')) {
        
        const row = event.target.closest('tr');
        
        const taskName = row.cells[1].textContent;
        const rowIndex = row.rowIndex; 
        
        deleteTaskFromStorage(taskName)
        
        row.remove();
    }
    if (event.target.classList.contains('btn-edit')){
        const editBtn = event.target.closest('.btn-edit')
        const row = editBtn.closest('tr');
        
        taskName = row.cells[1].textContent;
        
        task_name.value = taskName
        updateBtn.style.display = 'block';
        setTimeout(() => {
            updateBtn.style.width = 'auto'
            updateBtn.style.opacity = '1';
        }, 30);
        
    }
    if (event.target.classList.contains('btn-up')){
        const upBtn = event.target.closest('.btn-up')
        const row = upBtn.closest('tr');
        
        taskName = row.cells[1].textContent;
        let tasks = JSON.parse(localStorage.getItem('tasks'))
        let idx = tasks.indexOf(taskName)
        if (idx>0 ){
            [tasks[idx - 1], tasks[idx]] = [tasks[idx], tasks[idx - 1]];
            localStorage.setItem('tasks', JSON.stringify(tasks));
            location.reload()
        }
    }
    if (event.target.classList.contains('btn-down')){
        const downBtn = event.target.closest('.btn-down')
        const row = downBtn.closest('tr');
        
        taskName = row.cells[1].textContent;
        let tasks = JSON.parse(localStorage.getItem('tasks'))
        let idx = tasks.indexOf(taskName)
        if (idx<tasks.length-1){
            [tasks[idx + 1], tasks[idx]] = [tasks[idx], tasks[idx + 1]];
            localStorage.setItem('tasks', JSON.stringify(tasks));
            location.reload()
        }
    }
});



updateBtn.addEventListener("click",()=>{
    console.log(task_name.value)
    
    updateBtn.style.opacity = '0';
    setTimeout(() => {
        updateBtn.style.width = '0px'
        updateBtn.style.display = 'none';
    }, 30);
    
    updateTaskInStorage(taskName)
    location.reload()

})

function updateTaskInStorage(taskText){
    let tasks = JSON.parse(localStorage.getItem('tasks'))
    let idx = tasks.indexOf(taskText)
    tasks[idx] = task_name.value
    localStorage.setItem('tasks',JSON.stringify(tasks))
}








function deleteTaskFromStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    let filtered_tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(filtered_tasks));
}

function appendToStorage(newTask) {

    all_tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(all_tasks));
}


function addTaskToTable() {

    const tableBody = document.querySelector(".table tbody")
    const task = task_name.value.trim();
    const now = new Date().toLocaleDateString();
    const totalRows = tableBody.rows.length + 1;
    const rowHTML = `
    <tr>
    <th scope="row">${totalRows}</th>
    <td>${task}</td>
    <td>${now}</td>
    <td>
        <button class="btn btn-edit">Edit</button>
        <button class="btn btn-del">Del</button>
        <button class="btn btn-up" >Up</button>
        <button class="btn btn-down" >Down</button>
    </td>
    </tr>
    `;

    tableBody.insertAdjacentHTML('beforeend', rowHTML);
    task_name.value = '';
    // console.log(all_tasks)
    // if ((all_tasks || []).length != 0) {

    //     all_tasks.forEach(e => {
    //         const tableBody = document.querySelector(".table tbody")
    //         const taskVal = task_name.value.trim();
    //         const now = new Date().toLocaleDateString();
    //         const totalRows = tableBody.rows.length + 1;
    //         const rowHTML = `
    //         <tr>
    //         <th scope="row">${totalRows}</th>
    //         <td>${taskVal}</td>
    //         <td>${now}</td>
    //         <td><button class="btn btn-danger btn-sm">Delete</button></td>
    //         </tr>
    //         `;
    //         console.log(e)
    //         tableBody.insertAdjacentHTML('beforeend', rowHTML);

    //     });
    // }
}


const delBtn = document.querySelector(".btn-del")
const editBtn = document.querySelector(".btn-edit")
const upBtn = document.querySelector(".btn-up")
const downBtn = document.querySelector(".btn-down")

function delTask(e){
    console.log(e)
}