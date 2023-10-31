const token = localStorage.getItem("token");

/* AJOUT D'ARTICLE */
async function addBlog() {
  const formData = new FormData(formAdd);
  try {
    const res = await fetch("https://myblog-x9p2.onrender.com/api/blog", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        //   "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      window.location.href = "./gestion.html";
    } else {
      const resData = await res.json();
      console.log("Erreur : ", resData);
    }
  } catch (error) {
    console.log(error);
  }
}

formAdd.addEventListener("submit", (e) => {
  e.preventDefault();
  addBlog();
});

//RECUPÉRER TOUS LES ARTICLES AJOUTÉS PAR L'UTILISATEUR CONNECTÉ
async function recupUserArticle() {
  try {
    const response = await fetch(
      "https://myblog-x9p2.onrender.com/api/blog/userblog",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const responsData = await response.json();
      let html = "";

      responsData.forEach((data) => {
        html += `
      <div class="article-content">
        <div class="titre-date-pseudo">
          <h1 id="titreBlog" class="titreBlog"><u>${data.titreBlog}</u></h1>
          <div id="username-date" class="username-date">
            <p id="pseudo">Moh7ven</p>
            <p id="date">${data.createdAtBlog}</p>
          </div>
        </div>
        <div id="soustitreBlog" class="soustitreBlog">
          <h2>${data.soustitreBlog}</h2>
        </div>
        <img src="${data.image}" alt="" />
        <div class="text-container">
          <p>
          ${data.text}
          </p>
        </div>
      </div>
      `;
      });
      document.querySelector(".articles-container").innerHTML = html;
      console.log(responsData);
    } else {
      const responsData = await response.json();
      console.log("Erreur lors de la recupération des données: ", responsData);
    }
  } catch (error) {
    console.log(error);
  }
}
recupUserArticle();
