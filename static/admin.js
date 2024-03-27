
const deleteUserButton = [...document.querySelectorAll('.admin-del-btn')];
console.log(deleteUserButton)



deleteUserButton.forEach(button => {
	button.addEventListener('click', (e) => {
		e.preventDefault();
		const target = e.target.parentElement.dataset.name
		console.log('click')
		console.dir(target)
		// console.dir(users)



		// fetch(`/api/users`)
		// 	.then(res => res.json())
		// 	.then(res => {
		// 		console.log(res)
		// 		res.forEach(user => {
		// 			if (user.name === target) {
		// 				console.log(user)
		// 			}
		// 		})
		// 	})
		// 	.then(res => res.status === 200 ? window.location.reload() : console.log('Deliting error'))
		fetch(`/api/users/${target}`, { method: 'DELETE' })
			.then(res => res.status === 200 ? window.location.reload() : console.log('Deliting error'))
	})
	})
