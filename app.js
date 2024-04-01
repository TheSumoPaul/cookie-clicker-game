const eggClick = document.getElementById("eggClick");
const eggUpgrade1 = document.getElementById("eggUpgrade1");
const eggUpgrade2 = document.getElementById("eggUpgrade2");
const eggUpgrade3 = document.getElementById("eggUpgrade3");
const eggUpgrade4 = document.getElementById("eggUpgrade4");
const eggCount = document.getElementById("eggCount");
const epsCount = document.getElementById("epsCount");
document.getElementById("reset").addEventListener("click", resetGameProgress);

const backgroundMusic = document.getElementById("backgroundMusic");

backgroundMusic.muted = true;
document.addEventListener("click", function enableAudio() {
  backgroundMusic.muted = false;
  backgroundMusic.play();
  document.removeEventListener("click", enableAudio);
});
backgroundMusic.volume = 0.1;

let upgradeCount1 = 0; // for first upgrade
let upgradeCount2 = 0; // for second upgrade
let upgradeCount3 = 0; // for third upgrade
let upgradeCount4 = 0; // for fourth upgrade

const stats = {
  eggCount: 0,
  eps: 0,
  upgradeCount1: 0,
  upgradeCount2: 0,
  upgradeCount3: 0,
  upgradeCount4: 0,
};

// local storage
const savedStats = JSON.parse(localStorage.getItem("stats"));
if (savedStats !== null) {
  stats.eggCount = savedStats.eggCount;
  stats.eps = savedStats.eps;
  upgradeCount1 = savedStats.upgradeCount1;
  upgradeCount2 = savedStats.upgradeCount2;
  upgradeCount3 = savedStats.upgradeCount3;
  upgradeCount4 = savedStats.upgradeCount4;
  updatePage();
}

eggClick.addEventListener("click", buyEgg);

eggUpgrade1.addEventListener("click", buyUpgrade);
eggUpgrade2.addEventListener("click", buyUpgrade2);
eggUpgrade3.addEventListener("click", buyUpgrade3);
eggUpgrade4.addEventListener("click", buyUpgrade4);

eggClick.addEventListener("mousedown", function () {
  eggClick.classList.add("clicked"); // image gets smaller when held down with click
});

eggClick.addEventListener("mouseup", function () {
  eggClick.classList.remove("clicked"); // image back to original scale when release click
});

function updatePage() {
  eggCount.textContent = stats.eggCount + " eggs";
  epsCount.textContent = "per second " + stats.eps;
  eggUpgrade1.textContent = "Bunny Buddy (" + getUpgradeCost1() + " eggs)";
  eggUpgrade2.textContent = "Hoppy Helpers (" + getUpgradeCost2() + " eggs)";
  eggUpgrade3.textContent =
    "Eggstravagant Enhancer (" + getUpgradeCost3() + " eggs)";
  eggUpgrade4.textContent =
    "BEASTLY Golden Egg Machine Generator-inator (" +
    getUpgradeCost4() +
    " eggs)";
}

function updateStorage() {
  stats.eggCount = stats.eggCount;
  stats.eps = stats.eps;
  stats.upgrades = stats.upgrades;
  stats.upgradeCount1 = upgradeCount1;
  stats.upgradeCount2 = upgradeCount2;
  stats.upgradeCount3 = upgradeCount3;
  stats.upgradeCount4 = upgradeCount4;
  localStorage.setItem("stats", JSON.stringify(stats));
}

function buyEgg() {
  stats.eggCount++;
  updatePage();
  updateStorage();
}

function buyUpgrade() {
  const upgradeCost = getUpgradeCost1();
  if (stats.eggCount >= upgradeCost) {
    stats.eggCount -= upgradeCost;
    stats.eps += 1;
    upgradeCount1++;
    updatePage();
    updateStorage();
    playUpgradeButtonSound();
  } else {
    alert("Not enough eggs to buy the upgrade!");
  }
}

function buyUpgrade2() {
  const upgradeCost2 = getUpgradeCost2();
  if (stats.eggCount >= upgradeCost2) {
    stats.eggCount -= upgradeCost2;
    stats.eps += 10;
    upgradeCount2++;
    updatePage();
    updateStorage();
    playUpgradeButtonSound();
  } else {
    alert("Not enough eggs to buy the upgrade!");
  }
}

function buyUpgrade3() {
  const upgradeCost3 = getUpgradeCost3();
  if (stats.eggCount >= upgradeCost3) {
    stats.eggCount -= upgradeCost3;
    stats.eps += 100;
    upgradeCount3++;
    updatePage();
    updateStorage();
    playUpgradeButtonSound();
  } else {
    alert("Not enough eggs to buy the upgrade!");
  }
}

let isMusicPlaying = false;

function buyUpgrade4() {
  const upgradeCost4 = getUpgradeCost4();
  if (stats.eggCount >= upgradeCost4) {
    stats.eggCount -= upgradeCost4;
    stats.eps += 1000;
    upgradeCount4++;
    updatePage();
    updateStorage();
    playUpgradeButtonSound();
    backgroundMusic.src = "./assets/BANG.mp3";
    backgroundMusic.play();
    document.body.classList.add("shake-animation");
    const h1Element = document.querySelector("h1");
    h1Element.classList.add("rainbow-text");
    setTimeout(() => {
      document.body.classList.remove("shake-animation");
      h1Element.classList.remove("rainbow-text");
      backgroundMusic.src = "./assets/silly.mp3";
      backgroundMusic.loop = true;
      backgroundMusic.play();
    }, 30000);
  } else {
    alert("Not enough eggs to buy the upgrade!");
  }
}

function getUpgradeCost1() {
  return 10 + upgradeCount1 * 10;
}

function getUpgradeCost2() {
  return 100 + upgradeCount2 * 100;
}

function getUpgradeCost3() {
  return 500 + upgradeCount3 * 500;
}

function getUpgradeCost4() {
  return 10000 + upgradeCount4 * 10000;
}

function resetGameProgress() {
  if (
    confirm(
      "Are you sure you want to reset? You will lose all of your hard earned eggs D:"
    )
  ) {
    stats.eggCount = 0;
    stats.eps = 0;
    stats.upgrades = 0;
    upgradeCount1 = 0;
    upgradeCount2 = 0;
    upgradeCount3 = 0;
    upgradeCount4 = 0;
    localStorage.removeItem("stats");
    updatePage();
    playresetSound();
  }
}

function playeggSound() {
  var eggSound = new Audio("./assets/pop.mp3");
  eggSound.volume = 0.5;
  eggSound.play();
}

eggClick.addEventListener("click", function () {
  playeggSound();
});

function playUpgradeButtonSound() {
  var upgradeButtonSound = new Audio("./assets/wowww.mp3");
  upgradeButtonSound.volume = 0.1;
  upgradeButtonSound.play();
}

function playresetSound() {
  var resetSound = new Audio("./assets/bonk.mp3");
  resetSound.volume = 0.5;
  resetSound.play();
}

function playBackgroundMusic() {
  var backgroundMusic = new Audio("./assets/silly.mp3");
  backgroundMusic.play();
}

setInterval(function () {
  stats.eggCount += stats.eps;
  updatePage();
  updateStorage();
}, 1000);
