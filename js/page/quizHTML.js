import parseJSON from "../backend/jsonParser.js";
import createHTMLElement from "../backend/universal.js";
import darkModeLogic from "../theming/darkMode.js";

let quizQuestions, quizTitle, quizLength;

parseJSON('../json/quizData.json')
  .then(data => {
    // Access the data here:
    quizQuestions = data.quizQuestions;
    quizTitle = data.quizTitle;
    quizLength = data.quizLength;
    renderPage(page);
  })
  .catch(error => {
    console.error('Failed to load quiz:', error);
});

let page = 1;

let userAnswers = {};
let correctAnswers = {};

const pageTitle = document.getElementById('quiz-title');

// Elements that vary in text content, per page:
const questionHeader = document.getElementById('question-header');
const questionText = document.getElementById('question-text');
const answerForm = document.getElementById('answer-options')

// Submit button logic/rendering.
let submitButton = document.getElementById('submit-button'); 
submitButton.addEventListener('click', () => { 
    const score = getSessionData().percent;
    localStorage.setItem('score', score)
    window.location.href = `../html/results.html`;
});

// Global function to add dark mode toggle to each page.
darkModeLogic()

function renderPage(pageNum) {
    questionHeader.textContent = '';
    questionText.textContent = '';
    answerForm.innerHTML = '';

    answerForm.addEventListener('submit', (event) => {
        event.preventDefault();
    })

    pageTitle.textContent = quizTitle;

    questionHeader.textContent = `Q - ${pageNum}`;
    questionText.textContent = quizQuestions[pageNum].question; // Correct access

    for (const optionKey in quizQuestions[pageNum].options) {
        const answerButton = createHTMLElement(
            'button',
            `button-${optionKey}`,
            'answer-button',
            `${optionKey}: ${quizQuestions[pageNum].options[optionKey]}`,
            answerForm
        )

        answerButtonLogic()

        answerButton.addEventListener('click', (event) => {
                event.preventDefault()
                userAnswers[pageNum] = optionKey;

                answerButtonLogic()
            }
        )

        submitButtonLogic(pageNum)
    }
}

function answerButtonLogic(id) {
    let buttonID = null;

    const buttons = document.getElementsByClassName('answer-button')

    for (let i = 0; i < buttons.length; i++) {
        const selectedButton = document.getElementById(buttons[i].id)
        
        if (buttons[i].id == `button-${userAnswers[page]}`) {
            selectedButton.style.backgroundColor = 'gray'
        } else {
            selectedButton.style.backgroundColor = 'transparent'
        }
    }

}

function submitButtonLogic(currentPage) {
    if (currentPage === quizLength) {
        submitButton.style.display = 'flex';
    } else {
        submitButton.style.display = 'none';
    }
}

function prevPage() {
    if (page <= 1) return;
    page --
    renderPage(page)
}

function nextPage() {
    if (page >= quizLength) return;
    page++
    renderPage(page)
}


function getSessionData() {
    let count = 0;

    if (quizQuestions) {
        for (let i = 1; i <= quizLength; i++) {
            if (userAnswers[i] === quizQuestions[i].correct) {
                count++;
            }
        }
    }

    const percent = (count / quizLength) * 100;
    return {percent}; // Return as an object
}

export default getSessionData;


window.prevPage = prevPage;
window.nextPage = nextPage;