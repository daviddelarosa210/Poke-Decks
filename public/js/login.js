const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    const response = await fetch('/api/user/login', {
      method: 'post',
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
      headers: { 'Content-type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/dashboard');
      console.log('success');
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);