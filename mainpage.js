searchBtn = document.getElementById("search-button");
generationSearch = document.getElementById("generation-search");
typeSearch = document.getElementById("type-search");
nameSearch = document.getElementById("name-input");

searchBtn.addEventListener("click", function () {
  location.assign(
    "./search.html?name=" +
      nameSearch.value +
      "&type=" +
      typeSearch.value +
      "&generation=" +
      generationSearch.value
  );
});