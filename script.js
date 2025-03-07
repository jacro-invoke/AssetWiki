document.addEventListener("DOMContentLoaded", function(){
  // Load JSON data
  fetch("data.json")
    .then(response => response.json())
    .then(data => {
      populateSidebar(data.categories);
      // Check URL for a 'cat' parameter
      const params = new URLSearchParams(window.location.search);
      const catId = params.get("cat");
      if (catId) {
         displayCategory(catId, data.categories);
      } else {
         displayHome();
      }
    })
    .catch(error => console.error("Error loading data:", error));
});

// Populate the sidebar with links to each category.
function populateSidebar(categories) {
  const sidebar = document.getElementById("sidebar");
  const list = document.createElement("ul");
  categories.forEach(category => {
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    // Link uses a query parameter to indicate the selected category.
    link.href = `?cat=${category.id}`;
    link.textContent = category.name;
    listItem.appendChild(link);
    list.appendChild(listItem);
  });
  sidebar.appendChild(list);
}

// Display the selected category's entries.
function displayCategory(catId, categories) {
  const category = categories.find(cat => cat.id === catId);
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = ""; // Clear existing content
  if (category) {
    const heading = document.createElement("h1");
    heading.textContent = category.name;
    mainContent.appendChild(heading);

    category.entries.forEach(entry => {
      const entryDiv = document.createElement("div");
      entryDiv.classList.add("entry");

      // Thumbnail image for the entry.
      const thumbnail = document.createElement("img");
      thumbnail.src = entry.thumbnail;
      thumbnail.alt = entry.title;
      thumbnail.classList.add("thumbnail");

      // Link for the entry.
      const entryLink = document.createElement("a");
      entryLink.href = entry.url;
      entryLink.textContent = entry.title;
      entryLink.target = "_blank";

      entryDiv.appendChild(thumbnail);
      entryDiv.appendChild(entryLink);
      mainContent.appendChild(entryDiv);
    });
  } else {
    mainContent.textContent = "Category not found.";
  }
}

// Display a welcome message on the homepage.
function displayHome() {
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = "";
  const heading = document.createElement("h1");
  heading.textContent = "Welcome to the Video Game Assets Wiki";
  const paragraph = document.createElement("p");
  paragraph.textContent = "Select a category from the sidebar to browse free resources.";
  mainContent.appendChild(heading);
  mainContent.appendChild(paragraph);
}

// Mobile sidebar toggle functionality.
document.getElementById("sidebar-toggle").addEventListener("click", function(){
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("active");
});
