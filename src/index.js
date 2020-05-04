import api from './api'
import {
    createEl
} from './creators';
import {getColorInput} from './color';

const inputText = document.querySelector('.form__input');
const textArea = document.querySelector('.form__textarea');
const addBtn = document.querySelector('.form__btn');
const listCont = document.querySelector('.list-cont');
const errorCont = document.querySelector('.error-cont')
const errorMsg = createEl('div', null, {class:"error-msg"})
const errorText = createEl('div', null, {class: "error"});
const errImg = createEl('img', null, {class:'error-img', src:'../icon/error.svg'});


const renderTaskList = () => {
    const list = createEl('ul', null, {
        id: 'list'
    });
    listCont.appendChild(list)
    list.innerHTML = ('<div class="exist-info"><img src="./icon/info.svg" alt=""><span>заметок пока нет</span></div>')
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
    const existInfo = document.querySelector('.exist-info')
    if (existInfo) existInfo.remove()

    const colorChoice = getColorInput()
    console.log(colorChoice)


    const li = createEl('li', null, {
        class: "col-12 col-md-6 col-lg-3 mb-4"
    });
    const liObj = createEl('div', null, {
        class: 'li-obj block'
    });
    const taskName = createEl('div', task.text, {
        class: 'task-name'
    });
    const delBtn = createEl('button', null, {
        class: 'del-btn'
    });
    const editBtn = createEl('button', null, {
        class: 'edit-btn'
    });
    const doneBtn = createEl('button', null, {
        class: 'done-btn'
    });
    const taskDesc = createEl('div', task.description, {
        class: 'task-desc'
    });

    liObj.appendChild(taskDesc)
    liObj.appendChild(doneBtn);
    liObj.appendChild(delBtn);
    liObj.appendChild(taskName)
    liObj.appendChild(colorChoice)

    li.appendChild(liObj)

    if (task.done) doneBtn.classList.toggle('done');
    list.appendChild(li)
    listCont.appendChild(list)
    

    
    doneBtn.addEventListener('click', () => {
        api.fetchEditPost(task.id, { done: !task.done })
            .then(() => {
                list.remove()
                renderTaskList()
            })
    })

    taskName.addEventListener('click', () => {
        const input = createEl('input', null, {class: 'task-name'})
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


    taskDesc.addEventListener('click', () => {
        const textArea = createEl('textarea', null, {class: 'task-desc'})
        textArea.value = task.description
        liObj.insertBefore(textArea, taskDesc)
        liObj.removeChild(taskDesc)
        textArea.addEventListener('blur', () => {
            api.fetchEditPost(task.id, {
                    description: textArea.value
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
            errorMsg.remove()
            renderTaskList()
        })
        .catch((err) => {
            errorMsg.appendChild(errImg);
            errorText.textContent = err.message;
            errorMsg.appendChild(errorText);
            errorCont.appendChild(errorMsg)
        })
    inputText.value = '';
    textArea.value = ''
});

renderTaskList()