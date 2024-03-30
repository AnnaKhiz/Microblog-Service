import { checkEmptyFields } from './modules.js';

const registButton = document.getElementById('btn-register');
const inputLogin = document.getElementById('login');
const inputPass = document.getElementById('password');
const notificationBlock = document.getElementById('notification-block');
const notificationText = document.getElementById('notification');

registButton.addEventListener('click', (e) => {
	e.preventDefault();

	if (checkEmptyFields(inputLogin, inputPass, notificationBlock, notificationText)) {
		fetch('/auth/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				"login": inputLogin.value,
				"password": inputPass.value
			})
		})
			.then(res => {
				if (res.status !== 200) {
					notificationBlock.classList.remove('hidden');
					notificationText.innerText = "User with such login already exist";
				} else {
					window.location.replace(res.url)
				}
			})
	}
})