fetch('http://localhost:3000/list')
    .then(response => response.json())
    .then(data => {
        const ul = document.querySelector('#list');
        data.forEach(item => {

            console.log(item)
            const li = document.createElement('li');
            li.textContent = item.text;
            li.setAttribute('number', item.id);

            if(item.done) li.classList.add('done')
            
            ul.appendChild(li)
            console.log(ul.childNodes)
                
            })
        }).then(() => {
            const todolist = document.querySelectorAll('li');
            

            todolist.forEach(li => {
                li.onclick = () => {
                    const id = li.getAttribute('number');
                    const desc = document.createElement('div');
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
    