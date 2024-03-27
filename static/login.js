const loginButton = document.getElementById('btn-login');
const inputLogin = document.getElementById('login');
const inputPass = document.getElementById('password');
const notificationBlock = document.getElementById('notification-block');
const notificationText = document.getElementById('notification');

loginButton.addEventListener('click', (e) => {
	e.preventDefault();

	if (checkEmptyFields()) {
		fetch('/auth/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				"login": inputLogin.value,
				"password": inputPass.value
			})
		})
			.then(res => res.json())
			.then(res => {
				console.log(res)
				if (res.status === 404) {
					notificationBlock.classList.remove('hidden')
					notificationText.innerText = res.result
				} else {
					notificationBlock.classList.add('hidden')
					res.role === "user" ? window.location.replace(`/user_home/${res.id}`) : window.location.replace(`/admin`)
				}

			})
	}


})

function checkEmptyFields() {
	if (inputLogin.value.replaceAll(' ', '') === '' || inputPass.value.replaceAll(' ', '') === '') {
		notificationBlock.classList.remove('hidden');
		notificationText.innerText = 'Empty fields';
		return false
	}
	return true
}