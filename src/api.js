const endpoint = 'http://localhost:3030';


export default {
    fetchAddPost: (body) => {
        return fetch(`${endpoint}/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            .then(response => {
                if (!response.ok) throw new Error('не удалось создать заметку')
            })
    },

    fetchGetTaskList: () => {
        return fetch(`${endpoint}/list`)
            .then(response => {
                if (!response.ok) throw new Error('Ошибка загрузки списка заметок')
                return response.json()
            })
    },

    fetchGetStatistics: () => {
        return fetch(`${endpoint}/statistics`)
            .then(response => {
                if (!response.ok) throw new Error('Ошибка загрузки статистики')
                return response.json()
            })
    },

    fetchEditPost: (id, body) => {
        return fetch(`${endpoint}/edit/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(response => {
            if (!response.ok) throw new Error('ошибка при редактировании')
        })
    },

    fetchDeletePost: (id) => {
        return fetch(`${endpoint}/delete/${id}`, {
            method: 'DELETE'
        }).then(response => {
            if (!response.ok) throw new Error('ошибка при удалении')
        })
    },
}