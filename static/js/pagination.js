const items = document.querySelectorAll('.content__block');
const itemsPerPage = 10;
let checkedPage = 0;

function showPage(page) {
	const startIndex = page * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	items.forEach((item, index) => {
		item.classList.toggle('hidden', index < startIndex || index >= endIndex);
	});
	updateActiveButtonStates();
}

function createPageButtons() {
	const totalPages = Math.ceil(items.length / itemsPerPage);
	const container = document.getElementById('pagination')

	for (let i = 0; i < totalPages; i++) {
		const pageButton = document.createElement('button');
		pageButton.textContent = i + 1;
		pageButton.addEventListener('click', () => {
			checkedPage = i;
			showPage(checkedPage);
			updateActiveButtonStates()
		});
		container.appendChild(pageButton);
	}
}

function updateActiveButtonStates() {
	const pageButtons = document.querySelectorAll('.pagination button');
	pageButtons.forEach((button, index) => {
		if (index === checkedPage) {
			button.classList.add('checked');
		} else {
			button.classList.remove('checked');
		}
	});
}

createPageButtons();
showPage(checkedPage);