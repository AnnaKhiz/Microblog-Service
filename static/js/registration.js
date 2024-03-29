const registButton = document.getElementById('btn-register');
const inputLogin = document.getElementById('login');
const inputPass = document.getElementById('password');
const notificationBlock = document.getElementById('notification-block');
const notificationText = document.getElementById('notification');

registButton.addEventListener('click', (e) => {
	e.preventDefault();

	if (checkEmptyFields()) {
		fetch('/auth/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				"login": inputLogin.value,
				"password": inputPass.value
			})
		})
			.then(res => res.json())
			.then(res => {

				notificationText.innerText = res.result
				if (res.status === 201) {
					notificationBlock.classList.remove('hidden');
					notificationText.classList.add('success');
					setTimeout(() => {
						window.location.replace('/auth/login')
					}, 2000)
				} else {
					notificationBlock.classList.remove('hidden');
					notificationText.classList.remove('success');
				}
			})
	}
})

function checkEmptyFields() {
	if (inputLogin.value.replaceAll(' ', '') === '' || inputPass.value.replaceAll(' ', '') === '') {
		notificationBlock.classList.remove('hidden');
		notificationText.innerText = 'Empty fields';
		return
	}
	return true
}