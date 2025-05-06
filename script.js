// nav bar on all pages
function toggleMenu() {
    const navMenu = document.getElementById("navMenu");
    navMenu.style.display = navMenu.style.display === "block" ? "none" : "block";
  }

  
  // shop page search bar

  const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchResults = document.getElementById('searchResults');

searchBtn.addEventListener('click', () => {
  const searchTerm = searchInput.value.trim();
  if (searchTerm !== '') {
    // Perform search and display results here (You may use AJAX or any API)
    // For demonstration purposes, let's assume we have an array of search results:
    // const results = ['products', 'Result 2', 'Result 3', 'Result 4', 'Result 5']; by me

    // Display the results
    displayResults(results);
  }
});

function displayResults(results) {
  // Clear previous results
  searchResults.innerHTML = '';

  if (results.length > 0) {
    results.forEach((result) => {
      const resultItem = document.createElement('div');
      resultItem.classList.add('result');
      resultItem.textContent = result;
      searchResults.appendChild(resultItem);
    });
  } else {
    const noResult = document.createElement('div');
    noResult.classList.add('result');
    noResult.textContent = 'No results found.';
    searchResults.appendChild(noResult);
  }

  // Show the search results container
  searchResults.style.display = 'block';
}
