const tokenSession = localStorage.getItem("token");

/* VERIFIER SI L'UTILISATEUR EST CONNECTER */
if (!tokenSession) {
  alert("Veuillez vous connecter svp");
  window.location.href = "../pages/connexion.html";
} /* else {
  window.location.href = "./acceuil.html";
} */
