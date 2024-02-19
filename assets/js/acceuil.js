const token = localStorage.getItem("token");

async function recupAllBlog() {
  try {
    const response = await fetch("https://myblog-x9p2.onrender.com/api/blog", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const responseData = await response.json();
      let html = "";

      responseData.forEach((data) => {
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
      console.log(responseData);
    } else {
      const responseData = await response.json();
      console.log("Erreur lors de la recupération des données: ", responseData);
    }
  } catch (error) {
    console.log(error);
  }
}

recupAllBlog();
