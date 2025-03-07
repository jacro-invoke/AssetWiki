document.addEventListener("DOMContentLoaded", function(){
  // Load JSON data and initialize the page
  fetch("data.json")
    .then(response => response.json())
    .then(data => {
      populateSidebar(data.categories);
      // Check if a category is selected via URL parameter
      const params = new URLSearchParams(window.location.search);
      const catId = params.get("cat");
      if (catId) {
         displayCategory(catId, data.categories);
      } else {
         displayHome();
      }
    })
    .catch(error => console.error("Error loading data:", error));

  // Mobile sidebar toggle elements
  const sidebarToggle = document.getElementById("sidebar-toggle");
  const sidebarClose = document.getElementById("sidebar-close");
  const sidebar = document.getElementById("sidebar");

  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", function(){
      sidebar.classList.add("active");
    });
  }
  
  if (sidebarClose) {
    sidebarClose.addEventListener("click", function(){
      sidebar.classList.remove("active");
    });
  }
});

// Populate sidebar with category links from JSON data
function populateSidebar(categories) {
  const sidebar = document.getElementById("sidebar");
  const list = document.createElement("ul");
  categories.forEach(category => {
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    // Use query parameter to load category
    link.href = `?cat=${category.id}`;
    link.textContent = category.name;
    // On mobile, close the sidebar when a link is clicked
    link.addEventListener("click", function(){
      if (window.innerWidth <= 768) {
        document.getElementById("sidebar").classList.remove("active");
      }
    });
    listItem.appendChild(link);
    list.appendChild(listItem);
  });
  sidebar.appendChild(list);
}

// Display entries for the selected category
function displayCategory(catId, categories) {
  const category = categories.find(cat => cat.id === catId);
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = ""; // Clear content
  if (category) {
    const heading = document.createElement("h1");
    heading.textContent = category.name;
    mainContent.appendChild(heading);
    category.entries.forEach(entry => {
      const entryDiv = document.createElement("div");
      entryDiv.classList.add("entry");
      // Thumbnail image
      const thumbnail = document.createElement("img");
      thumbnail.src = entry.thumbnail;
      thumbnail.alt = entry.title;
      thumbnail.classList.add("thumbnail");
      // Link to external resource
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

// Display the homepage welcome message
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
