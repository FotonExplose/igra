const screenEl = document.getElementById("screen");
const actionsEl = document.getElementById("actions");

// Твоё дерево вопросов. Каждый шаг — объект с вопросом и обработчиками.
const state = { history: [] };

// Рендер экрана
function render(html, buttons) {
  screenEl.innerHTML = html;
  actionsEl.innerHTML = "";
  buttons.forEach((b) => {
    const btn = document.createElement("button");
    btn.textContent = b.label;
    btn.className = b.className || "btn-primary";
    btn.onclick = b.onClick;
    actionsEl.appendChild(btn);
  });
}

// Экраны
function showStart() {
  render(
    `<h1 class="title">Игра «Вопрос — ответ»</h1>
     <p class="hint">Определи тип латинского существительного за три шага</p>`,
    [{ label: "Начать", className: "btn-primary", onClick: () => goTo(question1) }]
  );
}

function showAnswer(text, backToQuestion) {
  render(
    `<p class="hint">Ответ</p>
     <p class="answer">${text}</p>`,
    [
      { label: "← Назад к вопросу", className: "btn-ghost", onClick: backToQuestion },
      { label: "Начать заново", className: "btn-primary", onClick: showStart },
    ]
  );
}

// Вопрос 1
function question1() {
  render(
    `<h1 class="title">Существительное относится к гласному типу?</h1>`,
    [
      { label: "Да", className: "btn-yes", onClick: () => showAnswer("Гласный тип", question1) },
      { label: "Нет", className: "btn-no",  onClick: question2 },
    ]
  );
}

// Вопрос 2
function question2() {
  render(
    `<h1 class="title">Это существительное равносложное?</h1>`,
    [
      { label: "Да", className: "btn-yes", onClick: () => showAnswer("Смешанный тип B", question2) },
      { label: "Нет", className: "btn-no",  onClick: question3 },
    ]
  );
}

// Вопрос 3
function question3() {
  render(
    `<h1 class="title">Основа имеет один слог?</h1>`,
    [
      { label: "Да", className: "btn-yes", onClick: () => showAnswer("Согласный тип", question3) },
      { label: "Нет", className: "btn-no",  onClick: () => showAnswer("Смешанный тип A", question3) },
    ]
  );
}

// «goTo» оставил на будущее, если захочешь анимации/историю
function goTo(fn) { fn(); }

showStart();
