document
  .getElementById("signupForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    const existingCredentials = JSON.parse(localStorage.getItem("credentials"));
    if (existingCredentials && existingCredentials.username === username) {
      const response = confirm(
        "Another egg? Leave some for the rest of us! >:("
      );
      if (!response) {
        return;
      }

      crySound();
    } else {
      welcomeMessage(username);

      signupSound();
    }

    console.log("Username:", username);
    console.log("Password:", password);

    saveCredentials(username, password);

    clearInputFields();
  });

function saveCredentials(username, password) {
  const credentials = {
    username: username,
    password: password,
  };
  localStorage.setItem("credentials", JSON.stringify(credentials));
}

function welcomeMessage(username) {
  alert("Welcome to the club, " + username + "! You get an egg! 🥚");
}

function clearInputFields() {
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  document.getElementById("confirmPassword").value = "";
}

function signupSound() {
  const signupSound = new Audio("./assets/yay.mp3");

  signupSound.volume = 0.5;

  signupSound.play();
}

function crySound() {
  const anotherEggSound = new Audio("./assets/cry.mp3");

  anotherEggSound.volume = 0.5;

  anotherEggSound.play();
}
