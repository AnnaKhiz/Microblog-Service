import { deleteCurrentComment, toggleFullPostVisibility } from './modules.js'

const deleteUserButton = [...document.querySelectorAll('.admin-user-del')];
const deletePostButton = [...document.querySelectorAll('.admin-post-del')];
const commentsButton = [...document.querySelectorAll('.comments-btn')];
const commentsContainer = [...document.querySelectorAll('div.comments-container')];
const deleteCommentButton = [...document.querySelectorAll('.admin-post-del')];
const postLabelBlock = [...document.querySelectorAll('.content__info.header')];

toggleFullPostVisibility();

commentsButton.forEach((element, index) => {
	element.addEventListener('click', (e) => {
		e.preventDefault();
		const target = e.target.parentElement.dataset.id
		commentsContainer[index].classList.toggle('hidden');

		const commentBlockLabel = [...document.querySelectorAll('.content__comments-title')];
		commentBlockLabel[index].classList.add('checked');
		const commentTextBlock = [...document.querySelectorAll('.content__comments-block')];
		commentTextBlock.forEach(e => e.classList.add('checked'));

		const { posts } = getCurrentData()
		posts.forEach((post, i) => {
			if (post._id === target) {
				const deleteCommentIcons = [...document.querySelectorAll(`[class*="post-${index}"]`)];
				deleteCurrentComment(deleteCommentIcons, post);
			}
		})

		toggleButtonText(index, element);

	})
})

deletePostButton.forEach((button, index) => {
	button.addEventListener('click', (e) => {
		e.preventDefault();
		const target = e.target.parentElement.dataset.id
		const { posts } = getCurrentData();

		deletePostRequest(posts[index]._id)
	})
})

deleteUserButton.forEach((button, index) => {
	button.addEventListener('click', (e) => {
		e.preventDefault();
		const target = e.target.dataset.name;
		const { users } = getCurrentData();

		deleteUserRequest(users[index]._id);
	})
})

function deleteUserRequest(id) {
	fetch(`/api/users/${id}`, { method: 'DELETE' })
		.then(res => res.status === 200 ? window.location.reload() : console.log('Deliting error'))
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

function deletePostRequest(id) {
	fetch(`/api/posts/${id}`, { method: 'DELETE' })
		.then(res => res.status === 200 ? window.location.reload() : console.log('Deliting error'))
}

function getCurrentData() {
	const scriptTag = document.querySelector('script[src$="/public/js/admin.js"]');

	if (!scriptTag) {
		return
	}
	const usersData = scriptTag.getAttribute('data-users');
	const postsData = scriptTag.getAttribute('data-posts');
	const users = JSON.parse(usersData);
	const posts = JSON.parse(postsData);

	return { users, posts }
}