import api from './api'
import {
    createEl
} from './creators'

const inputText = document.querySelector('.form__input');
const textArea = document.querySelector('.form__textarea');
const addBtn = document.querySelector('.form__btn');
const listCont = document.querySelector('.list-cont');
const errMsg = createEl('div', null, {
    class: "error"
});
const colorInput = document.querySelectorAll('input[type = "radio"]')

const renderTaskList = () => {
    const list = createEl('ul', null, {
        id: 'list'
    });
    api.fetchGetTaskList()
        .then(taskList => taskList.forEach((item) => renderTask(item, list)))
        .catch((err) => {
            console.log(err.message)
            const divErr = createEl('div', err.message, {
                class: "error"
            })
            listCont.appendChild(divErr)
        })
};

const renderTask = (task, list) => {
    const li = createEl('li', null, {
        'data-number': task.id,
        class: "col-12 col-md-6 col-lg-3 mb-4"
    });
    const liObj = createEl('div', null, {
        class: 'li-obj block'
    })
    const taskName = createEl('div', task.text, {
        class: 'task-name'
    });
    const delBtn = createEl('button', null, {
        class: 'del-btn'
    });
    const editBtn = createEl('button', null, {
        class: 'edit-btn'
    });
    const doneInfo = createEl('button', null, {
        class: 'done-btn'
    });
    const taskDesc = createEl('div', task.description, {
        class: 'task-desc'
    })

    liObj.appendChild(taskDesc)
    liObj.appendChild(doneInfo);
    liObj.appendChild(delBtn);

    liObj.appendChild(taskName)

    li.appendChild(liObj)

    if (task.done) doneInfo.classList.toggle('done');

    listCont.appendChild(list)
    list.appendChild(li)

    const getDoneInfo = task.done ? {
        'done': false
    } : {
        'done': true
    }

    doneInfo.onclick = () => {
        api.fetchEditPost(task.id, getDoneInfo)
            .then(() => {
                list.remove()
                renderTaskList()
            })
    }

    taskName.addEventListener('click', () => {
        const input = createEl('input', null, {
            class: 'edit-input'
        })
        input.type = 'text'
        input.value = task.text
        editBtn.disabled = true
        liObj.insertBefore(input, taskName)
        liObj.removeChild(taskName)
        input.addEventListener('blur', () => {
            api.fetchEditPost(task.id, {
                    text: input.value
                })
                .then(() => {
                    list.remove()
                    renderTaskList()
                })
        })
    })

    delBtn.addEventListener('click', () => {
        api.fetchDeletePost(`${task.id}`)
            .then(() => {
                list.remove()
                renderTaskList()
            })
    })
};


addBtn.addEventListener('click', () => {
    api.fetchAddPost({
            text: inputText.value,
            description: textArea.value
        })
        .then(() => {
            const list = document.querySelector('#list')
            list.remove()
            renderTaskList()
        })
        .catch((err) => {
            errMsg.textContent = err.message
            list.appendChild(errMsg)
        })
    inputText.value = '';
    textArea.value = ''
});

renderTaskList()