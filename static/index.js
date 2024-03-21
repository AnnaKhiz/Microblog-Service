const createButton = document.getElementById('create-post');
const commentsButton = document.getElementById('comments-btn');
const commentsContainer = document.getElementById('comments-container');
const addCommentButton = document.getElementById('comment-add-btn');
const commentForm = document.getElementById('form-comment');

createButton.addEventListener('click', (e) => {
	e.preventDefault();
	const addPostForm = document.getElementById('add');
	addPostForm.classList.toggle('hidden')
	addPostForm.classList.contains('hidden')
		? createButton.innerText = 'Create post'
		: createButton.innerText = 'Hide form';
});

commentsButton.addEventListener('click', (e) => {
	e.preventDefault();
	commentsContainer.classList.toggle('hidden');
	if (!commentsContainer.classList.contains('hidden')) {
		commentForm.classList.add('hidden');
		commentsButton.innerText = 'Hide';
		addNewComment(addCommentButton, commentForm);
	} else {
		addCommentButton.innerText = 'Add comment'
		commentsButton.innerText = 'Comments'
		addNewComment(addCommentButton, commentForm);
	}

})

function addNewComment(button, form) {
	button.addEventListener('click', (e) => {
		e.preventDefault();
		form.classList.toggle('hidden');
		if (form.classList.contains('hidden') || commentsContainer.classList.contains('hidden')) {
			button.innerText = 'Add comment';
		} else {

			button.innerText = 'Hide'
		}


	})
}


