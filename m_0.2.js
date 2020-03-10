
let taskDOM = {
    taskList: document.getElementsByClassName('task-list')[0],
    task: document.getElementsByClassName('task'),
    taskEditor: document.getElementsByClassName('fa-pencil-alt'),
    taskDeletor: document.getElementsByClassName('del-button')
}

let formModalWindowDom = {
    FMWD__ClassName: {
        buttonForOpenWindow: 'new-task',
        modalWindowWrapper: 'modal-wrapper',
        taskForm: 'taskForm',
        buttonForCloseWindow: 'close-btn',
        inputWrapper: 'input-wrapper',
        subtaskField: 'subtask-field',
        buttonForDeleteSubtaskField: 'subtask-field-delbutton',
        battonForAppendNewInput: 'addInputBtn',
        buttonForCreating: 'createTask',
        subtaskFieldValueEditor: 'field-value-editor',
    },
}

formModalWindowDom.openWindowButton = document.querySelector('.' + formModalWindowDom.FMWD__ClassName.buttonForOpenWindow);
formModalWindowDom.formModalWrapper = document.querySelector('.' + formModalWindowDom.FMWD__ClassName.modalWindowWrapper);
formModalWindowDom.form = document.querySelector('.' + formModalWindowDom.FMWD__ClassName.taskForm);
formModalWindowDom.closeWindowButton = document.querySelector('.' + formModalWindowDom.FMWD__ClassName.buttonForCloseWindow);
formModalWindowDom.subtaskFieldWrapper = document.getElementsByClassName(formModalWindowDom.FMWD__ClassName.inputWrapper);
formModalWindowDom.subtaskField = document.getElementsByClassName(formModalWindowDom.FMWD__ClassName.subtaskField);
formModalWindowDom.subtaskFieldDelButton = document.getElementsByClassName(formModalWindowDom.FMWD__ClassName.buttonForDeleteSubtaskField);
formModalWindowDom.inputAddingButton = document.querySelector('.' + formModalWindowDom.FMWD__ClassName.battonForAppendNewInput);
formModalWindowDom.taskCreatingButton = document.querySelector('.' + formModalWindowDom.FMWD__ClassName.buttonForCreating);
formModalWindowDom.subtaskValueEditor = document.getElementsByClassName(formModalWindowDom.FMWD__ClassName.subtaskFieldValueEditor);

// Data
var taskData = [
    {
        name: "Оставшиеся задачи:",
        list: [
            "Добавить автоматическое удаление пустых инпатов в модальном окне", 
            "Добавить удаление инпатов в модальном окне", 
            "Добавить изменение таск вставкой в заполненные поля инаптов и добавлением новых задач"
        ],
    },
    {
        name: "Title 1",
        list: ["Puknut", "Keknut", "Slapnut"],
    },
    {
        name: "Title 2",
        list: ["Puknut 2", "Keknut 2", "Slapnut 2"],
    },
    {
        name: "Title 3",
        list: ["Puknut 3", "Keknut 3", "Slapnut 3"],
    }
];

function modalAct() {
    function openModal() {
        formModalWindowDom.formModalWrapper.classList.remove('dn');
    }

    formModalWindowDom.openWindowButton.onclick = openModal;

    function closeModal() {
        formModalWindowDom.formModalWrapper.classList.add('dn');
    }

    formModalWindowDom.closeWindowButton.onclick = closeModal; 
}

modalAct();

function addNewFormField() { 
    let formInputWrapper = document.createElement('div');
    let formInput = document.createElement('input');
    let formInputDelButton = document.createElement('input');

    formModalWindowDom.form.appendChild(formInputWrapper);

    formInputWrapper.className = 'input-wrapper';
    formInputWrapper.appendChild(formInput);
    formInputWrapper.appendChild(formInputDelButton);
    
    formInput.type = 'text';
    formInput.className = 'subtask-field';
    formInput.placeholder = 'Task';

    formInputDelButton.type = 'button';
    formInputDelButton.className = 'subtask-field-delbutton';
    formInputDelButton.value = '-';
    for (let i = 0; i < formModalWindowDom.subtaskField; i++) {
        formInputDelButton[i].onclick = () => {   
            formInputDelButton[i].style.display = "none";
        }
    }
}

function delFormField(arrayIndex, field) {
    field[arrayIndex].style.display = none;
}

formModalWindowDom.inputAddingButton.onclick = addNewFormField;

function clear() {
    for (let i = 0; i < taskDOM.task.length; i*1) {
        taskDOM.taskList.removeChild(taskDOM.task[i]);
    }
}

function render() {
    clear();
    for (let i = 0; i < taskData.length; i++) {
        let divTask = document.createElement('div');
        divTask.className = 'task';

        let divTaskTitleContainer = document.createElement('div');
        divTaskTitleContainer.className = 'task-title-container';

        divTask.appendChild(divTaskTitleContainer); // task's title container append task

        let divTaskTitle = document.createElement('div');
        divTaskTitle.className = 'task-title';
        divTaskTitle.innerHTML = taskData[i].name;

        divTaskTitleContainer.appendChild(divTaskTitle); // task's title append task's title container

        let divTaskEditor = document.createElement('i');
        divTaskEditor.className = 'fas fa-pencil-alt';
        divTaskEditor.onclick = () => {
			divTask.classList.toggle('edit');
        }

        divTaskTitleContainer.appendChild(divTaskEditor);

        let divTaskBody = document.createElement('div');
        divTaskBody.className = 'task-body';

        divTask.appendChild(divTaskBody); // task's body append task

        let divTaskList = document.createElement('ul');
        divTaskList.className = 'task-list';

        divTaskBody.appendChild(divTaskList); // task's list append task's body

        for (let l = 0; l < taskData[i].list.length; l++) {
            let divTaskElement = document.createElement('li');
            divTaskElement.className = 'task-element';
            divTaskList.appendChild(divTaskElement);
    
            let divTaskElementValueWrapper = document.createElement('div');
            divTaskElementValueWrapper.className = 'value-wrapper';
            divTaskElement.appendChild(divTaskElementValueWrapper);

            let divTaskElementValue = document.createElement('span');
            divTaskElementValue.classList = 'task-element__value';
            divTaskElementValue.innerHTML = taskData[i].list[l];
            divTaskElementValueWrapper.appendChild(divTaskElementValue);

            var divTaskFieldValueEditor = document.createElement('input');
            divTaskFieldValueEditor.className = 'field-value-editor';
            divTaskFieldValueEditor.type = 'text';
            divTaskFieldValueEditor.placeholder = 'Edit...';
            divTaskFieldValueEditor.value = taskData[i].list[l];
            divTaskElementValueWrapper.appendChild(divTaskFieldValueEditor);

            let divTaskDelButton = document.createElement('div');
            divTaskDelButton.className = 'del-button';
            divTaskDelButton.innerHTML = '-';
            divTaskDelButton.onclick = () => {
                removeTask(i, l);
            }
            divTaskElement.appendChild(divTaskDelButton);
        }

        let inputChangesSaving = document.createElement('input');
        inputChangesSaving.className = 'changes-saving';
        inputChangesSaving.type = 'submit';
        inputChangesSaving.value = 'Save';
        inputChangesSaving.onclick = () => {
                // changeTask(i, l, formModalWindowDom.subtaskValueEditor);
            changeTask(i);
                // formModalWindowDom.subtaskValueEditor
        }
        
        divTaskBody.appendChild(inputChangesSaving);

        taskDOM.taskList.appendChild(divTask);
    }
}

function changeTask(taskId) {
    taskData.forEach((task, i) => {

        // console.log(task.list[i]);
        console.log(taskId[i]);
    });
}

function removeTask(taskId, subtaskId) {
	taskData.forEach((task, i) => {
		if (i !== taskId) return;
        task.list = task.list.filter((subtask, i) => i !== subtaskId);
  });
  render();
}

render();

function addTask() {
    function checkValue() {
        let isValid = false;
        for (let i = 0; i < formModalWindowDom.subtaskField.length; i++) {
            if (!!formModalWindowDom.subtaskField[i].value) {
                isValid = true;
                formModalWindowDom.subtaskField[i].style.borderColor = "initial";
            } else {
                isValid = true;
                formModalWindowDom.subtaskField[i].style.borderColor = "red";
                formModalWindowDom.form.removeChild(formModalWindowDom.subtaskFieldWrapper[i*1]);
            }
        }
        return isValid;
    }

    let iValue = checkValue();

    if (iValue != false) {
        taskData.unshift({});
        taskData[0].name = formModalWindowDom.subtaskField[0].value;
        taskData[0].list = [];
        for (let i = 1; i < formModalWindowDom.subtaskField.length; i++) {
            taskData[0].list.push(formModalWindowDom.subtaskField[i].value);
        }
        render();
        return taskData[0];
    } else {
        console.log("<ERROR>");
    }
}

formModalWindowDom.taskCreatingButton.onclick = addTask;