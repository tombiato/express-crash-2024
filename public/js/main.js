const output = document.getElementById("output");
const button = document.getElementById("get-posts-btn");

async function showPosts() {
  try {
    const res = await fetch("http://localhost:8000/api/posts");

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    output.innerHTML = "";
    data.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.innerHTML = `
      <h3>${post.title}</h3>
    `;
      output.appendChild(postElement);
    });
  } catch (error) {
    console.error(error);
  }
}

button.addEventListener("click", showPosts);
