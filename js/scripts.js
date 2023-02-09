// Declaração de variáveis
const question = document.querySelector("#questions");
const answersBox = document.querySelector("#answers-box");
const quizContainer = document.querySelector("#quiz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ["a", "b", "c", "d"];
let points = 0;
let actualQuestion = 0;

// Perguntas
const questions = [
    {
      "question": "PHP foi desenvolvido para qual fim?",
      "answers": [
        {
          "answer": "back-end",
          "correct": true
        },
        {
          "answer": "front-end",
          "correct": false
        },
        {
          "answer": "Sistema operacional",
          "correct": false
        },
        {
          "answer": "Banco de dados",
          "correct": false
        },
      ]
    },
    {
      "question": "Uma forma de declarar variável em JavaScript:",
      "answers": [
        {
          "answer": "$var",
          "correct": false
        },
        {
          "answer": "var",
          "correct": true
        },
        {
          "answer": "@var",
          "correct": false
        },
        {
          "answer": "#let",
          "correct": false
        },
      ]
    },
    {
      "question": "Qual o seletor de id no CSS?",
      "answers": [
        {
          "answer": "/",
          "correct": false
        },
        {
          "answer": ".",
          "correct": false
        },
        {
          "answer": "@",
          "correct": false
        },
        {
          "answer": "#",
          "correct": true
        },
      ]
    },
  ]

// Substituição do quiz para a primeira pergunta

function init() {
    // criar a primeira pergunta
    createQuestion(actualQuestion);
}

// Cria pergunta
function createQuestion(i) {
    // Limpar a questão anterior
    const oldButtons = answersBox.querySelectorAll("button");
    oldButtons.forEach(function(btn) {
        btn.remove();
    });

    // Alterar o texto da pergunta
    const questionText = question.querySelector("#question-text");
    const questionNumber = question.querySelector("#question-number");

    questionText.textContent = questions[i].question;
    questionNumber.textContent = i + 1;

    // Insere as alternativas
    questions[i].answers.forEach(function(answer, i) {
        // Cria o template do botão do quiz
        const answerTemplate = document.querySelector(".answer-template").cloneNode(true);

        const letterBtn = answerTemplate.querySelector(".btn-letter");
        const answerText = answerTemplate.querySelector(".question-answer");

        letterBtn.textContent = letters[i];
        answerText.textContent = answer['answer'];

        answerTemplate.setAttribute("correct-answer", answer['correct']);

        // Remover hide e template class
        answerTemplate.classList.remove("hide");
        answerTemplate.classList.remove("answer-template");

        // Inserir alternativa na tela
        answersBox.appendChild(answerTemplate);

        // Inserir evento de click no botão
        answerTemplate.addEventListener("click", function(){
            checkAnswer(this);
        });
    });

    // Incrementar o número da questão
    actualQuestion++;
}

// verificando resposta do usuário
function checkAnswer(btn) {
    
    const buttons = document.querySelectorAll("button");

    // verificar se a resposta está correta e adiciona classes nos botões
    buttons.forEach(function(button) {
        if(button.getAttribute("correct-answer") === "true"){
            button.classList.add("correct-answer");

            if(btn === button) {
                points++;
            }
        } else {
            button.classList.add("wrong-answer");
        }
    });

    // Exibir a próxima pergunta
    nextQuestion();
}

// exibe a próxima pergunta do quiz
function nextQuestion() {

    setTimeout(function(){
        // verifica se ainda há perguntas
        if(actualQuestion >= questions.length) {
            showSuccessMessage();
            return;
        }

        createQuestion(actualQuestion);

    }, 1500);
}

// exibe a tela final
function showSuccessMessage() {

    hideOrShowQuiz();

    // trocar dados da tela de sucesso

    // calcular score
    const score = ((points / questions.length) * 100).toFixed(2);
    const displayScore = document.querySelector("#display-score span");
    displayScore.textContent = score.toString();

    // alter o número de perguntas corretas
    const correctAnswers = document.querySelector("#correct-answers");
    correctAnswers.textContent = points;

    // alter o total de perguntas
    const totalQuestions = document.querySelector("#questions-qty");
    totalQuestions.textContent = questions.length;
}

// mostra ou esconde score
function hideOrShowQuiz() {
    quizContainer.classList.toggle("hide");
    scoreContainer.classList.toggle("hide");
}

// Reiniciar quiz
const restartBtn = document.querySelector("#restart");

restartBtn.addEventListener("click", function() {
    actualQuestion = 0;
    points = 0;
    hideOrShowQuiz();
    init();
});

// Inicialização do Quiz
init();