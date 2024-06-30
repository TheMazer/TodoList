// Load Tasks on Page Loading
updateTasks();

// Task Addition
const taskNameInput = document.querySelector('#taskName');
const taskDescInput = document.querySelector('#taskDesc');
const taskPriorityInput = document.querySelector('#taskPriority');
const taskDateInput = document.querySelector('#taskDate');

function createTask(id, name, desc, priority, date, completed) {
    const li = document.createElement('li');
    li.id = id;
    li.className = 'list-group-item';
    completed && (li.className += ' completed');
    
    const taskCheckbox = document.createElement('div');
    taskCheckbox.className = 'task-checkbox';

    const completeButton = document.createElement('button');
    completeButton.addEventListener('click', function() {
        completeTask(id);
    })
    
    const circleSpan = document.createElement('span');
    circleSpan.className = 'circle p' + priority;

    const checkBox = document.createElement('i');
    checkBox.classList = 'bi bi-check-lg';
    
    taskCheckbox.appendChild(completeButton);
    completeButton.appendChild(circleSpan);
    circleSpan.appendChild(checkBox);
    
    const taskData = document.createElement('div');
    taskData.className = 'task-data';
    
    const taskInfo = document.createElement('div');
    taskInfo.className = 'task-info';
    taskInfo.textContent = name;
    
    const taskDesc = document.createElement('div');
    taskDesc.className = 'task-desc';

    const taskOptions = document.createElement('div');
    taskOptions.className = 'task-options';

    const deleteButton = document.createElement('button');
    deleteButton.classList = 'btn danger';
    deleteButton.addEventListener('click', function() {
        deleteTask(id);
    });

    const deleteIcon = document.createElement('i');
    deleteIcon.classList = 'bi bi-trash';

    lines = desc ? desc.split('\n') : [];
    lines.forEach(line => {
        const paragraph = document.createElement('p');
        paragraph.textContent = line;
        taskDesc.appendChild(paragraph);
    });
    
    taskData.appendChild(taskInfo);
    taskData.appendChild(taskDesc);

    taskOptions.appendChild(deleteButton)
    deleteButton.appendChild(deleteIcon)
    
    li.appendChild(taskCheckbox);
    li.appendChild(taskData);
    li.appendChild(taskOptions)
    
    document.querySelector('.list-group').appendChild(li);
}

function updateTasks() {
    const taskGroup = document.querySelector('.list-group');
    taskGroup.innerHTML = '';

    taskList = JSON.parse(localStorage.getItem('tasks')) || {};
    for (const id in taskList) {
        if (taskList.hasOwnProperty(id)) {
            const task = taskList[id];
            createTask(id, task.name, task.desc, task.priority, task.date, task.completed);
        }
    }
}

function addTask() {
    const id = Date.now()
    const taskName = taskNameInput.value.trim();
    const taskDesc = taskDescInput.value.trim();
    const taskPriority = taskPriorityInput.value;
    const taskDate = taskDateInput.value;
    
    // taskName && createTask(id, taskName, taskDesc, taskPriority, taskDate);
    if (taskName) {
        taskList = JSON.parse(localStorage.getItem('tasks')) || {};
        taskList[id] = {
            "name": taskName,
            "desc": taskDesc,
            "priority": taskPriority,
            "date": taskDate,
            "completed": false
        };
        localStorage.setItem('tasks', JSON.stringify(taskList));
        
        const form = document.querySelector('form');
        updateTasks();
        form.reset();
    }
    
}

function completeTask(id) {
    const task = document.getElementById(id);
    const completed = task.classList.toggle('completed');

    taskList = JSON.parse(localStorage.getItem('tasks')) || {};
    taskList[id]["completed"] = completed;

    localStorage.setItem('tasks', JSON.stringify(taskList));
}

function deleteTask(id) {
    taskList = JSON.parse(localStorage.getItem('tasks')) || {};
    delete taskList[id];

    localStorage.setItem('tasks', JSON.stringify(taskList));
    updateTasks();
}


// Theme Switching
const themeSwitch = document.querySelector('#themeSwitch')

themeSwitch.addEventListener('click', (e) => {
    let currentTheme = document.documentElement.getAttribute('data-bs-theme')
    if (currentTheme == 'dark') {
        document.documentElement.setAttribute('data-bs-theme', 'light');
        localStorage.setItem('theme', 'light')
    } else {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
        localStorage.setItem('theme', 'dark')
    }
})