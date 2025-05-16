import parseJSON from "../backend/jsonParser.js";
import darkModeLogic from "../theming/darkMode.js";

const scoreBar = document.getElementById('score');
const scoreNum = document.getElementById('score-questions');
const scorePercentile = document.getElementById('score-percentile')

let quizLength;

parseJSON('../json/quizData.json')
  .then(data => {
    // Access the data here:
    quizLength = data.quizLength;
    const len = getQuizData(data.quizLength).quizLength;
    renderPage(len)
  })
  .catch(error => {
    console.error('Failed to load quiz:', error);
});


function renderPage(len) {
    darkModeLogic()

    const score = localStorage.getItem('score');

    const questionsRight = (score/100) * len

    scoreBar.style.setProperty('--width', `${score}%`)

    scoreNum.textContent = `${questionsRight}/${len}`
    scorePercentile.textContent = `${score}%`


    console.log(score)
}

function getQuizData(length) {
    const quizLength = length
    return {quizLength}
}