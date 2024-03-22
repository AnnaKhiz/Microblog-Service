const createButton = document.getElementById('create-post');
const commentsButton = [...document.querySelectorAll('.comments-btn')];
const commentsContainer = [...document.querySelectorAll('div.comments-container')];
console.log(commentsButton)
const addCommentButton = document.getElementById('comment-add-btn');
const commentForm = document.getElementById('form-comment');

commentsButton.forEach((element, index) => {
	element.addEventListener('click', (e) => {
		e.preventDefault();

		console.log(`comments button ${index} pushed`)
		commentsContainer[index].classList.toggle('hidden');
		if (!commentsContainer.classList.contains('hidden')) {
			element.innerText = 'Hide';
			commentForm.classList.add('hidden');
			addNewComment(addCommentButton, commentForm);
		} else {
			element.innerText = 'Comments'
			addCommentButton.innerText = 'Add comment'
			addNewComment(addCommentButton, commentForm);
		}

	})
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


createButton.addEventListener('click', (e) => {
	e.preventDefault();
	const addPostForm = document.getElementById('add');
	addPostForm.classList.toggle('hidden')
	addPostForm.classList.contains('hidden')
		? createButton.innerText = 'Create post'
		: createButton.innerText = 'Hide form';
});


