document.addEventListener('DOMContentLoaded', function () {
  const app = {
    isAuthenticated: false,
    currentView: 'login',
    decks: [],
    newDeckName: '',
  };

  const templates = {
    login: document.getElementById('login-form').innerHTML,
    signup: document.getElementById('signup-form').innerHTML,
    mainApp: document.getElementById('main-app-form').innerHTML,
  };

  const renderView = function () {
    const appContainer = document.getElementById('app');
    switch (app.currentView) {
      case 'login':
        appContainer.innerHTML = templates.login;
        addLoginListeners();
        break;
      case 'signup':
        appContainer.innerHTML = templates.signup;
        addSignupListeners();
        break;
        case 'mainApp':
          appContainer.innerHTML = templates.mainApp;
          addMainAppListeners();
          fetchDecks(); // Fetch decks when transitioning to the main app view
          break;
        default:
          break;
    }
  };

  const addLoginListeners = function () {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', async function (event) {
      event.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const response = await fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          app.isAuthenticated = true;
          app.currentView = 'mainApp';
          renderView();
        } else {
          console.error('Login failed:', response.statusText);
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    });
  };

  const addSignupListeners = function () {
    const signupForm = document.getElementById('signup-form');
    signupForm.addEventListener('submit', async function (event) {
      event.preventDefault();
      const name = document.getElementById('signup-name').value;
      const email = document.getElementById('signup-email').value;
      const password = document.getElementById('signup-password').value;

      try {
        const response = await fetch('/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }),
        });

        if (response.ok) {
          app.isAuthenticated = true;
          app.currentView = 'mainApp';
          renderView();
        } else {
          console.error('Signup failed:', response.statusText);
        }
      } catch (error) {
        console.error('Error during signup:', error);
      }
    });
  };

  const addMainAppListeners = function () {
    const createDeckForm = document.getElementById('create-deck-form');
    createDeckForm.addEventListener('submit', async function (event) {
      event.preventDefault();
      const deckName = document.getElementById('deck-name').value;

      try {
        const response = await fetch('/create-deck', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: deckName }),
        });

        if (response.ok) {
          await fetchDecks();
        } else {
          console.error('Deck creation failed:', response.statusText);
        }
      } catch (error) {
        console.error('Error during deck creation:', error);
      }
    });
  };

  //  fetchDecks implementation?
  const fetchDecks = async function () {
    console.log('Fetching decks...');
    try {
      const response = await fetch('/decks', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Include any necessary authentication 
        },
      });
  
      if (response.ok) {
        const decks = await response.json();
        app.decks = decks;
        // Call a function to update the user interface with the fetched decks
        updateDeckListUI();
      } else {
        console.error('Failed to fetch decks:', response.statusText);
      }
    } catch (error) {
      console.error('Error during deck fetch:', error);
    }
  };
    //  logic to fetch decks from the server
    // Update decks array with  fetched data
    const updateDeckListUI = async function () {
      const deckListContainer = document.getElementById('deck-list-container');
      deckListContainer.innerHTML = ''; // Clear existing content
    
      if (app.decks.length === 0) {
        // Display a message when there are no decks
        const noDecksMessage = document.createElement('div');
        noDecksMessage.textContent = 'You have no decks.';
        deckListContainer.appendChild(noDecksMessage);
      } else {
        // Iterate through each deck and fetch/display cards
        for (const deck of app.decks) {
          const deckElement = document.createElement('div');
          deckElement.classList.add('deck-item'); // Added a class for styling
    
          // Deck Name
          const deckName = document.createElement('h3');
          deckName.textContent = deck.name;
          deckElement.appendChild(deckName);
    
          // Fetch and display Pokémon cards for the deck
          await fetchAndDisplayCards(deck.id, deckElement);
    
          // Append the deck element to the container
          deckListContainer.appendChild(deckElement);
        }
      }
    };
    
    // Fetch and display Pokémon cards for a specific deck
    const fetchAndDisplayCards = async function (deckId, deckElement) {
      try {
        const response = await fetch(`/decks/${deckId}/cards`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Include any necessary authentication headers
          },
        });
    
        if (response.ok) {
          const cards = await response.json();
    
          // Create elements for each card and append them to the deck element
          const cardList = document.createElement('ul');
          cards.forEach(card => {
            const cardItem = document.createElement('li');
            cardItem.textContent = `${card.name} - ${card.type}`;
            cardList.appendChild(cardItem);
          });
    
          deckElement.appendChild(cardList);
        } else {
          console.error('Failed to fetch cards for the deck:', response.statusText);
        }
      } catch (error) {
        console.error('Error during card fetch:', error);
      }
    };

  const init = function () {
    // initialization logic?
    renderView();
  };

  init();
});
