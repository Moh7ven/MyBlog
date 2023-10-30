const form = document.querySelector("form");

function validateForm() {
  const message = document.querySelector("#message");
  message.style.textAlign = "center";
  const nom = document.querySelector("#nom").value;
  const prenom = document.querySelector("#prenom").value;
  const pseudo = document.querySelector("#pseudo").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const password2 = document.querySelector("#password2").value;

  if (nom === "") {
    message.textContent = "Veuillez entrer votre nom";
    // setTimeout((message.style.display = "none"), 3000);
    return false;
  }

  if (prenom === "") {
    message.textContent = "Veuillez entrer votre prenom";
    return false;
  }

  if (pseudo === "") {
    message.textContent = "Veuillez entrer un pseudo";
    return false;
  } else if (pseudo.length < 6) {
    message.textContent = "Votre pseudo doit contenir au moins 6 caractères";
    return false;
  }

  if (email === "") {
    message.textContent = "Veuillez entrer votre email";
    return false;
  } else if (!email.includes("@")) {
    message.textContent = "Veuillez entrer un email valide";
    return false;
  }

  if (password === "") {
    message.textContent = "Veuillez saisir un mot de passe";
    return false;
  } else if (password.length < 6) {
    message.textContent =
      "Votre mot de passe doit contenir au moins 6 caractères";
    return false;
  }

  if (password2 === "") {
    message.textContent = "Veuillez confirmer votre mot de passe";
    return false;
  } else if (password2 != password) {
    message.textContent = "Vos mots de passe ne correspondent pas ";
    return false;
  }

  return true;
}

async function userRegister() {
  const formData = new FormData(form);

  if (validateForm() === true) {
    try {
      const response = await fetch(
        "https://myblog-x9p2.onrender.com/api/auth/signup",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        window.location.href = "./connexion.html";
      } else {
        const responseData = await response.json();
        console.error("Erreur lors de l'enregistrement :", responseData);
        console.log(responseData.message);
      }
    } catch (error) {
      console.error(error);
    }
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  userRegister();
});
