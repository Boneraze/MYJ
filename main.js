var formOpenBtn = document.querySelector('.new-task');

// Task's variables
var taskList = document.querySelector('.task-list');
var task = document.getElementsByClassName('task');
var taskEditor = document.getElementsByClassName('fa-pencil-alt');
var taskDeletor = document.getElementsByClassName('del-button');

// Form's variables
var formModalWrapper = document.querySelector('.modal-wrapper');
var closeWindowButton = document.querySelector('.close-btn');
var form = document.querySelector('.taskForm');
var formElements = [
    document.getElementsByClassName('subtask-field'),
    document.querySelector('.addInputBtn'),
    document.querySelector('.createTask')
];

// Other vars
var taskData = [
    {
        name: "Title 1",
        list: ["Puknut", "Keknut", "Slapnut"],
    }
];

function addAct() {
    function show() {
        for (let i = 0; i < taskDeletor.length; i++) {
            taskDeletor[i].style.display = "block";
        }
    }

    for (let i = 0; i < taskEditor.length; i++) {
        taskEditor[i].onclick = show;
        //taskData[i].list.forEach(function(item, k, arr) {});  //.style.display = 'block';
    }
}

addAct();

function modalAct() {
    function openModal() {
        formModalWrapper.classList.remove('dn');
    }

    formOpenBtn.onclick = openModal;

    function closeModal() {
        formModalWrapper.classList.add('dn');
    }

    closeWindowButton.onclick = closeModal;   
}

modalAct();

function addNewFormField() { 
    let formInputStructure = [
        document.createElement('div'),
        document.createElement('input')
    ];

    form.appendChild(formInputStructure[0]);
    formInputStructure[0].className = 'input-wrapper';
    formInputStructure[0].appendChild(formInputStructure[1]);
    formInputStructure[1].className = 'subtask-field';
    formInputStructure[1].type = 'text';
    formInputStructure[1].placeholder = 'Task';
}

formElements[1].onclick = addNewFormField;



function createTask() {
    function upData() { 
        taskData.push({});
        taskData[taskData.length-1].name = formElements[0][0].value;
        taskData[taskData.length-1].list = [];

        for (let i = 1; i < formElements[0].length; i++) {
            taskData[taskData.length-1].list.push(formElements[0][i].value);
        }

        // console.log(taskData[taskData.length-1]);
    }

    function createTaskStructure(title, tasklist) {
        let divTask = document.createElement('div');
        divTask.className = 'task';
    
        let divTaskTitleContainer = document.createElement('div');
        divTaskTitleContainer.className = 'task-title-container';
    
        divTask.appendChild(divTaskTitleContainer); // task's title container append task
    
        let divTaskTitle = document.createElement('div');
        divTaskTitle.className = 'task-title';
        divTaskTitle.innerHTML = title;
    
        divTaskTitleContainer.appendChild(divTaskTitle); // task's title append task's title container

        let divTaskEditor = document.createElement('i');
        divTaskEditor.className = 'fas fa-pencil-alt';

        divTaskTitleContainer.appendChild(divTaskEditor);
    
        let divTaskBody = document.createElement('div');
        divTaskBody.className = 'task-body';
    
        divTask.appendChild(divTaskBody); // task's body append task
    
        let divTaskList = document.createElement('ul');
        divTaskList.className = 'task-list';
    
        divTaskBody.appendChild(divTaskList); // task's list append task's body
    
        
        for (let i = 0; i < taskData[taskData.length-1].list.length; i++) {
            let divTaskElement = document.createElement('li');
            divTaskElement.className = 'task-element';
            divTaskList.appendChild(divTaskElement);

            let divTaskElementValueWrapper = document.createElement('div');
            divTaskElementValueWrapper.className = 'task-element__value-wrapper';
            divTaskElementValueWrapper.innerHTML = tasklist[i];
            divTaskElement.appendChild(divTaskElementValueWrapper);

            let divTaskDelButton = document.createElement('div');
            divTaskDelButton.className = 'del-button';
            divTaskDelButton.innerHTML = '-';
            divTaskElement.appendChild(divTaskDelButton);
        }
    
        taskList.appendChild(divTask);
        // task>task-title-container>task-title/del-button||task-body>task-list>task-element
    }

    function checkValue() {
        let bool = 0;
        for (let i = 0; i < formElements[0].length; i++) {
            if (formElements[0][i].value != "") {
                bool = true;
                formElements[0][i].style.borderColor = "initial";
                // console.log(formElements[0].length.value);
            } else {
                bool = false;
                formElements[0][i].style.borderColor = "red";
            }
        }
        return bool;
    }

    let iValue = checkValue();
    
    if (iValue != false) {
        upData();
        createTaskStructure(taskData[taskData.length-1].name, taskData[taskData.length-1].list);
        addAct();
        // console.log(taskEditor.length);
    } else {
        console.log("<ERROR>");
    }
}

formElements[2].onclick = createTask;