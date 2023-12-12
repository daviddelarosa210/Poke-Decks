searchButton1 = document.getElementById("search-button");
resultsContainer = document.getElementById("pokeResults");
currentSelect = document.getElementById("pokeSelect");
selectGeneration = document.getElementById("generation-search");
selectType = document.getElementById("type-search");
cardsOnPage = document.getElementsByClassName("resultsImage");
nameSearch1 = document.getElementById("name-input");

//Instantiate View Card Modal
var modal = document.getElementById("myModal");
var modalCardName = document.getElementById("modal-card-name");
var reverseHolofoilPrice = document.getElementById(
  "modal-reverseHolofoil-price"
);
var holoFoilPrice = document.getElementById("modal-HoloFoil-price");
var normalPrice = document.getElementById("modal-normal-price");
var modalCardImage = document.getElementById("modal-card-image");
var modalCardType = document.getElementById("modal-card-type");

var cardSaveBtn = document.getElementById("card-saver");

// Get the <span> element that closes the modal [This is just w3Schools basic modal setup]
var cardDisplayClose = document.getElementsByClassName("close")[0];
var collectionsDisplayClose = document.getElementsByClassName("close")[1];

// Instantiate Collections Modal
var collectionsModal = document.getElementById("collections-modal");
var collectionResults = document.getElementById("collection-results");

var savedCardsBtn1 = document.getElementById("show-saved");

// Saved Cards Array
var collectedCards = [];

var savedCollectedCards = localStorage.getItem("ItemID");

if (savedCollectedCards !== null) {
  collectedCards = JSON.parse(savedCollectedCards);
}

// Function that returns both the name and parameter search inputs
function searchingPokeData(theGeneration, theType, name) {
  // Sorted
  // Check to see if there is a type and generation being searched
  if (theGeneration && theType && !name) {
    generationURL = "https://pokeapi.co/api/v2/" + theGeneration;

    fetch(generationURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // Returns an array of the Generation requested
        var pokemonGenerationArray = [];

        for (i = 0; i < data.pokemon_species.length; i++) {
          pokemonGenerationArray.push(data.pokemon_species[i].name);
        }

        // Run the array through the TCG Api
        console.log(pokemonGenerationArray);
        getCardsOfType(theType, pokemonGenerationArray);
      });

    // Sorted
    // Check to see if there is only a generation being searched
  } else if (theGeneration && !theType && !name) {
    generationURL = "https://pokeapi.co/api/v2/" + theGeneration;

    fetch(generationURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // Returns an array of the Generation requested
        var pokemonGenerationArray = [];

        for (i = 0; i < data.pokemon_species.length; i++) {
          pokemonGenerationArray.push(data.pokemon_species[i].name);
        }

        // Run the array through the TCG Api
        console.log(pokemonGenerationArray);
        searchingTCGData(pokemonGenerationArray);
      });

    // Sorted
    // Check to see if there is only a type being searched
  } else if (theType && !theGeneration && !name) {
    typeCardURL = "https://api.pokemontcg.io/v2/cards?q=types:" + theType;

    fetch(typeCardURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        postPokemonCardInfo(data.data);
      });

    // Non Sorted
    // Check if there was a name inputed
  } else if (name) {
    finalURL = "https://pokeapi.co/api/v2/pokemon/" + name;

    console.log(finalURL);

    fetch(finalURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var pokemonNameArray = [];
        pokemonNameArray.push(data.name);
        searchingTCGData(pokemonNameArray);
      });
  }
}

// Sorted
// Sort the cards being taken from the tcg array by Type
function getCardsOfType(type, genArray) {
  for (i = 0; i < genArray.length; i++) {
    pokeCardURL = "https://api.pokemontcg.io/v2/cards?q=name:" + genArray[i];

    fetch(pokeCardURL, {
      method: "GET",
      withCredentials: true,
      headers: {
        "X-API-KEY": "f67d2ff5-723b-4794-bbfb-6b0a4e846179",
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // Sort through per card per pokemon name
        for (x = 0; x < data.data.length; x++) {
          if (data.data[x].types[0] === type) {
            console.log(data.data[x]);

            postTypePokemonCardInfo(data.data[x]);
          }
        }
      });
  }
}

// Non Sorted
// Takes the names from the PokeAPI database and runs for matches in TCG
function searchingTCGData(pokemonData) {
  for (i = 0; i < pokemonData.length; i++) {
    pokeCardURL = "https://api.pokemontcg.io/v2/cards?q=name:" + pokemonData[i];

    fetch(pokeCardURL, {
      method: "GET",
      withCredentials: true,
      headers: {
        "X-API-KEY": "f67d2ff5-723b-4794-bbfb-6b0a4e846179",
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        postPokemonCardInfo(data.data);
      });
  }
}

// Takes the TCG data and pulls individual card data
// Sets the card id as the actual html item id
function postPokemonCardInfo(dataTCG) {
  for (i = 0; i < dataTCG.length; i++) {
    console.log(dataTCG[i]);
    var cardImage = document.createElement("img");
    resultsContainer.appendChild(cardImage);
    cardImage.id = dataTCG[i].id;
    cardImage.setAttribute("class", "resultsImage");
    cardImage.src = dataTCG[i].images.small;

    cardImage.addEventListener("click", function (e) {
      console.log(this);
      var cardID = this.id;

      cardClickInformation(cardID);
    });
  }
}

// Pre-Sorted version of the above function
// Takes the TCG data and pulls individual card data
// Sets the card id as the actual html item id
function postTypePokemonCardInfo(dataTCG) {
  console.log(dataTCG);
  var cardImage = document.createElement("img");
  resultsContainer.appendChild(cardImage);
  cardImage.id = dataTCG.id;
  cardImage.setAttribute("class", "resultsImage");
  cardImage.src = dataTCG.images.small;

  cardImage.addEventListener("click", function (e) {
    console.log(this);
    var cardID = this.id;

    cardClickInformation(cardID);
  });
}

// Runs a search query based on the current card you clicked
function cardClickInformation(cardObject) {
  clickCardURL = "https://api.pokemontcg.io/v2/cards/" + cardObject;

  fetch(clickCardURL, {
    method: "GET",
    withCredentials: true,
    headers: {
      "X-API-KEY": "f67d2ff5-723b-4794-bbfb-6b0a4e846179",
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.data);
      cardModalInformation(data.data);
    });
}

// Handles information inside the Card Modal
function cardModalInformation(modalCard) {
  modalCardName.innerHTML = "Pokemon Card Title: " + modalCard.name;
  modalCardImage.src = modalCard.images.large;
  cardSaveBtn.setAttribute("class", modalCard.id);

  if (modalCard.tcgplayer) {
    if (modalCard.tcgplayer.prices.normal) {
      normalPrice.innerHTML =
        "Market Price: " + modalCard.tcgplayer.prices.normal.market.toFixed(2);
    } else {
      normalPrice.innerHTML = "Market Price: N/A";
    }

    if (modalCard.tcgplayer.prices.reverseHolofoil) {
      reverseHolofoilPrice.innerHTML =
        "Market Price: " +
        modalCard.tcgplayer.prices.reverseHolofoil.market.toFixed(2);
    } else {
      reverseHolofoilPrice.innerHTML = "Market Price: N/A";
    }

    if (modalCard.tcgplayer.prices.holoFoil) {
      holoFoilPrice.innerHTML =
        "Market Price: " +
        modalCard.tcgplayer.prices.holoFoil.market.toFixed(2);
    } else {
      holoFoilPrice.innerHTML = "Market Price: N/A";
    }
  }
  //modalCardType.innerHTML = modalCard.types[0];

  modal.style.display = "block";
}

// Modal handling
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }

  if (event.target == collectionsModal) {
    collectionsModal.style.display = "none";
  }
};

// Handle the event to run a search when the page loads
function startPageSearch() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  parameterType = urlParams.get("type");
  parameterGeneration = urlParams.get("generation");
  searchedName = urlParams.get("name");
  console.log(searchedName);
  searchedName = searchedName.toLowerCase();

  console.log(
    "Type: " + parameterType + "  Generation: " + parameterGeneration
  );
  searchingPokeData(parameterGeneration, parameterType, searchedName);

  resultsContainer.innerHTML = "";
}

// Button click event that passes input info
searchButton1.addEventListener("click", function () {
  parameterType = selectType.value;
  parameterGeneration = selectGeneration.value;
  searchedName = nameSearch1.value;
  searchedName = searchedName.toLowerCase();

  console.log(
    "Type: " + parameterType + "  Generation: " + parameterGeneration
  );
  searchingPokeData(parameterGeneration, parameterType, searchedName);

  resultsContainer.innerHTML = "";
});

// Save Card Functionality
cardSaveBtn.addEventListener("click", function () {
  collectedCards.push(cardSaveBtn.className);
  localStorage.setItem("ItemID", JSON.stringify(collectedCards));
  console.log(collectedCards);
});

// Handle Collections Modal
savedCardsBtn1.addEventListener("click", function (e) {
  console.log(e);
  collectionsModal.style.display = "block";
  getSavedCards(collectedCards);
  console.log(collectedCards);
});

// Runs a search query based on the current card you clicked
function getSavedCards(cardObject) {
  collectionResults.innerHTML = "";

  for (i = 0; i < cardObject.length; i++) {
    clickCardURL = "https://api.pokemontcg.io/v2/cards/" + cardObject[i];

    fetch(clickCardURL, {
      method: "GET",
      withCredentials: true,
      headers: {
        "X-API-KEY": "f67d2ff5-723b-4794-bbfb-6b0a4e846179",
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data.data);
        postSavedCards(data.data);
      });
  }
}

function postSavedCards(dataTCG) {
  console.log(dataTCG);
  var collectionImage = document.createElement("img");
  collectionResults.appendChild(collectionImage);
  collectionImage.id = dataTCG.id;
  collectionImage.setAttribute("class", "resultsImage");
  collectionImage.src = dataTCG.images.small;

  collectionImage.addEventListener("click", function (e) {
    console.log(this);
    var cardID = this.id;
    modal.style.display = "block";
    collectionsModal.style.display = "none";
    cardClickInformation(cardID);
  });
}

cardDisplayClose.addEventListener("click", function () {
  console.log("youre a fucking idiot");
  modal.style.display = "none";
});

collectionsDisplayClose.addEventListener("click", function () {
  console.log("youre a fucking idiot");

  collectionsModal.style.display = "none";
});

startPageSearch();