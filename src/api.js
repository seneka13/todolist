const endpoint = 'http://localhost:3000';


export default {
    fetchAddPost: (body) => {
        return fetch(`${endpoint}/add`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
        })
        .then(response => {
            if(!response.ok) throw new Error('Ошибка создания')
        })
    },

    fetchGetTaskList: () => {
        return fetch(`${endpoint}/list`)
            .then(response => {
                if(!response.ok) throw new Error("Ошибка загрузки")
                return response.json()
        })
    },

    fetchEditPost: (id, body) => {
        return fetch(`${endpoint}/edit/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
        })
    },

    fetchDeletePost: (id) => {
        return fetch(`${endpoint}/delete/${id}`, {
        method: 'DELETE'
        })
    }
}

