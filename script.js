// fetch('http://localhost:3000/list')
//     .then(response => response.json())
//     .then(data => {
//         const ul = document.querySelector('#list');
//         data.forEach(item => {

//             console.log(item)
//             const li = document.createElement('li');
//             li.textContent = item.text;
//             li.setAttribute('number', item.id);

//             if(item.done) li.classList.add('done')
            
//             ul.appendChild(li)
//             console.log(ul.childNodes)
                
//             })
//         }).then(() => {
//             const todolist = document.querySelectorAll('li');
            

//             todolist.forEach(li => {
//                 li.onclick = () => {
//                     const id = li.getAttribute('number');
//                     const desc = document.createElement('div');
//                     console.log(id)
//                     fetch(`http://localhost:3000/list/${id}`)
//                     .then(response => response.json())
//                     .then(item => {

//                         if (!li.childNodes[1]) {
//                             desc.textContent = item.description;
//                             li.appendChild(desc);
//                             return;
//                         } else {
//                             li.removeChild(li.childNodes[1])
//                         }
//                     })
//                 }
//             })
//         })


const ul = document.querySelector('#list');
const inputText = document.querySelector('.input-postname');
const textArea = document.querySelector('textarea');
const addBtn = document.querySelector('.add-btn')


const fetchEditPost = (id, body) => {
    console.log(body)
    return fetch(`http://localhost:3000/edit/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
    })
};

const fetchDeletePost = (id) => {
    return fetch(`http://localhost:3000/delete/${id}`, {
    method: 'DELETE'
    })
};

const fetchAddPost = (body) => {
    return fetch('http://localhost:3000/add', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
    })
};

const renderTask = (task) => {
    const li = document.createElement('li');
    const liObj = document.createElement('div')
    const taskText = document.createElement('div');
    const delBtn = document.createElement('button');
    const editBtn = document.createElement('button');
    const doneInfo = document.createElement('button');
    const btnDiv = document.createElement('div')


    taskText.textContent = task.text;
    li.setAttribute('data-number', task.id);
    
    taskText.classList.add('task-text')
    btnDiv.classList.add('btn-div')
    delBtn.classList.add('del-btn');
    liObj.classList.add('li-obj');
    editBtn.classList.add('edit-btn');
    doneInfo.classList.add('done-info')

    btnDiv.appendChild(doneInfo);
    btnDiv.appendChild(editBtn);
    btnDiv.appendChild(delBtn);

    liObj.appendChild(taskText)
    liObj.appendChild(btnDiv)
    
    

    li.appendChild(liObj)

    if(task.done) doneInfo.classList.toggle('done');
    ul.appendChild(li)


        doneInfo.onclick = () => {
            fetchEditPost(task.id, {'done': true}).
            then(window.location.reload())
        }

        editBtn.onclick = () => {
            fetchEditPost(task)
        }

        delBtn.onclick = () => {
            fetchDeletePost(`${task.id}`)
            .then(window.location.reload())
        }

    }
    
    fetch('http://localhost:3000/list')
    .then(response => response.json())
    .then(data => {
        data.forEach(renderTask)
        })
        .then(() => {
            const todolist = document.querySelectorAll('li');
            todolist.forEach(li => {
                li.onclick = () => {
                const id = li.getAttribute('data-number');
                const desc = document.createElement('div');

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

    addBtn.onclick = () => {
            if (inputText.value && textArea.value) {
                fetchAddPost({
                    text: `${inputText.value}`,
                    description: `${textArea.value}`
                    })
                    .then(() => window.location.reload())
            } else {
                alert('Заполните форму')
        }
    }