

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
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
      //  logic for login
      console.log('Login form submitted');
    });
  };

  const addSignupListeners = function () {
    const signupForm = document.getElementById('signup-form');
    signupForm.addEventListener('submit', function (event) {
      event.preventDefault();
      //  logic for signup
      console.log('Signup form submitted');
    });
  };

  const addMainAppListeners = function () {
    const createDeckForm = document.getElementById('create-deck-form');
    createDeckForm.addEventListener('submit', function (event) {
      event.preventDefault();
      //  logic for creating a deck
      console.log('Create deck form submitted');
    });

    const logoutButton = document.getElementById('logout-button');
    logoutButton.addEventListener('click', function () {
      //  logic for logout
      console.log('Logout button clicked');
    });
  };

  const checkAuthenticationStatus = function () {
    // need function to check status and
    // Return true if authenticated, false otherwise
    return false;
  };

  const init = function () {
    app.isAuthenticated = checkAuthenticationStatus();
    if (app.isAuthenticated) {
      app.currentView = 'mainApp';
      // Fetch and update the user's decks
      // Implement logic to fetch decks
      // app.decks = ...???
    }
    renderView();
  };

  init();
});
