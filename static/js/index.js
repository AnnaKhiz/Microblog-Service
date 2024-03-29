const post = [...document.querySelectorAll('.content__label')];

post.forEach((el, index) => {
	const preview = document.getElementById(`cutted-desc-${index}`);
	const fullDescription = document.getElementById(`full-desc-${index}`);
	el.addEventListener('click', () => {
		preview.classList.toggle('hidden');
		fullDescription.classList.toggle('hidden');
	})
})