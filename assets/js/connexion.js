const form = document.querySelector("form");

function validateForm() {
  const pseudo = document.querySelector("#pseudo").value;
  const password = document.querySelector("#password").value;
  const message = document.querySelector("#message");
  message.style.textAlign = "center";

  if (pseudo === "") {
    message.textContent = "Veuillez saisir votre pseudo !";
    return false;
  }

  if (password === "") {
    message.textContent = "Veuillez saisir votre mot de passe !";
    return false;
  }

  return true;
}

async function userConnect() {
  const formData = new FormData(form);
  if (validateForm() === true) {
    try {
      const res = await fetch(
        "https://myblog-x9p2.onrender.com/api/auth/login",
        {
          method: "POST",
          body: formData,
        }
      );

      if (res.ok) {
        const resData = await res.json();
        localStorage.setItem("token", resData.token);
        message.textContent = "Bienvenue !";
        message.style.color = "green";
        setTimeout(() => {
          (window.location.href = "./acceuil.html"), 3000;
        });
      } else {
        const resData = await res.json();
        console.log("Erreur lors de la connexion : ", resData);
        message.textContent = resData.error;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  userConnect();
});
