import {
    createEl
} from './creators'


export const getColorInput = () => {
    const divColor = createEl('div', null, {
        class: 'color'
    })
    const colorInput = document.querySelectorAll('.color__check');
    colorInput.forEach((item) => {
        const colorAtr = item.getAttribute('class');
        const label = createEl('label', null, {});
        const radioInput = createEl('input', null, {
            type: "radio",
            name: "color__check"
        });
        const color = createEl('div', null, {
            class: `${colorAtr}`
        })
        label.appendChild(radioInput);
        label.appendChild(color);
        divColor.appendChild(label)
    })
    return divColor
}


$(document).ready(function(){
    $('button').hide
})