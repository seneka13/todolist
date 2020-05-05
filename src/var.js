import {createEl} from './support'

export const inputText = document.querySelector('.form__input');
export const textArea = document.querySelector('.form__textarea');
export const addBtn = document.querySelector('.form__btn');
export const listCont = document.querySelector('.list-cont');
export const errorCont = document.querySelector('.error-cont');
export const statBar = document.querySelector('.stat__bar')
export const errorMsg = createEl('div', null, {
    class: "error-msg"
})
export const errorText = createEl('div', null, {
    class: "error"
});
export const errImg = createEl('img', null, {
    class: 'error-img',
    src: '../icon/error.svg'
});
export const formColor = document.getElementsByName('color__check')
export const colorArr = {
    white: 'var(--beige)',
    pink: 'var(--lightpink)',
    skyblue: 'var(--skyblue)',
    green: 'var(--lightgreen)',
    orange: 'var(--lightorange)'
}