function createHTMLElement(tag, id, className, text, parent) {
    const element = document.createElement(tag);

    if (id) element.id = id;
    if (className) element.classList.add(className);
    if (text) element.textContent = text;
    if (parent) parent.appendChild(element);

    return element;
}

export default createHTMLElement;