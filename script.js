        const inputText = document.querySelector('.input-postname');
        const textArea = document.querySelector('textarea');
        const addBtn = document.querySelector('.add-btn');
        const listDiv = document.querySelector('.list-div');
        const endpoint = 'http://localhost:3000';


        const renderTaskList = () => {
            const list = createEl('ul', null, { id: 'list' });
            fetchGetTaskList()
            .then(taskList => taskList.forEach((item) => renderTask(item, list)))
            .then(() => {
                const todolist = document.querySelectorAll('li');
                todolist.forEach(li => {
                    li.childNodes[0].childNodes[0].onclick = () => {
                    const id = li.getAttribute('data-number');
                    const desc = createEl('div', null, {class: 'desc'});
                    console.log(id)
    
                        fetch(`http://localhost:3000/list/${id}`)
                        .then(response => response.json())
                        .then(item => {
                            if (!li.childNodes[1]) {
                                desc.textContent = item.description;
                                li.appendChild(desc);
                                return;
                            } else {
                                li.removeChild(li.childNodes[1])
                            }
                        })
                    }
                })
            })
        };

        const fetchGetTaskList = () => {
            return fetch(`${endpoint}/list`)
                .then(response => response.json())
            };

        const fetchEditPost = (id, body) => {
            return fetch(`${endpoint}/edit/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
            })
        };

        const fetchDeletePost = (id) => {
            return fetch(`${endpoint}/delete/${id}`, {
            method: 'DELETE'
            })
        };

        const fetchAddPost = (body) => {
            return fetch(`${endpoint}/add`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
            })
        };

        const createEl = (tag, text, atr = {}) => {
            const elem = document.createElement(tag);
            elem.textContent = text;
            console.log(atr)
            Object.keys(atr).forEach((key) =>{
                elem.setAttribute(key, atr[key])
                console.log(key)
            })
        return elem
        }

        const renderTask = (task, list) => {
            const li = createEl('li', null, {'data-number': task.id});
            const liObj = createEl('div', null, {class: 'li-obj'})
            const taskText = createEl('div', task.text, {class: 'task-text'});
            const delBtn = createEl('button', null, {class: 'del-btn'});
            const editBtn = createEl('button', null, {class: 'edit-btn'});
            const doneInfo = createEl('button', null, {class: 'done-info'});
            const btnDiv = createEl('div', null, {class: 'btn-div'})
            console.log(list)
            btnDiv.appendChild(doneInfo);
            btnDiv.appendChild(editBtn);
            btnDiv.appendChild(delBtn);

            liObj.appendChild(taskText)
            liObj.appendChild(btnDiv)

            li.appendChild(liObj)

            if(task.done) doneInfo.classList.toggle('done');

            listDiv.appendChild(list)
            list.appendChild(li)
                
            const getDoneInfo = task.done ? {'done': false} : {'done': true}
            
            doneInfo.onclick = () => {
                fetchEditPost(task.id, getDoneInfo)
                .then(() => {
                    list.remove()
                    renderTaskList()
                })
            }

            editBtn.onclick = () => {
                const input = createEl('input', null, {class: 'edit-input'})
                input.type = 'text'
                input.value = task.text
                editBtn.disabled = true
                liObj.insertBefore(input, taskText)
                liObj.removeChild(taskText)
                input.addEventListener('blur', () => {
                fetchEditPost(task.id, { text: input.value })
                .then(() => {
                    list.remove()
                    renderTaskList()
                })
            })}

            delBtn.onclick = () => {
                fetchDeletePost(`${task.id}`)
                .then(() => {
                    list.remove()
                    renderTaskList()
                })
            }

        }

        addBtn.onclick = () => {
            if (inputText.value && textArea.value) {
                fetchAddPost({
                    text: `${inputText.value}`,
                    description: `${textArea.value}`
                    })
                    .then(()=> {
                        const list = document.querySelector('#list')
                        list.remove
                        renderTaskList()
                    })
                } else {
                alert('Заполните форму')
            }
        }

        renderTaskList()