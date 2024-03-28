const deleteUserButton = [...document.querySelectorAll('.admin-user-del')];
const deletePostButton = [...document.querySelectorAll('.admin-post-del')];
const commentsButton = [...document.querySelectorAll('.comments-btn')];
const commentsContainer = [...document.querySelectorAll('div.comments-container')];
const deleteCommentButton = [...document.querySelectorAll('.admin-post-del')];

console.log(deletePostButton)
commentsButton.forEach((element, index) => {
	element.addEventListener('click', (e) => {
		e.preventDefault();
		const target = e.target.parentElement.dataset.id
		commentsContainer[index].classList.toggle('hidden');

		fetch('/api/posts').then(res => res.json()).then(res => {
			const result = res.posts

			result.forEach((post, i) => {
				if (post.date === target) {

					document.cookie = `targetpost=${post._id}; expires=0; path=/`

					const deleteComment = [...document.querySelectorAll(`[class*="post-${index}"]`)];

					deleteComment.forEach(el => {
						el.addEventListener('click', (e) => {
							e.preventDefault();
							const createdPostData = e.target.dataset.create
							console.log(createdPostData)

							fetch(`/api/comments/${createdPostData}`, { method: 'DELETE' })
								.then(result => result.json())
								.then(result => {

									if (result.status === 200) {
										window.location.reload()
									}
								})
						})
					})

				}
			})
		})


	})
})

deletePostButton.forEach(button => {
	button.addEventListener('click', (e) => {
		e.preventDefault();
		const target = e.target.parentElement.dataset.id
		console.log(target)
		fetch(`/api/posts/${target}`, { method: 'DELETE' })
			.then(res => res.status === 200 ? window.location.reload() : console.log('Deliting error'))
	})
})

deleteUserButton.forEach(button => {
	button.addEventListener('click', (e) => {
		e.preventDefault();
		const target = e.target.parentElement.dataset.name

		fetch(`/api/users/${target}`, { method: 'DELETE' })
			.then(res => res.status === 200 ? window.location.reload() : console.log('Deliting error'))
	})
})
