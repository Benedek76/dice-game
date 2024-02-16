var pontszamok, korPontszam, aktivJatekos, jatekFolyamatban;

init();

// Create event handler
document.querySelector(".btn-roll").addEventListener("click", function () {
  if (jatekFolyamatban) {
    // Need a random number //
    var kocka = Math.ceil(Math.random() * 6);

    // Event display //
    var kockaDOM = document.querySelector(".dice");

    kockaDOM.style.display = "block";
    kockaDOM.src = "img/dice-" + kocka + ".png";

    // Refresh the reached point in the actual round if we didn't get 1 //
    if (kocka !== 1) {
      // Add point to the actual
      korPontszam += kocka;
      document.querySelector("#current-" + aktivJatekos).textContent =
        korPontszam;
    } else {
      kovetkezoJatekos();
    }
  }
});

// I keep it event handle
document.querySelector(".btn-hold").addEventListener("click", function () {
  if (jatekFolyamatban) {
    // Summ point refress
    pontszamok[aktivJatekos] += korPontszam;

    // Summ point refress on the (UI)
    document.querySelector("#score-" + aktivJatekos).textContent =
      pontszamok[aktivJatekos];

    // There is a winner?
    if (pontszamok[aktivJatekos] >= 15) {
      document.querySelector("#name-" + aktivJatekos).textContent = "WINNER";
      document
        .querySelector(".player-" + aktivJatekos + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + aktivJatekos + "-panel")
        .classList.remove("active");
      jatekFolyamatban = false;
    } else {
      // Switch to the next player
      kovetkezoJatekos();
    }
  }
});

// Next player
function kovetkezoJatekos() {
  aktivJatekos === 0 ? (aktivJatekos = 1) : (aktivJatekos = 0);
  korPontszam = 0; // Set back to 0 if the actual player is start from 0 also.

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
}

// Start new game
document.querySelector(".btn-new").addEventListener("click", init);

// init function
function init() {
  pontszamok = [0, 0];
  aktivJatekos = 0;
  korPontszam = 0;
  jatekFolyamatban = true;

  document.querySelector(".dice").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-0").textContent = "0";

  document.getElementById("name-0").textContent = "Frodo";
  document.getElementById("name-1").textContent = "Samu";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  document.querySelector(".player-0-panel").classList.add("active");
}
