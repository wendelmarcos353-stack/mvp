document.addEventListener("DOMContentLoaded", () => {
  const quizData = {
    matematica: [
      {
        question: "Quanto é 7 x 8?",
        options: ["54", "56", "64", "49"],
        answer: "56"
      },
      {
        question: "Qual é a raiz quadrada de 144?",
        options: ["10", "11", "12", "14"],
        answer: "12"
      },
      {
        question:
          "Se um triângulo tem lados medindo 3, 4 e 5, qual é o seu perímetro?",
        options: ["10", "12", "15", "9"],
        answer: "12"
      },
      {
        question: "Quanto é 25% de 200?",
        options: ["25", "40", "50", "75"],
        answer: "50"
      },
      {
        question: "Qual é o valor de x na equação: 2x + 6 = 14?",
        options: ["x = 2", "x = 4", "x = 8", "x = 10"],
        answer: "x = 4"
      }
    ],
    portugues: [
      {
        question:
          "Qual das alternativas abaixo contém apenas palavras oxítonas?",
        options: [
          "Café, sofá, cajá",
          "Lâmpada, mesa, cadeira",
          "Árvore, lápis, fácil",
          "Livro, caderno, caneta"
        ],
        answer: "Café, sofá, cajá"
      },
      {
        question: "O que é um antônimo?",
        options: [
          "Palavras com o mesmo significado",
          "Palavras com significados opostos",
          "Palavras que soam igual",
          "O sujeito da oração"
        ],
        answer: "Palavras com significados opostos"
      },
      {
        question:
          "Assinale a alternativa em que a crase foi empregada corretamente:",
        options: [
          "Fui à praia ontem.",
          "Entreguei o caderno à você.",
          "Comprei o livro à prazo.",
          "Cheguei à tarde."
        ],
        answer: "Fui à praia ontem."
      },
      {
        question:
          "Qual figura de linguagem está presente em: 'O vento sussurrava segredos na noite'?",
        options: [
          "Metáfora",
          "Personificação (Prosopopeia)",
          "Hipérbole",
          "Antítese"
        ],
        answer: "Personificação (Prosopopeia)"
      },
      {
        question: "Qual é a classe gramatical da palavra 'rapidamente'?",
        options: ["Substantivo", "Adjetivo", "Verbo", "Advérbio"],
        answer: "Advérbio"
      }
    ],
    ciencias: [
      {
        question:
          "Qual é o principal gás responsável pelo Efeito Estufa natural na Terra?",
        options: [
          "Oxigênio",
          "Nitrogênio",
          "Dióxido de Carbono (CO2)",
          "Hélio"
        ],
        answer: "Dióxido de Carbono (CO2)"
      },
      {
        question: "Qual é a unidade básica da vida em todos os organismos?",
        options: ["Átomo", "Célula", "Tecido", "Molécula"],
        answer: "Célula"
      },
      {
        question:
          "Qual planeta do Sistema Solar é conhecido como o Planeta Vermelho?",
        options: ["Vênus", "Júpiter", "Marte", "Saturno"],
        answer: "Marte"
      },
      {
        question:
          "Qual é o órgão responsável por bombear o sangue pelo corpo humano?",
        options: ["Pulmão", "Cérebro", "Coração", "Fígado"],
        answer: "Coração"
      },
      {
        question:
          "Qual o processo pelo qual as plantas produzem seu próprio alimento?",
        options: [
          "Respiração celular",
          "Fotossíntese",
          "Transpiração",
          "Fermentação"
        ],
        answer: "Fotossíntese"
      }
    ],
    historia: [
      {
        question: "Em que ano ocorreu a Proclamação da República no Brasil?",
        options: ["1822", "1889", "1500", "1930"],
        answer: "1889"
      },
      {
        question:
          "Qual civilização antiga construiu as famosas Pirâmides de Gizé?",
        options: ["Grega", "Romana", "Egípcia", "Maia"],
        answer: "Egípcia"
      },
      {
        question:
          "Quem foi o líder indiano famoso por sua luta pacífica pela independência do país?",
        options: [
          "Nelson Mandela",
          "Che Guevara",
          "Mahatma Gandhi",
          "Martin Luther King"
        ],
        answer: "Mahatma Gandhi"
      },
      {
        question:
          "Qual foi o principal evento que marcou o início da Idade Contemporânea em 1789?",
        options: [
          "A Queda do Império Romano",
          "A Revolução Francesa",
          "O Descobrimento do Brasil",
          "A Primeira Guerra Mundial"
        ],
        answer: "A Revolução Francesa"
      },
      {
        question: "Quem foi o primeiro imperador do Brasil?",
        options: [
          "Dom Pedro I",
          "Dom Pedro II",
          "Tiradentes",
          "Marechal Deodoro da Fonseca"
        ],
        answer: "Dom Pedro I"
      }
    ]
  };
  let currentSubject = null,
    currentQuestions = [],
    currentQuestionIndex = 0,
    scoreCorrect = 0,
    scoreIncorrect = 0;
  const screens = {
      welcome: document.getElementById("screen-welcome"),
      subjects: document.getElementById("screen-subjects"),
      quiz: document.getElementById("screen-quiz"),
      feedback: document.getElementById("screen-feedback")
    },
    btnStart = document.getElementById("btn-start"),
    btnBackWelcome = document.getElementById("btn-back-welcome"),
    btnNext = document.getElementById("btn-next"),
    btnRestart = document.getElementById("btn-restart"),
    btnHome = document.getElementById("btn-home"),
    subjectCards = document.querySelectorAll(".subject-card"),
    quizSubjectTitle = document.getElementById("quiz-subject-title"),
    questionCounter = document.getElementById("question-counter"),
    questionText = document.getElementById("question-text"),
    optionsContainer = document.getElementById("options-container"),
    correctCountElem = document.getElementById("correct-count"),
    incorrectCountElem = document.getElementById("incorrect-count"),
    feedbackMessage = document.getElementById("feedback-message");
  function showScreen(e) {
    Object.values(screens).forEach((t) => t.classList.remove("active")),
      screens[e].classList.add("active");
  }
  function shuffleArray(e) {
    let t = [...e];
    for (let n = t.length - 1; n > 0; n--) {
      const o = Math.floor(Math.random() * (n + 1));
      [t[n], t[o]] = [t[o], t[n]];
    }
    return t;
  }
  function startQuiz(e) {
    (currentQuestions = quizData[e].map((t) => ({
      question: t.question,
      options: shuffleArray(t.options),
      answer: t.answer
    }))),
      (currentQuestionIndex = 0),
      (scoreCorrect = 0),
      (scoreIncorrect = 0),
      (quizSubjectTitle.textContent = e.charAt(0).toUpperCase() + e.slice(1)),
      showScreen("quiz"),
      loadQuestion();
  }
  function loadQuestion() {
    btnNext.style.display = "none";
    const e = currentQuestions[currentQuestionIndex];
    (questionCounter.textContent = `Pergunta ${currentQuestionIndex + 1} de ${
      currentQuestions.length
    }`),
      (questionText.textContent = e.question),
      (optionsContainer.innerHTML = ""),
      e.options.forEach((t) => {
        const n = document.createElement("button");
        n.classList.add("option-btn"),
          (n.textContent = t),
          n.addEventListener("click", () => selectOption(t, n)),
          optionsContainer.appendChild(n);
      });
  }
  function selectOption(e, t) {
    const n = currentQuestions[currentQuestionIndex],
      o = optionsContainer.querySelectorAll(".option-btn");
    o.forEach((s) => (s.disabled = !0)),
      e === n.answer
        ? (t.classList.add("correct"), scoreCorrect++)
        : (t.classList.add("incorrect"),
          o.forEach((s) => {
            s.textContent === n.answer && s.classList.add("correct");
          }),
          scoreIncorrect++),
      (btnNext.textContent =
        currentQuestionIndex < currentQuestions.length - 1
          ? "Próxima Pergunta"
          : "Ver Resultado"),
      (btnNext.style.display = "block");
  }
  function showFeedback() {
    (correctCountElem.textContent = scoreCorrect),
      (incorrectCountElem.textContent = scoreIncorrect),
      scoreCorrect === currentQuestions.length
        ? (feedbackMessage.textContent =
            "Incrível! Você gabaritou todas as questões!")
        : scoreCorrect >= currentQuestions.length / 2
        ? (feedbackMessage.textContent =
            "Bom trabalho! Você teve um bom desempenho.")
        : (feedbackMessage.textContent =
            "Continue praticando! Na próxima você consegue um resultado melhor."),
      showScreen("feedback");
  }
  btnStart.addEventListener("click", () => showScreen("subjects")),
    btnBackWelcome.addEventListener("click", () => showScreen("welcome")),
    btnHome.addEventListener("click", () => showScreen("welcome")),
    btnRestart.addEventListener("click", () => showScreen("subjects")),
    subjectCards.forEach((e) => {
      e.addEventListener("click", () => {
        (currentSubject = e.getAttribute("data-subject")),
          startQuiz(currentSubject);
      });
    }),
    btnNext.addEventListener("click", () => {
      ++currentQuestionIndex < currentQuestions.length
        ? loadQuestion()
        : showFeedback();
    });
});
