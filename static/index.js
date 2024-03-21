const createButton = document.getElementById('create-post');
createButton.addEventListener('click', (e) => {
	e.preventDefault();
	const addPostForm = document.getElementById('add');
	addPostForm.classList.toggle('hidden')
	addPostForm.classList.contains('hidden')
		? createButton.innerText = 'Create post'
		: createButton.innerText = 'Hide form';
})