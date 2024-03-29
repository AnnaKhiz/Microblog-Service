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