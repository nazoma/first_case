"use strict";
const answers = {
    1: "はな",
    2: "ほし",
    3: "こめ",
    4: "つき",
    5: "おっちゃん"
};
const midAnswers = ["はな", "ほし", "こめ", "つき", "おっちゃん"];
const solved = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false
};
function normalizeText(text) {
    return text.trim().replace(/\s+/g, "").toLowerCase();
}
function getInputValue(id) {
    const input = document.getElementById(id);
    return input ? input.value : "";
}
function setResult(id, message, isCorrect) {
    const result = document.getElementById(id);
    if (!result)
        return;
    result.textContent = message;
    result.className = isCorrect ? "result correct" : "result wrong";
}
function updateProgress() {
    const solvedCount = Object.values(solved).filter(Boolean).length;
    const solvedCountElement = document.getElementById("solvedCount");
    const progressFill = document.getElementById("progressFill");
    if (solvedCountElement) {
        solvedCountElement.textContent = String(solvedCount);
    }
    if (progressFill) {
        progressFill.style.width = `${(solvedCount / 5) * 100}%`;
    }
}
function unlockMidPuzzleIfNeeded() {
    const allSolved = Object.values(solved).every(Boolean);
    const midPuzzleSection = document.getElementById("midPuzzleSection");
    if (allSolved && midPuzzleSection) {
        midPuzzleSection.classList.remove("hidden");
    }
}
function checkAnswer(questionId) {
    const inputId = `answer${questionId}`;
    const resultId = `result${questionId}`;
    const input = document.getElementById(inputId);
    if (!input)
        return;
    const userAnswer = normalizeText(input.value);
    const correctAnswer = normalizeText(answers[questionId]);
    if (userAnswer === correctAnswer) {
        solved[questionId] = true;
        input.disabled = true;
        setResult(resultId, "正解！", true);
        updateProgress();
        unlockMidPuzzleIfNeeded();
    }
    else {
        setResult(resultId, "ちがうようだ……", false);
    }
}
function checkMidPuzzle() {
    const values = [
        getInputValue("midAnswer1"),
        getInputValue("midAnswer2"),
        getInputValue("midAnswer3"),
        getInputValue("midAnswer4"),
        getInputValue("midAnswer5")
    ].map(normalizeText);
    const isCorrect = values.every((value, index) => {
        const expected = midAnswers[index];
        return expected !== undefined && value === normalizeText(expected);
    });
    const midStory = document.getElementById("midStory");
    if (isCorrect) {
        setResult("midResult", "答えがつながった！", true);
        midStory?.classList.remove("hidden");
    }
    else {
        setResult("midResult", "まだ並べ方か答えが違うかもしれない。", false);
    }
}
function setupAccordion() {
    const accordions = document.querySelectorAll(".accordion");
    accordions.forEach((button) => {
        button.addEventListener("click", () => {
            const panel = button.nextElementSibling;
            if (!panel)
                return;
            panel.classList.toggle("open");
        });
    });
}
function setupQuestionButtons() {
    const questionButtons = document.querySelectorAll("[data-question]");
    questionButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const questionValue = button.dataset.question;
            if (!questionValue)
                return;
            const questionId = Number(questionValue);
            checkAnswer(questionId);
        });
    });
}
function setupMidButton() {
    const midButton = document.getElementById("midCheckButton");
    midButton?.addEventListener("click", checkMidPuzzle);
}
document.addEventListener("DOMContentLoaded", () => {
    setupAccordion();
    setupQuestionButtons();
    setupMidButton();
    updateProgress();
});
