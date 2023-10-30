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
