const registButton = document.getElementById('btn-register')
const inputLogin = document.getElementById('login')
const inputPass = document.getElementById('password')
const notificationBlock = document.getElementById('notification-block')
const notificationText = document.getElementById('notification')

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
				console.log(res)
				notificationBlock.classList.remove('hidden')
				notificationText.innerText = res.result
				if (res.status === 201) {
					setTimeout(() => {
						console.log('reload')
						window.location.replace('/auth/login')
					}, 2000)
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