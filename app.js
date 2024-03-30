const eggClick = document.getElementById("eggClick");
const eggUpgrade1 = document.getElementById("eggUpgrade1");
const eggCount = document.getElementById("eggCount");
const epsCount = document.getElementById("epsCount");
document.getElementById("reset").addEventListener("click", resetGameProgress);

const backgroundMusic = document.getElementById("backgroundMusic");

backgroundMusic.volume = 0.15;

let upgradeCount = 0;

const stats = {
  eggCount: 0,
  eps: 0,
  upgrades: 0,
};

const savedStats = JSON.parse(localStorage.getItem("stats"));
if (savedStats !== null) {
  stats.eggCount = savedStats.eggCount;
  stats.eps = savedStats.eps;
  stats.upgrades = savedStats.upgrades;
  updatePage();
}

eggClick.addEventListener("click", buyEgg);
eggUpgrade1.addEventListener("click", buyUpgrade);
eggClick.addEventListener("mousedown", function () {
  eggClick.classList.add("clicked"); // image gets smaller when held down with click
});

eggClick.addEventListener("mouseup", function () {
  eggClick.classList.remove("clicked"); // image back to original scale when release click
});

// FUNCTIONS

function updatePage() {
  eggCount.textContent = stats.eggCount + " eggs";
  epsCount.textContent = "per second " + stats.eps;
  eggUpgrade1.textContent = "Get Upgrade (" + getUpgradeCost() + " eggs)";
}

function updateStorage() {
  stats.eggCount = stats.eggCount;
  stats.eps = stats.eps;
  stats.upgrades = upgradeCount;
  localStorage.setItem("stats", JSON.stringify(stats));
}

function buyEgg() {
  stats.eggCount++;
  updatePage();
  updateStorage();
}

function buyUpgrade() {
  const upgradeCost = getUpgradeCost();
  if (stats.eggCount >= upgradeCost) {
    stats.eggCount -= upgradeCost;
    stats.eps += 1;
    upgradeCount++;
    updatePage();
    updateStorage();
    playUpgradeButtonSound();
  } else {
    alert("Not enough eggs to buy the upgrade!");
  }
}

function getUpgradeCost() {
  return 10 + upgradeCount * 10;
}

function resetGameProgress() {
  console.log("Before reset:", stats);
  stats.eggCount = 0;
  stats.eps = 0;
  stats.upgrades = 0;
  upgradeCount = 0;
  localStorage.removeItem("stats");
  console.log("After reset:", stats);
  updatePage();
}

// pop noise for egg
function playeggSound() {
  var eggSound = new Audio("./assets/pop.mp3");
  eggSound.volume = 0.5;
  eggSound.play();
}

eggClick.addEventListener("click", function () {
  playeggSound();
});

// magical sound for upgrade
function playUpgradeButtonSound() {
  var upgradeButtonSound = new Audio("./assets/wowww.mp3");
  upgradeButtonSound.volume = 0.1;
  upgradeButtonSound.play();
}

eggUpgrade1.addEventListener("click", function () {
  playUpgradeButtonSound();
});

setInterval(function () {
  stats.eggCount += stats.eps;
  updatePage();
  updateStorage();
}, 1000);
