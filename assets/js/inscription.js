const form = document.querySelector("form");
console.log(form);

async function userRegister() {
  const formData = new FormData(form);

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
    }
  } catch (error) {
    console.error(error);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  userRegister();
});
