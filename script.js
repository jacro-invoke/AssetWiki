document.addEventListener("DOMContentLoaded", function(){
  // Load JSON data and initialize page content
  fetch("data.json")
    .then(response => response.json())
    .then(data => {
      populateSidebar(data.categories);
      // Check URL for category parameter
      const params = new URLSearchParams(window.location.search);
      const catId = params.get("cat");
      if (catId) {
         displayCategory(catId, data.categories);
      } else {
         displayHome();
      }
    })
    .catch(error => console.error("Error loading data:", error));

  // Mobile sidebar toggle functionality using the hamburger icon as a toggle
  const sidebarToggle = document.getElementById("sidebar-toggle");
  const sidebar = document.getElementById("sidebar");

  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", function(){
      // Toggle the active class to open or close the sidebar
      sidebar.classList.toggle("active");
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
    // Build URL with query parameter for category
    link.href = `?cat=${category.id}`;
    link.textContent = category.name;
    // On mobile, close sidebar when a category is selected
    link.addEventListener("click", function(){
      if (window.innerWidth <= 768) {
        sidebar.classList.remove("active");
      }
    });
    listItem.appendChild(link);
    list.appendChild(listItem);
  });
  sidebar.appendChild(list);
}

// Display selected category's entries
function displayCategory(catId, categories) {
  const category = categories.find(cat => cat.id === catId);
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = ""; // Clear previous content
  if (category) {
    const heading = document.createElement("h1");
    heading.textContent = category.name;
    mainContent.appendChild(heading);
    category.entries.forEach(entry => {
      const entryDiv = document.createElement("div");
      entryDiv.classList.add("entry");

      // Thumbnail image for the entry
      const thumbnail = document.createElement("img");
      thumbnail.src = entry.thumbnail;
      thumbnail.alt = entry.title;
      thumbnail.classList.add("thumbnail");

      // Link for the entry
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

// Display homepage welcome message
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
