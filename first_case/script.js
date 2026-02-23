function checkAnswer() {
  const input = document.getElementById("answer").value;
  if (input === "2") {
    window.location.href = "stage2.html";
  } else {
    alert("違います");
  }
}