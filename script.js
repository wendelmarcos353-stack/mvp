document.addEventListener("DOMContentLoaded", () => {
  // Mapeamento dos arquivos JSON gerados
  const arquivosDasDisciplinas = {
    portugues: './data/lote1_portugues_80_questoes.json',
    matematica: './data/lote2_matematica_80_questoes.json',
    historia: './data/lote3_historia_80_questoes.json',
    geografia: './data/lote4_geografia_80_questoes.json',
    fisica: './data/lote5_fisica_80_questoes.json',
    quimica: './data/lote6_quimica_80_questoes.json',
    sociologia: './data/lote7_sociologia_80_questoes.json',
    filosofia: './data/lote8_filosofia_80_questoes.json'
  };

  let currentSubject = null;
  let currentQuestions = [];
  let currentQuestionIndex = 0;
  let scoreCorrect = 0;
  let scoreIncorrect = 0;
  let timerInterval = null;
  let timeLeft = 30;

  // Gerenciamento do Modo Escuro
  const btnThemeToggle = document.getElementById("btn-theme-toggle");
  const isDarkMode = localStorage.getItem("tech_bonder_theme") === "dark";

  if (isDarkMode) {
    document.body.classList.add("dark-mode");
    btnThemeToggle.textContent = "☀️";
  }

  btnThemeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const darkModeActive = document.body.classList.contains("dark-mode");
    btnThemeToggle.textContent = darkModeActive ? "☀️" : "🌙";
    localStorage.setItem("tech_bonder_theme", darkModeActive ? "dark" : "light");
  });

  // Efeitos sonoros via Web Audio API
  const playSound = (type) => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "correct") {
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
        gain.gain.fadeOut(ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === "incorrect") {
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.setValueAtTime(180, ctx.currentTime + 0.1);
        gain.gain.fadeOut(ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch (e) {
      console.log("Áudio não suportado neste navegador.");
    }
  };

  // Elementos DOM
  const screens = {
    welcome: document.getElementById("screen-welcome"),
    subjects: document.getElementById("screen-subjects"),
    quiz: document.getElementById("screen-quiz"),
    feedback: document.getElementById("screen-feedback")
  };

  const btnStart = document.getElementById("btn-start");
  const btnBackWelcome = document.getElementById("btn-back-welcome");
  const btnNext = document.getElementById("btn-next");
  const btnRestart = document.getElementById("btn-restart");
  const btnHome = document.getElementById("btn-home");
  const subjectCards = document.querySelectorAll(".subject-card");
  const quizSubjectTitle = document.getElementById("quiz-subject-title");
  const questionCounter = document.getElementById("question-counter");
  const questionText = document.getElementById("question-text");
  const optionsContainer = document.getElementById("options-container");
  const correctCountElem = document.getElementById("correct-count");
  const incorrectCountElem = document.getElementById("incorrect-count");
  const feedbackMessage = document.getElementById("feedback-message");
  const timerDisplay = document.getElementById("timer-display");
  const progressBar = document.getElementById("progress-bar");
  const explanationBox = document.getElementById("explanation-box");
  const globalScoreElem = document.getElementById("global-score");

  // Pontuação Global
  let globalScore = parseInt(localStorage.getItem("tech_bonder_score")) || 0;
  globalScoreElem.textContent = globalScore;

  function updateGlobalScore(points) {
    globalScore += points;
    localStorage.setItem("tech_bonder_score", globalScore);
    globalScoreElem.textContent = globalScore;
  }

  function showScreen(screenKey) {
    Object.values(screens).forEach((s) => s.classList.remove("active"));
    screens[screenKey].classList.add("active");
  }

  function shuffleArray(arr) {
    let t = [...arr];
    for (let n = t.length - 1; n > 0; n--) {
      const o = Math.floor(Math.random() * (n + 1));
      [t[n], t[o]] = [t[o], t[n]];
    }
    return t;
  }

  function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 30;
    timerDisplay.textContent = `⏱️ ${timeLeft}s`;

    timerInterval = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = `⏱️ ${timeLeft}s`;

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        handleTimeout();
      }
    }, 1000);
  }

  function handleTimeout() {
    const currentQ = currentQuestions[currentQuestionIndex];
    const options = optionsContainer.querySelectorAll(".option-btn");

    options.forEach((btn) => {
      btn.disabled = true;
      if (btn.textContent === currentQ.answer) {
        btn.classList.add("correct");
      }
    });

    scoreIncorrect++;
    playSound("incorrect");

    if (currentQ.explanation) {
      explanationBox.textContent = `Tempo esgotado! ${currentQ.explanation}`;
      explanationBox.style.display = "block";
    }

    btnNext.textContent = currentQuestionIndex < currentQuestions.length - 1 ? "Próxima Pergunta" : "Ver Resultado";
    btnNext.style.display = "block";
  }

  // --- NOVA FUNÇÃO ASSÍNCRONA PARA BUSCAR O JSON E GERENCIAR MEMÓRIA ---
  async function startQuiz(subjectKey) {
    currentSubject = subjectKey;
    currentQuestionIndex = 0;
    scoreCorrect = 0;
    scoreIncorrect = 0;

    quizSubjectTitle.textContent = subjectKey.charAt(0).toUpperCase() + subjectKey.slice(1);
    showScreen("quiz");

    // Feedback visual de carregamento
    questionText.textContent = "Carregando questões...";
    optionsContainer.innerHTML = "";
    btnNext.style.display = "none";
    explanationBox.style.display = "none";
    clearInterval(timerInterval);

    try {
      const caminhoJson = arquivosDasDisciplinas[subjectKey];
      const resposta = await fetch(caminhoJson);
      
      if (!resposta.ok) {
        throw new Error(`Erro HTTP: ${resposta.status}`);
      }

      const dados = await resposta.json();
      const todasAsQuestoes = dados[subjectKey]; // Puxa as 80 do array

      // Memória do localStorage
      const chaveMemoria = `tech_bonder_vistas_${subjectKey}`;
      let questoesVistas = JSON.parse(localStorage.getItem(chaveMemoria)) || [];

      // Filtra as inéditas
      let questoesIneditas = todasAsQuestoes.filter(q => !questoesVistas.includes(q.question));

      // Se acabaram as perguntas inéditas (ou restarem menos de 5), reseta o ciclo
      if (questoesIneditas.length < 5) {
        console.log(`Banco de ${subjectKey} esgotado! Recomeçando ciclo...`);
        questoesVistas = [];
        questoesIneditas = todasAsQuestoes;
      }

      // Embaralha e separa 5
      questoesIneditas = shuffleArray(questoesIneditas);
      const questoesDestaRodada = questoesIneditas.slice(0, 5);

      // Salva as novas 5 na memória para a próxima jogada
      const textoDasNovasQuestoes = questoesDestaRodada.map(q => q.question);
      localStorage.setItem(chaveMemoria, JSON.stringify([...questoesVistas, ...textoDasNovasQuestoes]));

      // Formata a rodada atual embaralhando as opções também
      currentQuestions = questoesDestaRodada.map((q) => ({
        question: q.question,
        options: shuffleArray(q.options),
        answer: q.answer,
        explanation: q.explanation
      }));

      loadQuestion();

    } catch (erro) {
      console.error("Erro ao carregar as questões:", erro);
      questionText.textContent = "Erro ao carregar a disciplina. Verifique se os arquivos JSON estão na pasta '/data/' e se você está rodando o projeto através de um servidor local (Live Server).";
    }
  }

  function loadQuestion() {
    clearInterval(timerInterval);
    btnNext.style.display = "none";
    explanationBox.style.display = "none";

    const currentQ = currentQuestions[currentQuestionIndex];
    const progressPercent = (currentQuestionIndex / currentQuestions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    questionCounter.textContent = `Pergunta ${currentQuestionIndex + 1} de ${currentQuestions.length}`;
    questionText.textContent = currentQ.question;
    optionsContainer.innerHTML = "";

    currentQ.options.forEach((optText) => {
      const btn = document.createElement("button");
      btn.classList.add("option-btn");
      btn.textContent = optText;
      btn.addEventListener("click", () => selectOption(optText, btn));
      optionsContainer.appendChild(btn);
    });

    startTimer();
  }

  function selectOption(selectedOpt, btnElement) {
    clearInterval(timerInterval);
    const currentQ = currentQuestions[currentQuestionIndex];
    const allButtons = optionsContainer.querySelectorAll(".option-btn");

    allButtons.forEach((b) => (b.disabled = true));

    if (selectedOpt === currentQ.answer) {
      btnElement.classList.add("correct");
      scoreCorrect++;
      updateGlobalScore(10);
      playSound("correct");
    } else {
      btnElement.classList.add("incorrect");
      scoreIncorrect++;
      playSound("incorrect");

      allButtons.forEach((b) => {
        if (b.textContent === currentQ.answer) {
          b.classList.add("correct");
        }
      });
    }

    if (currentQ.explanation) {
      explanationBox.textContent = currentQ.explanation;
      explanationBox.style.display = "block";
    }

    btnNext.textContent = currentQuestionIndex < currentQuestions.length - 1 ? "Próxima Pergunta" : "Ver Resultado";
    btnNext.style.display = "block";
  }

  function showFeedback() {
    progressBar.style.width = `100%`;
    correctCountElem.textContent = scoreCorrect;
    incorrectCountElem.textContent = scoreIncorrect;

    const trophyElem = document.getElementById("trophy-icon");

    if (scoreCorrect === currentQuestions.length) {
      feedbackMessage.textContent = "Incrível! Você gabaritou todas as questões!";
      trophyElem.textContent = "🏆";
    } else if (scoreCorrect >= currentQuestions.length / 2) {
      feedbackMessage.textContent = "Bom trabalho! Você teve um bom desempenho.";
      trophyElem.textContent = "🌟";
    } else {
      feedbackMessage.textContent = "Continue praticando! Na próxima você consegue um resultado melhor.";
      trophyElem.textContent = "📚";
    }

    showScreen("feedback");
  }

  // Event Listeners
  btnStart.addEventListener("click", () => showScreen("subjects"));
  btnBackWelcome.addEventListener("click", () => showScreen("welcome"));
  btnHome.addEventListener("click", () => showScreen("welcome"));
  btnRestart.addEventListener("click", () => showScreen("subjects"));

  subjectCards.forEach((card) => {
    card.addEventListener("click", () => {
      const subjectKey = card.getAttribute("data-subject");
      startQuiz(subjectKey);
    });
  });

  btnNext.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestions.length) {
      loadQuestion();
    } else {
      showFeedback();
    }
  });
});