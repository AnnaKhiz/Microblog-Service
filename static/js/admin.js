const deleteUserButton = [...document.querySelectorAll('.admin-user-del')];
const deletePostButton = [...document.querySelectorAll('.admin-post-del')];
const commentsButton = [...document.querySelectorAll('.comments-btn')];
const commentsContainer = [...document.querySelectorAll('div.comments-container')];
const deleteCommentButton = [...document.querySelectorAll('.admin-post-del')];
const postLabelBlock = [...document.querySelectorAll('.content__info.header')];

commentsButton.forEach((element, index) => {
	element.addEventListener('click', (e) => {
		e.preventDefault();
		const target = e.target.parentElement.dataset.id
		commentsContainer[index].classList.toggle('hidden');

		const commentBlockLabel = [...document.querySelectorAll('.content__comments-title')];
		commentBlockLabel[index].classList.add('checked');
		const commentTextBlock = [...document.querySelectorAll('.content__comments-block')];
		commentTextBlock.forEach(e => e.classList.add('checked'));

		fetch('/api/posts').then(res => res.json()).then(res => {
			const result = res.posts

			result.forEach((post, i) => {
				if (post.date === target) {

					document.cookie = `targetpost=${post._id}; expires=0; path=/`

					const deleteComment = [...document.querySelectorAll(`[class*="post-${index}"]`)];

					deleteComment.forEach(el => {
						el.addEventListener('click', (e) => {
							e.preventDefault();
							document.cookie = `targetpost=${post._id}; expires=0; path=/`
							const createdPostData = e.target.dataset.create;
							deleteCommentRequest(createdPostData);
						})
					})
				}
			})
		})

		toggleButtonText(index, element);

	})
})

deletePostButton.forEach(button => {
	button.addEventListener('click', (e) => {
		e.preventDefault();
		const target = e.target.parentElement.dataset.id

		deletePostRequest(target)
	})
})

deleteUserButton.forEach(button => {
	button.addEventListener('click', (e) => {
		e.preventDefault();
		const target = e.target.dataset.name;

		deleteUserRequest(target);

	})
})

function deleteUserRequest(target) {
	fetch(`/api/users/${target}`, { method: 'DELETE' })
		.then(res => res.status === 200 ? window.location.reload() : console.log('Deliting error'))
}

function deleteCommentRequest(createdPostData) {
	fetch(`/api/comments/${createdPostData}`, { method: 'DELETE' })
		.then(result => result.json())
		.then(result => {

			if (result.status === 200) {
				window.location.reload()
			}
		})
}

function toggleButtonText(index, element) {
	const preview = document.getElementById(`cutted-desc-${index}`);
	const fullDescription = document.getElementById(`full-desc-${index}`);

	if (!commentsContainer[index].classList.contains('hidden')) {
		element.innerText = 'Hide';
		preview.classList.add('hidden');
		fullDescription.classList.remove('hidden')
		postLabelBlock[index].classList.add('checked');
		fullDescription.classList.add('checked');
	} else {
		element.innerText = 'Comments'
		element.classList.remove('hidden');
		fullDescription.classList.add('hidden');
		postLabelBlock[index].classList.remove('checked');
	}
}

function deletePostRequest(target) {
	fetch(`/api/posts/${target}`, { method: 'DELETE' })
		.then(res => res.status === 200 ? window.location.reload() : console.log('Deliting error'))
}