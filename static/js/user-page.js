const commentsButton = [...document.querySelectorAll('.comments-btn')];
const commentsContainer = [...document.querySelectorAll('div.comments-container')];
const addCommentButton = document.getElementById('comment-add-btn');
const commentForm = [...document.querySelectorAll('.form-comment')];
const deleteButton = [...document.querySelectorAll('.del-btn')];
const editButton = [...document.querySelectorAll('.edit-btn')];
const inputLogin = document.getElementById('reg-login');
const inputPass = document.getElementById('reg-password');
const notificationBlock = document.getElementById('notification-block');
const notificationText = document.getElementById('notification');
const currentUrl = location.href;
const createButton = document.getElementById('create-post');
const postLabelBlock = [...document.querySelectorAll('.content__info.header')];

if (createButton) {
	createButton.addEventListener('click', (e) => {
		e.preventDefault();
		toggleFormVisibility('add', 'add-close');
	});
}


commentsButton.forEach((element, index) => {
	element.addEventListener('click', (e) => {
		e.preventDefault();
		const target = e.target.parentElement.dataset.id;
		commentsContainer[index].classList.toggle('hidden');

		const commentBlockLabel = [...document.querySelectorAll('.content__comments-title')];
		commentBlockLabel[index].classList.add('checked');
		const commentTextBlock = [...document.querySelectorAll('.content__comments-block')];
		commentTextBlock.forEach(e => e.classList.add('checked'));

		fetch('/api/posts').then(res => res.json()).then(res => {
			const result = res.posts;
			result.forEach((post, i) => {
				if (post.date === target) {

					document.cookie = `targetpost=${post._id}; expires=0; path=/`;

					const sendCommentButton = document.getElementById(`comment-submit-btn-${index}`);
					const textCommentField = document.getElementById(`comment-input-${index}`);
					const deleteComment = [...document.querySelectorAll(`[class*="post-${index}"]`)];

					deleteCurrentComment(deleteComment, post);

					sendCommentButton.addEventListener('click', (e) => {
						e.preventDefault();
						addNewCommentQuery(post, sendCommentButton, textCommentField);
					})
				}
			})
		})
		toggleCommentForm(index, element);
	})
})

deleteButton.forEach(button => {
	button.addEventListener('click', (e) => {
		e.preventDefault();

		const target = e.target.parentElement.dataset.id;

		deletePostQuery(target);
	})
})

editButton.forEach(button => {
	button.addEventListener('click', (e) => {
		e.preventDefault();
		const target = e.target.parentElement.dataset.id

		toggleFormVisibility('edit', 'edit-close');

		const inputTitle = document.getElementById('edit-name');
		const inputDescription = document.getElementById('edit-description');

		getPostsForEditingQuery(target, inputTitle, inputDescription);

	})
})

function toggleCommentForm(index, element) {
	const preview = document.getElementById(`cutted-desc-${index}`);
	const fullDescription = document.getElementById(`full-desc-${index}`);

	commentForm[index].classList.toggle('hidden');
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

function addNewCommentQuery(post, sendCommentButton, textCommentField) {
		fetch('/api/comments', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				"idPost": post._id,
				"text": textCommentField.value,
			})
		})
			.then(res => res.status === 201 ? window.location.reload() : console.log('Commenting error'))
}

function deleteCurrentComment(deleteComment, post) {
	deleteComment.forEach(el => {
		el.addEventListener('click', (e) => {
			e.preventDefault();
			document.cookie = `targetpost=${post._id}; expires=0; path=/`;
			const createdPostData = e.target.dataset.create;
			getCurrentCommentQuery(createdPostData);
		})
	})
}

function getCurrentCommentQuery(createdPostData) {
	fetch(`/api/comments/${createdPostData}`, { method: 'DELETE' })
		.then(result => result.json())
		.then(result => {

			if (result.status === 200) {
				window.location.reload()
			}
		})
}

function deletePostQuery(target) {
	fetch(`/api/posts/${target}`, { method: 'DELETE' })
		.then(res => res.status === 200 ? window.location.reload() : console.log(res))
}

function getPostsForEditingQuery(target, inputTitle, inputDescription) {
	fetch('/api/posts').then(res => res.json()).then(res => {
		const result = res.posts;
		result.forEach(post => {
			if (post.date === target) {

				inputTitle.value = post.name;
				inputDescription.value = post.description;

				const saveButton = document.getElementById('btn-save');

				editCurrentPostQuery(saveButton, post, inputTitle, inputDescription);
			}
		})
	})
}

function editCurrentPostQuery(saveButton, post, inputTitle, inputDescription) {
	saveButton.addEventListener('click', (e) => {
		e.preventDefault();
		fetch(`/api/posts/${post._id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				"id": post._id,
				"name": inputTitle.value,
				"description": inputDescription.value
			})
		})
			.then(res => res.status === 200 ? window.location.reload() : console.log('Editing error'))
	})
}

function toggleFormVisibility(idForm, idButton) {
	const postForm = document.getElementById(idForm);
	const closeButton = document.getElementById(idButton);
	postForm.classList.remove('hidden')
	closeButton.addEventListener('click', () => {
		postForm.classList.add('hidden')
	});
}
