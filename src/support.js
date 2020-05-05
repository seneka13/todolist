export const createEl = (tag, text, atr = {}) => {
    const elem = document.createElement(tag);
    elem.textContent = text;
    Object.keys(atr).forEach((key) => {
        elem.setAttribute(key, atr[key])
    })
    return elem
};

export const findParent = (node, className) => {
    while (node) {
        if (node.classList.contains(className)) {
        return node;
        } else {
        node = node.parentNode;
        }
    }
    return null;
    };