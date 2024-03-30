export const checkEmptyFields = function(login, pass, notificationBlock, notificationText) {

	if (login.value.replaceAll(' ', '') === '' || pass.value.replaceAll(' ', '') === '') {
		notificationBlock.classList.remove('hidden');
		notificationText.innerText = 'Empty fields';
		return false
	}
	return true
}

export const deleteCurrentComment = function(deleteComment, post) {
	deleteComment.forEach((el, index) => {
		el.addEventListener('click', (e) => {
			e.preventDefault();
			deleteCurrentCommentQuery(post.comments[index]._id);
		})
	})
}

export const toggleFullPostVisibility = function() {
	const post = [...document.querySelectorAll('.content__label')];
	const dropdown = [...document.querySelectorAll('.content__control-dropdown')]


	post.forEach((el, index) => {
		const preview = document.getElementById(`cutted-desc-${index}`);
		const fullDescription = document.getElementById(`full-desc-${index}`);

		el.addEventListener('click', () => {
			preview.classList.toggle('hidden');
			el.parentElement.classList.toggle('checked');
			fullDescription.classList.toggle('checked');
			fullDescription.classList.toggle('hidden');
		})
	})
}

function deleteCurrentCommentQuery(id) {
	fetch(`/api/comments/${id}`, { method: 'DELETE' })
		.then(result => result.json())
		.then(result => {

			if (result.status === 200) {
				window.location.reload()
			}
		})
}