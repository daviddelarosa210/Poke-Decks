document.addEventListener('DOMContentLoaded', function () {
  const app = {
    isAuthenticated: false,
    currentView: 'login',
    decks: [],
    newDeckName: '',
  };

  const templates = {
    login: document.getElementById('login-template').innerHTML,
    signup: document.getElementById('signup-template').innerHTML,
    mainApp: document.getElementById('main-app-template').innerHTML,
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
    //  logic to fetch decks from the server
    // Update decks array with  fetched data
  };

  const init = function () {
    // initialization logic?
    renderView();
  };

  init();
});
