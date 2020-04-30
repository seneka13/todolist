const endpoint = 'http://localhost:3000';


export default function(){
    const fetchAddPost = (body) => {
        return fetch(`${endpoint}/add`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
        })
        .then(response => {
            if(!response.ok) throw new Error('Ошибка создания')
        })
    };
}