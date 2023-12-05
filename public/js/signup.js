const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelectorgit ('#password-signup').value.trim();

  if (username && password) {
    const response = await fetch('/api/user', {
          method: 'post',
            body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
        headers: { 'Content-type': 'application/json' },
    });

      // check the response status
    if (response.ok) {
      document.location.replace('/dashboard');
      console.log('success');
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);