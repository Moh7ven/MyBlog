const form = document.querySelector("form");
document.querySelector(".loader-container").style.display = "none";

function validateForm() {
  const message = document.querySelector("#message");
  const message2 = document.querySelector("#message2");
  message.style.textAlign = "center";
  message2.style.textAlign = "center";

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
    message2.textContent = "";
    return false;
  }

  if (pseudo === "") {
    message.textContent = "Veuillez entrer un pseudo";
    message2.textContent = "";
    return false;
  } else if (pseudo.length < 6) {
    message.textContent = "Votre pseudo doit contenir au moins 6 caractères";
    message2.textContent = "";
    return false;
  }

  if (email === "") {
    message.textContent = "Veuillez entrer votre email";
    message2.textContent = "";
    return false;
  } else if (!email.includes("@")) {
    message.textContent = "Veuillez entrer un email valide";
    message2.textContent = "";
    return false;
  }

  if (password === "") {
    message.textContent = "Veuillez saisir un mot de passe";
    message2.textContent = "";
    return false;
  } else if (password.length < 6) {
    message.textContent =
      "Votre mot de passe doit contenir au moins 6 caractères";
    message2.textContent = "";
    return false;
  }

  if (password2 === "") {
    message.textContent = "Veuillez confirmer votre mot de passe";
    message2.textContent = "";
    return false;
  } else if (password2 != password) {
    message.textContent = "Vos mots de passe ne correspondent pas ";
    message2.textContent = "";
    return false;
  }

  return true;
}

async function userRegister() {
  const formData = new FormData(form);
  const message = document.querySelector("#message");
  const message2 = document.querySelector("#message2");
  message.style.textAlign = "center";
  message2.style.textAlign = "center";

  if (validateForm() === true) {
    try {
      document.querySelector(".loader-container").style.display = "grid";

      const response = await fetch(
        "https://myblog-x9p2.onrender.com/api/auth/signup",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        message.style.color = "green";
        message.textContent = "Félicitation, vous avez bien été enregistré !";
        setTimeout(() => {
          document.querySelector(".loader-container").style.display = "none";
          window.location.href = "./connexion.html";
        }, 3000);
      } else {
        const responseData = await response.json();
        /* if (responseData.errors.emailUser.message === undefined) {
          messageEmail = "";
        }
        if (responseData.errors.Username.message === undefined) {
          messagePseudo = "";
        } */

        console.error("Erreur lors de l'enregistrement :", responseData);
        console.log(responseData.errors.emailUser.message);
        console.log(responseData.errors.Username.message);

        message2.textContent = responseData.errors.Username.message;
        message.textContent = responseData.errors.emailUser.message;

        document.querySelector(".loader-container").style.display = "none";
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
