// Load saved games from localStorage
let games = JSON.parse(localStorage.getItem("shooterGames")) || [];

// Display existing saved games
window.onload = () => displayGames();

function addGame() {
  const category = document.getElementById("gameCategory").value.trim();
  const name = document.getElementById("gameName").value.trim();
  const kills = parseInt(document.getElementById("kills").value);
  const deaths = parseInt(document.getElementById("deaths").value);
  const matches = parseInt(document.getElementById("matches").value);

  if (!category || !name || isNaN(kills) || isNaN(deaths) || isNaN(matches)) {
    alert("Please fill in all fields.");
    return;
  }

  const kd = (kills / (deaths === 0 ? 1 : deaths)).toFixed(2);

  const newGame = {
    category,
    name,
    kills,
    deaths,
    matches,
    kd
  };

  games.push(newGame);
  localStorage.setItem("shooterGames", JSON.stringify(games));

  document.getElementById("gameCategory").value = "";
  document.getElementById("gameName").value = "";
  document.getElementById("kills").value = "";
  document.getElementById("deaths").value = "";
  document.getElementById("matches").value = "";

  displayGames();
}

function displayGames() {
  const list = document.getElementById("gamesList");
  list.innerHTML = "";

  if (games.length === 0) {
    list.innerHTML = "<p>No saved games yet.</p>";
    return;
  }

  games.forEach((game, index) => {
    const div = document.createElement("div");
    div.classList.add("game-card");

    div.innerHTML = `
      <div class="game-title">${game.category} — ${game.name}</div>
      <div class="game-details">
        Kills: ${game.kills} | Deaths: ${game.deaths} | Matches: ${game.matches} | K/D: ${game.kd}
      </div>
      <button class="delete-btn" onclick="deleteGame(${index})">Delete</button>
    `;

    list.appendChild(div);
  });
}

function deleteGame(index) {
  games.splice(index, 1);
  localStorage.setItem("shooterGames", JSON.stringify(games));
  displayGames();
}