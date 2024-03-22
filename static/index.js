const createButton = document.getElementById('create-post');
const commentsButton = [...document.querySelectorAll('.comments-btn')];
const commentsContainer = [...document.querySelectorAll('div.comments-container')];
console.log(commentsButton)
const addCommentButton = document.getElementById('comment-add-btn');
const commentForm = [...document.querySelectorAll('.form-comment')];
const deleteButton = [...document.querySelectorAll('.del-btn')];

commentsButton.forEach((element, index) => {
	element.addEventListener('click', (e) => {
		e.preventDefault();
		const target = e.target.parentElement.dataset.id
		console.log(target)
		console.log(`comments button ${index} pushed`)
		commentsContainer[index].classList.toggle('hidden');

		fetch('/api/posts').then(res => res.json()).then(res => {
			console.log(res.posts)
			const result = res.posts
			result.forEach(post => {
				if (post._id === target) {
					document.cookie = `targetpost=${post._id}`;
				}
			})

		})

		commentForm[index].classList.toggle('hidden');
		if (!commentsContainer[index].classList.contains('hidden')) {
			element.innerText = 'Hide';
		} else {
			element.innerText = 'Comments'
		}

	})
})

createButton.addEventListener('click', (e) => {
	e.preventDefault();
	const addPostForm = document.getElementById('add');
	addPostForm.classList.toggle('hidden')
	addPostForm.classList.contains('hidden')
		? createButton.innerText = 'Create post'
		: createButton.innerText = 'Hide form';
});

console.log(deleteButton)
deleteButton.forEach(button => {
	button.addEventListener('click', (e) =>{
		e.preventDefault();

		const target = e.target.parentElement.dataset.id
		console.log(target)

		fetch(`/api/posts/${target}`, { method: 'DELETE' })
			.then(res => res.status === 200 ? window.location.reload() : console.log('Deliting error'))
		})
})

