import api from './api'
import {
    createEl,
    findParent
} from './support';
import {
    inputText,
    textArea,
    addBtn,
    listCont,
    errorCont,
    statBar,
    errorMsg,
    errorText,
    errImg,
    formColor,
    colorArr,
    list
} from './var'


const renderTaskList = () => {

    listCont.appendChild(list);

    api.fetchGetTaskList()
        .then(taskList => {
            list.innerHTML = ('<div class="exist-info"><img src="./icon/info.svg" alt=""><span>заметок пока нет</span></div>');
            statBar.innerHTML = ('<div class="stat-info"><span>заметок пока нет</span></div>');
            taskList.forEach((item) => {
            renderTask(item, list)
        })})
        .catch((err) => {
            errorMsg.appendChild(errImg);
            errorText.textContent = err.message;
            errorMsg.appendChild(errorText);
            list.appendChild(errorMsg)
        })
};


formColor.forEach((clrPick) => {
    if (clrPick.value === 'var(--beige)') {
        clrPick.checked = true;
    }
    clrPick.addEventListener('change', () => {
        findParent(clrPick, 'block').style.background = clrPick.value
    })
})

const renderTask = (task, list) => {
    const existInfo = document.querySelector('.exist-info')
    if (existInfo) existInfo.remove();
    
    statBar.innerHTML = (`<div class="stat__open">
    <span>открытых:  заметок</span>
    <div class="open-bar">
        <div class="open__line"></div>
    </div>
</div>
<div class="stat__close">
    <span>закрытых:  заметок</span>
    <div class="close-bar">
        <div class="close__line"></div>
    </div>`)

    api.fetchGetStatistics()
        .then(stat => {
            const openLine = document.querySelector('.open__line');
            const closeLine = document.querySelector('.close__line');
            const openStat = document.querySelector('.stat__open span');
            const closeStat = document.querySelector('.stat__close span');
            openStat.textContent = `ОТКРЫТЫХ: ${stat.undone} ЗАМЕТОК`;
            closeStat.textContent = `ЗАКРЫТЫХ: ${stat.done} ЗАМЕТОК`;
            openLine.style.width = `${100/stat.total * stat.undone}%`
            closeLine.style.width = `${100/stat.total * stat.done}%`
        }).catch((err) => {
            errorMsg.appendChild(errImg);
            errorText.textContent = err.message;
            errorMsg.appendChild(errorText);
            statBar.appendChild(errorMsg)
            console.log(errorMsg)
        })

    const getColorInput = () => {
        const divColor = createEl('div', null, {
            class: 'color'
        });
        Object.keys(colorArr).forEach((key) => {
            const label = createEl('label', null, {});
            const radioInput = createEl('input', null, {
                type: "radio",
                name: `${task.text}`,
                value: `${colorArr[key]}`
            });
            const color = createEl('div', null, {
                class: `${key} color-pick`
            })
            label.appendChild(radioInput);
            label.appendChild(color);
            divColor.appendChild(label);
            if (radioInput.value === 'var(--beige)') {
                radioInput.checked = true;
            }
            radioInput.addEventListener('change', () => {
                findParent(radioInput, 'block').style.background = radioInput.value
            })
        })
        return divColor
    } //Я сделал отдельные функции для формы и тасков. Так было проще в данном случае.

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
    const taskErr = createEl('div', null, {
        class: 'task-error'
    })


    liObj.appendChild(taskDesc);
    liObj.appendChild(doneBtn);
    liObj.appendChild(delBtn);
    liObj.appendChild(taskName);
    liObj.appendChild(taskErr)
    liObj.appendChild(getColorInput());

    li.appendChild(liObj);

    if (task.done) doneBtn.classList.toggle('done');
    list.appendChild(li)
    listCont.appendChild(list)

    doneBtn.addEventListener('click', () => {
        api.fetchEditPost(task.id, {
                done: !task.done
            })
            .then(() => {
                list.remove()
                renderTaskList()
            })
    })

    taskName.addEventListener('click', () => {
        const input = createEl('input', null, {
            class: 'task-name'
        })
        input.type = 'text'
        input.value = task.text
        editBtn.disabled = true
        liObj.insertBefore(input, taskName)
        liObj.removeChild(taskName)
        input.addEventListener('change', () => {
            api.fetchEditPost(task.id, {
                    text: input.value
                })
                .then(() => {
                    list.remove()
                    renderTaskList()
                }).catch((err) => {
                    errorMsg.appendChild(errImg);
                    errorText.textContent = err.message;
                    errorMsg.appendChild(errorText);
                    taskErr.appendChild(errorMsg)
                })
        })
    })


    taskDesc.addEventListener('click', () => {
        const textArea = createEl('textarea', null, {
            class: 'task-desc'
        })
        textArea.value = task.description
        liObj.insertBefore(textArea, taskDesc)
        liObj.removeChild(taskDesc)
        textArea.addEventListener('change', () => {
            api.fetchEditPost(task.id, {
                    description: textArea.value
                })
                .then(() => {
                    list.remove()
                    renderTaskList()
                }).catch((err) => {
                    errorMsg.appendChild(errImg);
                    errorText.textContent = err.message;
                    errorMsg.appendChild(errorText);
                    taskErr.appendChild(errorMsg)
                })
        })
    })

    delBtn.addEventListener('click', () => {
        api.fetchDeletePost(`${task.id}`)
            .then(() => {
                list.remove()
                renderTaskList()
            }).catch((err) => {
                errorMsg.appendChild(errImg);
                errorText.textContent = err.message;
                errorMsg.appendChild(errorText);
                taskErr.appendChild(errorMsg)
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
            errorCont.appendChild(errorMsg);
        })
    inputText.value = '';
    textArea.value = ''
});

renderTaskList()