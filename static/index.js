const createButton = document.getElementById('create-post');
const commentsButton = [...document.querySelectorAll('.comments-btn')];
const commentsContainer = [...document.querySelectorAll('div.comments-container')];
console.log(commentsButton)
const addCommentButton = document.getElementById('comment-add-btn');
const commentForm = [...document.querySelectorAll('.form-comment')];

commentsButton.forEach((element, index) => {
	element.addEventListener('click', (e) => {
		e.preventDefault();
		const target = e.target.dataset.id
		console.log(target)
		console.log(`comments button ${index} pushed`)
		commentsContainer[index].classList.toggle('hidden');

		fetch('/api/posts').then(res => res.json()).then(res => {
			console.log(res.posts)
			const result = res.posts
			result.forEach(post => {
				if (+post.date === +target) {
					console.log(post._id)
					document.cookie = `targetpost=${post._id}`
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


