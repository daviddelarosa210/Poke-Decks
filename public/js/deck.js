const app = new Vue({
  el: '#app',
  data: {
    isAuthenticated: false,
    currentView: 'login',
    decks: [],
    newDeckName: '',
  },
  methods: {
    async fetchDecks() {
      try {
        const response = await fetch('/deck');
        const data = await response.json();
        this.decks = data;
      } catch (error) {
        console.error('Error fetching decks:', error);
      }
    },
    async createDeck() {
      try {
        // Implement logic to create a new deck

        // Fetch API to create a new deck
        const response = await fetch('/create-deck', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.newDeckName,
          }),
        });

        if (response.ok) {
          // After creating the deck, fetch and update the deck list
          await this.fetchDecks();
          this.newDeckName = ''; // Clear the input field
        } else {
          console.error('Error creating deck:', response.statusText);
        }
      } catch (error) {
        console.error('Error creating deck:', error);
      }
    },
    async login() {
      try {
        // Implement login logic

        const response = await fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // Include login credentials
          }),
        });

        if (response.ok) {
          // After successful login, switch to the main application view
          this.isAuthenticated = true;
          this.currentView = 'main-app';
          await this.fetchDecks();
        } else {
          console.error('Error logging in:', response.statusText);
        }
      } catch (error) {
        console.error('Error logging in:', error);
      }
    },
    async signup() {
      try {
        // Implement signup logic
        // Example: Fetch API to create a new user account
        const response = await fetch('/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // Include signup data
          }),
        });

        if (response.ok) {
          // After successful signup, switch to the main application view
          this.isAuthenticated = true;
          this.currentView = 'main-app';
          await this.fetchDecks();
        } else {
          console.error('Error signing up:', response.statusText);
        }
      } catch (error) {
        console.error('Error signing up:', error);
      }
    },
    logout() {
      // need to finishj fix logout function 


      // Reset authentication status and switch to the login view
      this.isAuthenticated = false;
      this.currentView = 'login';
    },
  },
  created() {
    // Check the authentication status and set the initial view
    this.isAuthenticated = this.checkAuthenticationStatus();
    if (this.isAuthenticated) {
      this.currentView = 'main-app';
      this.fetchDecks();
    }
  },
  template: `
    <div>
      {{#if (eq currentView 'login')}}
        {{> login-template 'HANDLEBARS ID FOR LOGIN login=login}}
      {{/if}}

      {{#if (eq currentView 'signup')}}
        {{> Signup.handlebars signup=signup}}
      {{/if}}

      {{#if (eq currentView 'main-app')}}
        {{> main.handlebars decks=decks newDeckName=newDeckName createDeck=createDeck logout=logout}}
      {{/if}}
    </div>
  `,
});
