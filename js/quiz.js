let questions;
let page = 1;
let userAnswers = {};
let correctAnswers = {};

fetch('/json/quizData.json')
    .then(response => response.json())
    .then(quizData => {
        questions = quizData.questions; // Store questions in the global scope
        length = Object.keys(quizData.questions).length;

        loadTitle(quizData.name);
        loadPage(quizData, page);
        getCorrectAnswers(quizData);
    })
    .catch(error => {
        console.error('Error fetching quiz data:', error);
    });

function getCorrectAnswers(quizData) {
    let id = 1;

    Object.values(quizData.questions).forEach(question => { // Use Object.values to iterate over question objects directly
        correctAnswers[id] = question.correct;
        id++;
    });

    console.log(correctAnswers);
}

function loadPage(quizData, page) {
    const container = document.getElementById('container');
    container.innerHTML = '';

    const question = quizData.questions[page];

    const headerText = createElement(
        'h1', 
        `Q${page}`, 
        'question-header', 
        container
    );    
    
    const questionText = createElement(
        'h2', 
        question.question, 
        'question-text', 
        container
    );

    const answerOptions = createElement(
        'form', 
        null, 
        'answer-options',
        null
    );

    if (question.options) {
        // Iterate over the options
        Object.entries(question.options).forEach(([optionKey, optionValue]) => {
            const button = createElement(
                'button', 
                `${optionKey}: ${optionValue}`, 
                'answer-button',
                null
            );

            button.id = `button-${optionKey}`; // Assign an ID to the button
            
            if (optionKey === userAnswers[page]) button.style.backgroundColor = '#C8D0FF';
            
            button.addEventListener('click', (event) => {
                event.preventDefault();
                selectAnswer(page, optionKey, button.id);
            });
            
            answerOptions.appendChild(button);
        });
    }

    answerOptions.addEventListener('submit', (event) => 
        event.preventDefault()
    );

    container.appendChild(answerOptions);
}

function createElement(tag, text, className, parent) {
    const element = document.createElement(tag);

    if (text) element.textContent = text;
    if (className) element.classList.add(className);
    if (parent) parent.appendChild(element);

    return element;
}

function loadTitle(name) {
    const quizTitle = document.getElementById('quiz-title');
    quizTitle.textContent = name;

    const pageTitle = document.getElementById('page-title');
    pageTitle.textContent = name;
}

function selectAnswer(questionNumber, answer, id) {
    userAnswers[questionNumber] = answer;

    console.log(userAnswers);

    // Update button styles for the current question
    const buttons = document.querySelectorAll(`#container button`); // Select buttons within the container
    
    buttons.forEach(button => {
        if (button.id === id) {
            button.style.backgroundColor = '#C8D0FF'; // Highlight selected
        } else {
            button.style.backgroundColor = 'transparent'; // Reset others
        }
    });
}

function previousQuestion() {
    if (page <= 1) return;
    page--;
    loadPage({ questions }, page); // Pass questions as quizData
}

function nextQuestion() {
    if (page >= length) return;
    page++;
    loadPage({ questions }, page); // Pass questions as quizData
}