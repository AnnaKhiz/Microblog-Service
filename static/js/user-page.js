import { deleteCurrentComment, toggleFullPostVisibility } from './modules.js';
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
let saveButtonHandler = null;
toggleFullPostVisibility();

if (createButton) {
	createButton.addEventListener('click', (e) => {
		e.preventDefault();
		toggleFormVisibility('add', 'add-close');

		const addNewPost = document.getElementById('btn-publish');
		const title = document.getElementById('name');
		const description = document.getElementById('description');

		addNewPost.addEventListener('click', (e) => {
			e.preventDefault();

			if (checkEmptyFields(title, description)) {
				addNewPostRequest(title, description)
			}
		})
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

		const posts = getCurrentDataFromTemplate();

		posts.forEach((post, i) => {

			if (post._id === target) {

				const sendCommentButton = document.getElementById(`comment-submit-btn-${index}`);
				const textCommentField = document.getElementById(`comment-input-${index}`);
				const deleteComment = [...document.querySelectorAll(`[class*="post-${index}"]`)];

				deleteCurrentComment(deleteComment, post);

				if (sendCommentButton) {
					sendCommentButton.addEventListener('click', (e) => {
						e.preventDefault();
						addNewCommentQuery(post, sendCommentButton, textCommentField);
					})
				}
			}
		})

		toggleCommentForm(index, element);
	})
})

deleteButton.forEach((button, index) => {
	button.addEventListener('click', (e) => {
		e.preventDefault();

		const target = e.target.parentElement.dataset.id;
		const currentUserPosts = getCurrentDataFromTemplate();

		deletePostQuery(currentUserPosts[index]._id);
	})
})

editButton.forEach((button, index) => {
	button.addEventListener('click', (e) => {
		e.preventDefault();
		const target = e.target.parentElement.dataset.id;
		const posts = getCurrentDataFromTemplate();
		const curPost = posts[index];

		if (curPost._id === target) {

			toggleFormVisibility('edit', 'edit-close');

			const inputTitle = document.getElementById('edit-name');
			const inputDescription = document.getElementById('edit-description');
			const saveButton = document.getElementById('btn-save');

			inputTitle.value = curPost.name;
			inputDescription.value = curPost.description;

			editCurrentPostQuery(curPost, inputTitle, inputDescription, saveButton);

		}
	})
})

function addNewPostRequest(title, description) {
	fetch('/api/posts', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			"name": title.value,
			"description": description.value
		})
	})
		.then(result => {
			if (result.status !== 200) {
				notificationBlock.classList.remove('hidden');
				notificationText.innerText = 'Post didn\'t created';
			} else {
				window.location.replace(result.url);
			}
		})
}

function checkEmptyFields(title, description) {
	if (title.value === '' || description.value === '') {
		notificationBlock.classList.remove('hidden');
		notificationText.innerText = 'Empty fields';
		return
	}
	return true
}

function toggleCommentForm(index, element) {
	const preview = document.getElementById(`cutted-desc-${index}`);
	const fullDescription = document.getElementById(`full-desc-${index}`);

	if (commentForm) {
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
			.then(res => res.status === 201 ? window.location.reload() : console.log('Comment did not added'))
}

function deletePostQuery(id) {
	fetch(`/api/posts/${id}`, { method: 'DELETE' })
		.then(res => res.status === 200 ? window.location.reload() : console.log(res))
}

function editCurrentPostQuery(post, inputTitle, inputDescription, saveButton) {
	if (saveButtonHandler) {
		saveButton.removeEventListener('click', saveButtonHandler);
	}

	saveButtonHandler = (e) => {
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
			.then(res => res.status === 200 ? window.location.reload() : console.log('Post did not edit'));
	};

	saveButton.addEventListener('click', saveButtonHandler);
}

function toggleFormVisibility(idForm, idButton) {
	const postForm = document.getElementById(idForm);
	const closeButton = document.getElementById(idButton);
	postForm.classList.remove('hidden');
	closeButton.addEventListener('click', () => {
		postForm.classList.add('hidden');
	});
}

function getCurrentDataFromTemplate() {
	const scriptTag = document.querySelector('script[src$="/public/js/user-page.js"]');

	if (!scriptTag) {
		return
	}
	const postsData = scriptTag.getAttribute('data-posts');
	const posts = JSON.parse(postsData);

	return posts
}

var currentPage = 1;
var recordsPerPage = 10;
const posts = getCurrentDataFromTemplate();

