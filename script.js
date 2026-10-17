document.addEventListener("DOMContentLoaded", () => {
  const quizData = {
    matematica: [
      {
        question: "Quanto é 7 x 8?",
        options: ["54", "56", "64", "49"],
        answer: "56",
        explanation: "Pela tabuada, 7 multiplicado por 8 resulta em 56."
      },
      {
        question: "Qual é a raiz quadrada de 144?",
        options: ["10", "11", "12", "14"],
        answer: "12",
        explanation: "12 x 12 = 144, portanto a raiz quadrada de 144 é 12."
      },
      {
        question:
          "Se um triângulo tem lados medindo 3, 4 e 5, qual é o seu perímetro?",
        options: ["10", "12", "15", "9"],
        answer: "12",
        explanation: "O perímetro é a soma de todos os lados: 3 + 4 + 5 = 12."
      },
      {
        question: "Quanto é 25% de 200?",
        options: ["25", "40", "50", "75"],
        answer: "50",
        explanation: "25% equivale à quarta parte do valor (200 / 4 = 50)."
      },
      {
        question: "Qual é o valor de x na equação: 2x + 6 = 14?",
        options: ["x = 2", "x = 4", "x = 8", "x = 10"],
        answer: "x = 4",
        explanation: "2x = 14 - 6 => 2x = 8 => x = 4."
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
        answer: "Café, sofá, cajá",
        explanation:
          "Palavras oxítonas têm a última sílaba como a sílaba tônica."
      },
      {
        question: "O que é um antônimo?",
        options: [
          "Palavras com o mesmo significado",
          "Palavras com significados opostos",
          "Palavras que soam igual",
          "O sujeito da oração"
        ],
        answer: "Palavras com significados opostos",
        explanation:
          "Antônimos são palavras com sentidos contrários (ex: claro e escuro)."
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
        answer: "Fui à praia ontem.",
        explanation:
          "Ocorre crase antes de substantivos femininos que exigem a preposição 'a'."
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
        answer: "Personificação (Prosopopeia)",
        explanation:
          "Atribuir ações humanas (sussurrar) a seres inanimados (vento) é personificação."
      },
      {
        question: "Qual é a classe gramatical da palavra 'rapidamente'?",
        options: ["Substantivo", "Adjetivo", "Verbo", "Advérbio"],
        answer: "Advérbio",
        explanation:
          "Palavras terminadas em '-mente' que indicam modo são advérbios."
      }
    ],
    quimica: [
      {
        question:
          "Qual é o principal gás responsável pelo Efeito Estufa natural na Terra?",
        options: [
          "Oxigênio",
          "Nitrogênio",
          "Dióxido de Carbono (CO2)",
          "Hélio"
        ],
        answer: "Dióxido de Carbono (CO2)",
        explanation:
          "O CO2 retém a radiação infravermelha, mantendo a Terra aquecida."
      },
      {
        question: "Qual é a unidade básica da vida em todos os organismos?",
        options: ["Átomo", "Célula", "Tecido", "Molécula"],
        answer: "Célula",
        explanation:
          "A célula é a menor unidade estrutural e funcional dos seres vivos."
      },
      {
        question:
          "Um átomo neutro de Cloro possui Z = 17 e A = 35. Qual é a quantidade de prótons, nêutrons e elétrons?",
        options: [
          "17 prótons, 18 nêutrons e 17 elétrons",
          "17 prótons, 35 nêutrons e 17 elétrons",
          "35 prótons, 17 nêutrons e 35 elétrons",
          "18 prótons, 17 nêutrons e 18 elétrons"
        ],
        answer: "17 prótons, 18 nêutrons e 17 elétrons",
        explanation:
          "Prótons = Z (17); Elétrons em átomo neutro = Z (17); Nêutrons = A - Z (35 - 17 = 18)."
      },
      {
        question:
          "Qual é o órgão responsável por bombear o sangue pelo corpo humano?",
        options: ["Pulmão", "Cérebro", "Coração", "Fígado"],
        answer: "Coração",
        explanation:
          "O coração é o órgão muscular encarregado do bombeamento sanguíneo."
      },
      {
        question:
          "O cloreto de sódio (NaCl) é formado por qual tipo de ligação química?",
        options: [
          "Ligação iônica com transferência de elétrons",
          "Ligação metálica com formação de elétrons livres",
          "Ligação de hidrogênio com atração entre dipolos permanentes",
          "Ligação covalente com compartilhamento de pares eletrônicos"
        ],
        answer: "Ligação iônica com transferência de elétrons",
        explanation:
          "Ocorre transferência de elétrons entre um metal (Na) e um não-metal (Cl)."
      }
    ],
    historia: [
      {
        question: "Em que ano ocorreu a Proclamação da República no Brasil?",
        options: ["1822", "1889", "1500", "1930"],
        answer: "1889",
        explanation:
          "Ocorreu em 15 de novembro de 1889, liderada pelo Marechal Deodoro da Fonseca."
      },
      {
        question:
          "Qual civilização antiga construiu as famosas Pirâmides de Gizé?",
        options: ["Grega", "Romana", "Egípcia", "Maia"],
        answer: "Egípcia",
        explanation:
          "Construídas durante o Antigo Império Egípcio como monumentos funerários."
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
        answer: "Mahatma Gandhi",
        explanation:
          "Gandhi utilizou a estratégia da resistência não-violenta e desobediência civil."
      },
      {
        question: "Qual evento marcou o início da Idade Contemporânea em 1789?",
        options: [
          "A Queda do Império Romano",
          "A Revolução Francesa",
          "O Descobrimento do Brasil",
          "A Primeira Guerra Mundial"
        ],
        answer: "A Revolução Francesa",
        explanation:
          "A Revolução Francesa pôs fim ao Absolutismo e iniciou a Idade Contemporânea."
      },
      {
        question: "Quem foi o primeiro imperador do Brasil?",
        options: [
          "Dom Pedro I",
          "Dom Pedro II",
          "Tiradentes",
          "Marechal Deodoro da Fonseca"
        ],
        answer: "Dom Pedro I",
        explanation:
          "Dom Pedro I proclamou a Independência em 1822 e tornou-se o primeiro imperador."
      }
    ],
    filosofia: [
      {
        question:
          "Qual filósofo grego é famoso pela frase 'Só sei que nada sei'?",
        options: ["Aristóteles", "Sócrates", "Platão", "Pitágoras"],
        answer: "Sócrates",
        explanation:
          "Frase célebre de Sócrates que destaca o ponto de partida para a busca da sabedoria."
      },
      {
        question:
          "No famoso 'Mito da Caverna' de Platão, o que representam as sombras?",
        options: [
          "A verdade absoluta sobre o mundo",
          "A ilusão e as aparências do mundo sensível",
          "O conhecimento científico avançado",
          "A sabedoria dos deuses gregos"
        ],
        answer: "A ilusão e as aparências do mundo sensível",
        explanation:
          "As sombras representam o conhecimento falso obtido apenas pelos sentidos."
      },
      {
        question: "Para Aristóteles, qual é a busca central da vida ética?",
        options: [
          "A riqueza material",
          "A busca pelo poder",
          "A felicidade (Eudaimonia)",
          "O isolamento do mundo"
        ],
        answer: "A felicidade (Eudaimonia)",
        explanation:
          "Para Aristóteles, a Eudaimonia (felicidade plena) é o objetivo supremo do ser humano."
      },
      {
        question:
          "Qual frase célebre de René Descartes resume sua primeira certeza existencial?",
        options: [
          "O homem é o lobo do homem.",
          "Penso, logo existo.",
          "Deus está morto.",
          "O conhecimento é poder."
        ],
        answer: "Penso, logo existo.",
        explanation:
          "Conclusão de Descartes de que o ato de duvidar e pensar comprova a própria existência."
      },
      {
        question:
          "Segundo Thomas Hobbes, como seria a vida humana no 'Estado de Natureza'?",
        options: [
          "Um estado de paz perfeita e harmonia comunitária",
          "Uma constante situação de guerra e insegurança",
          "Um período de grande avanço tecnológico",
          "Uma vida dedicada inteiramente à arte e ao estudo"
        ],
        answer: "Uma constante situação de guerra e insegurança",
        explanation:
          "Hobbes defendia que sem leis ou um Estado forte, os seres humanos viveriam em guerra contínua."
      }
    ],
    sociologia: [
      {
        question:
          "Qual sociólogo clássico desenvolveu o conceito de 'Fato Social'?",
        options: ["Karl Marx", "Émile Durkheim", "Max Weber", "Auguste Comte"],
        answer: "Émile Durkheim",
        explanation:
          "Durkheim definiu Fatos Sociais como regras e padrões sociais que exercem força sobre os indivíduos."
      },
      {
        question:
          "Para Karl Marx, qual é o principal motor de transformação histórica?",
        options: [
          "A luta de classes",
          "O avanço tecnológico isolado",
          "As crenças religiosas",
          "O consenso entre governantes e governados"
        ],
        answer: "A luta de classes",
        explanation:
          "Marx defendia que os conflitos entre classes sociais impulsionam as mudanças na história."
      },
      {
        question:
          "Max Weber propôs o conceito de 'Ação Social'. O que define uma Ação Social?",
        options: [
          "Qualquer comportamento biológico feito por um ser humano",
          "Uma ação individual que leva em consideração o sentido e o comportamento de outros indivíduos",
          "Apenas ações promovidas pelo governo ou pelo Estado",
          "Um movimento revolucionário organizado pela classe trabalhadora"
        ],
        answer:
          "Uma ação individual que leva em consideração o sentido e o comportamento de outros indivíduos",
        explanation:
          "Ação Social é a conduta em que o indivíduo atribui um sentido orientado pela ação dos outros."
      },
      {
        question: "O conceito de 'Cultura' na sociologia refere-se a:",
        options: [
          "Apenas às belas-artes, como música clássica e teatro",
          "A quantidade de anos de escolaridade de uma pessoa",
          "Ao conjunto de hábitos, costumes, crenças, valores e tradições aprendidos e compartilhados em sociedade",
          "À capacidade nata e biológica de falar idiomas"
        ],
        answer:
          "Ao conjunto de hábitos, costumes, crenças, valores e tradições aprendidos e compartilhados em sociedade",
        explanation:
          "Cultura abrange todo o conhecimento e hábitos produzidos e transmitidos socialmente."
      },
      {
        question: "O que caracteriza a 'Estratificação Social' nas sociedades?",
        options: [
          "A divisão exata e igualitária de riquezas entre todos os cidadãos",
          "A disposição dos indivíduos em camadas ou grupos sociais hierarquizados com base em fatores como renda, poder e prestígio",
          "A migração voluntária de pessoas entre diferentes países",
          "O isolamento total de culturas locais em relação ao resto do mundo"
        ],
        answer:
          "A disposição dos indivíduos em camadas ou grupos sociais hierarquizados com base em fatores como renda, poder e prestígio",
        explanation:
          "Refere-se à organização da sociedade em camadas com acessos desiguais a recursos."
      }
    ],
    fisica: [
      {
        question:
          "Qual das Leis de Newton afirma que 'para toda ação há uma reação de igual intensidade e sentido oposto'?",
        options: [
          "Primeira Lei (Inércia)",
          "Segunda Lei (Dinâmica)",
          "Terceira Lei (Ação e Reação)",
          "Lei da Gravitação Universal"
        ],
        answer: "Terceira Lei (Ação e Reação)",
        explanation:
          "A Terceira Lei estabelece que forças funcionam sempre em pares de ação e reação."
      },
      {
        question:
          "Um carro percorre 150 km em 2 horas. Qual a sua velocidade média?",
        options: ["50 km/h", "75 km/h", "100 km/h", "150 km/h"],
        answer: "75 km/h",
        explanation:
          "Velocidade média = Distância / Tempo (150 km / 2 h = 75 km/h)."
      },
      {
        question:
          "Qual o fenômeno óptico responsável pelo desvio da luz ao mudar de meio transparente?",
        options: ["Reflexão", "Refração", "Difração", "Polarização"],
        answer: "Refração",
        explanation:
          "A refração é a mudança na direção e velocidade da luz ao passar de um meio para outro."
      },
      {
        question:
          "A energia transferida entre corpos devido à diferença de temperatura é:",
        options: ["Trabalho", "Calor", "Pressão", "Entropia"],
        answer: "Calor",
        explanation:
          "Calor é a energia térmica em trânsito motivada pela diferença de temperatura."
      },
      {
        question:
          "Segundo a Primeira Lei da Termodinâmica, a energia não pode ser criada nem destruída, apenas:",
        options: [
          "Aniquilada",
          "Multiplicada",
          "Transformada ou transferida",
          "Armazenada sem perdas infinitamente"
        ],
        answer: "Transformada ou transferida",
        explanation: "Princípio fundamental da conservação de energia."
      }
    ],
    geografia: [
      {
        question:
          "Qual linha imaginária divide a Terra nos hemisférios Norte e Sul?",
        options: [
          "Trópico de Câncer",
          "Trópico de Capricórnio",
          "Linha do Equador",
          "Meridiano de Greenwich"
        ],
        answer: "Linha do Equador",
        explanation:
          "A Linha do Equador é o marco inicial (latitude 0°) do planeta."
      },
      {
        question:
          "O movimento da Terra em torno do seu próprio eixo, gerando dias e noites, é a:",
        options: ["Transladação", "Rotação", "Precessão", "Nutação"],
        answer: "Rotação",
        explanation:
          "O movimento de rotação completa dura aproximadamente 24 horas."
      },
      {
        question: "A camada rígida da Terra dividida em placas tectônicas é a:",
        options: ["Litosfera", "Astenosfera", "Núcleo interno", "Hidrosfera"],
        answer: "Litosfera",
        explanation:
          "Composta pela crosta e pela porção superior do manto terrestre."
      },
      {
        question:
          "Qual bioma brasileiro apresenta clima semiárido e vegetação adaptada à seca?",
        options: ["Mata Atlântica", "Caatinga", "Pampa", "Floresta Amazônica"],
        answer: "Caatinga",
        explanation:
          "Bioma exclusivamente brasileiro com plantas xerófilas (adaptadas à falta d'água)."
      },
      {
        question:
          "O deslocamento espacial de populações de um local para outro é a:",
        options: [
          "Urbanização",
          "Êxodo rural",
          "Migração",
          "Transição demográfica"
        ],
        answer: "Migração",
        explanation:
          "Termo genérico para a mobilidade espacial de grupos populacionais."
      }
    ]
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
    localStorage.setItem(
      "tech_bonder_theme",
      darkModeActive ? "dark" : "light"
    );
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

    btnNext.textContent =
      currentQuestionIndex < currentQuestions.length - 1
        ? "Próxima Pergunta"
        : "Ver Resultado";
    btnNext.style.display = "block";
  }

  function startQuiz(subjectKey) {
    currentSubject = subjectKey;
    currentQuestions = quizData[subjectKey].map((q) => ({
      question: q.question,
      options: shuffleArray(q.options),
      answer: q.answer,
      explanation: q.explanation
    }));

    currentQuestionIndex = 0;
    scoreCorrect = 0;
    scoreIncorrect = 0;

    quizSubjectTitle.textContent =
      subjectKey.charAt(0).toUpperCase() + subjectKey.slice(1);
    showScreen("quiz");
    loadQuestion();
  }

  function loadQuestion() {
    clearInterval(timerInterval);
    btnNext.style.display = "none";
    explanationBox.style.display = "none";

    const currentQ = currentQuestions[currentQuestionIndex];

    const progressPercent =
      (currentQuestionIndex / currentQuestions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    questionCounter.textContent = `Pergunta ${currentQuestionIndex + 1} de ${
      currentQuestions.length
    }`;
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

    btnNext.textContent =
      currentQuestionIndex < currentQuestions.length - 1
        ? "Próxima Pergunta"
        : "Ver Resultado";
    btnNext.style.display = "block";
  }

  function showFeedback() {
    progressBar.style.width = `100%`;
    correctCountElem.textContent = scoreCorrect;
    incorrectCountElem.textContent = scoreIncorrect;

    const trophyElem = document.getElementById("trophy-icon");

    if (scoreCorrect === currentQuestions.length) {
      feedbackMessage.textContent =
        "Incrível! Você gabaritou todas as questões!";
      trophyElem.textContent = "🏆";
    } else if (scoreCorrect >= currentQuestions.length / 2) {
      feedbackMessage.textContent =
        "Bom trabalho! Você teve um bom desempenho.";
      trophyElem.textContent = "🌟";
    } else {
      feedbackMessage.textContent =
        "Continue praticando! Na próxima você consegue um resultado melhor.";
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
