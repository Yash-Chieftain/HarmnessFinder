const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const responseContainer = document.getElementById("response-container");
const slogan = document.getElementById("slogan"); // slogan element

const harmfulnessScale = document.getElementById("harmfulness-scale");
const rewrittenMessageEl = document.getElementById("rewritten-message");
const harmfulTable = document.querySelector("#harmful-table tbody");
const dailyStatsContainer = document.getElementById("daily-stats-container");

// ================= COLORS =================
const getColor = (level) => {
  const colors = [
    "#007bff",
    "#3399ff",
    "#66b3ff",
    "#99ccff",
    "#ffcc66",
    "#ff9966",
    "#ff6666",
    "#ff4d4d",
    "#ff3333",
    "#cc0000",
  ];
  return colors[level - 1];
};

// ================= DAILY STATS =================
const getToday = () => new Date().toISOString().split("T")[0];

const loadDailyStats = () => {
  return JSON.parse(localStorage.getItem("dailyStats")) || {};
};

const saveDailyStats = (stats) => {
  const dates = Object.keys(stats).sort().reverse(); // newest → oldest
  const trimmed = {};
  dates.slice(0, 30).forEach((d) => (trimmed[d] = stats[d])); // keep only 30
  localStorage.setItem("dailyStats", JSON.stringify(trimmed));
};

const updateDailyStats = (totalWords, harmfulWords) => {
  let stats = loadDailyStats();
  const today = getToday();

  if (!stats[today]) {
    stats[today] = { totalWords: 0, harmfulWords: 0 };
  }

  stats[today].totalWords += totalWords;
  stats[today].harmfulWords += harmfulWords;

  saveDailyStats(stats);
  renderDailyStats(stats);
};

const renderDailyStats = (stats) => {
  dailyStatsContainer.innerHTML = "";
  const dates = Object.keys(stats).sort().reverse();

  if (dates.length === 0) {
    dailyStatsContainer.innerHTML = `<p class="text-muted">No daily stats yet.</p>`;
    return;
  }

  dates.forEach((date) => {
    const { totalWords, harmfulWords } = stats[date];
    const percent =
      totalWords > 0 ? ((harmfulWords / totalWords) * 100).toFixed(1) : 0;

    const card = document.createElement("div");
    card.className = "card mb-2 p-3 shadow-sm";
    card.innerHTML = `
      <h6>${date}</h6>
      <p><strong>Total Words:</strong> ${totalWords}</p>
      <p><strong>Harmful Words:</strong> ${harmfulWords}</p>
      <p><strong>Ratio:</strong> ${percent}% harmful</p>
    `;
    dailyStatsContainer.appendChild(card);
  });
};

// ================= TABLE RENDERING =================
const renderHarmfulTable = (harmfulMessages) => {
  harmfulTable.innerHTML = "";

  if (!harmfulMessages || harmfulMessages.length === 0) {
    harmfulTable.innerHTML = `<tr><td colspan="2" class="text-center text-muted">No harmful phrases detected</td></tr>`;
    return;
  }

  harmfulMessages.forEach(({ phrase, reason, alternatePhrase, level }) => {
    const row = document.createElement("tr");
    row.classList.add("fade-in");

    const harmfulCell = document.createElement("td");
    harmfulCell.innerHTML = `
  <div class="harmful-container">
    <span class="phrase-box" style="background-color:${getColor(level)};">
      ${phrase}
    </span>
    <span class="level">Level: ${level}</span>
    <span class="reason">${reason}</span>
  </div>
`;
    const alternateCell = document.createElement("td");
    alternateCell.textContent = alternatePhrase;

    row.appendChild(harmfulCell);
    row.appendChild(alternateCell);

    harmfulTable.appendChild(row);
  });
};

// ================= FORM SUBMIT =================
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = chatInput.value.trim();
  if (!message) return;

  try {
    const response = await fetch("http://localhost:5000/api/check-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) throw new Error("Failed to get response from server");

    const data = await response.json();
    console.log("API Response:", data);

    // Harmfulness scale
    harmfulnessScale.innerHTML = "";
    for (let i = 1; i <= 10; i++) {
      const box = document.createElement("div");
      box.style.width = "9%";
      box.style.height = "30px"; // slightly taller to fit number
      box.classList.add("scale-in");
      box.style.backgroundColor = getColor(i);

      // Number inside the box
      box.textContent = i;
      box.style.display = "flex";
      box.style.alignItems = "center";
      box.style.justifyContent = "center";
      box.style.color = "white";
      box.style.fontSize = "0.8rem";
      box.style.fontWeight = "bold";

      harmfulnessScale.appendChild(box);
    }

    // Fill table
    renderHarmfulTable(data.harmfulMessages);

    // Rewritten message
    rewrittenMessageEl.textContent = data.rewrittenMessage || "No suggestion";

    // Daily stats update
    const totalWords = message.split(/\s+/).filter(Boolean).length;
    const harmfulWords = data.harmfulMessages
      ? data.harmfulMessages.reduce(
          (sum, msg) => sum + msg.phrase.split(/\s+/).length,
          0
        )
      : 0;

    updateDailyStats(totalWords, harmfulWords);

    // Show response
    responseContainer.classList.remove("d-none");
    responseContainer.classList.add("fade-in"); // animation here

    // Hide slogan after first submit
    slogan.style.display = "none";

    // Clear input
    chatInput.value = "";
  } catch (error) {
    console.error("Error submitting message:", error);
  }
});

// Enter key submit
chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    chatForm.dispatchEvent(new Event("submit"));
  }
});

// On load render stored stats
document.addEventListener("DOMContentLoaded", () => {
  renderDailyStats(loadDailyStats());
});
