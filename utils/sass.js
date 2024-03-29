const sass = require('node-sass');
const fs = require('fs');
const path = require('path');

sass.render({
	file: path.join('./', 'src', 'sass', 'style.sass'),
	outFile: path.join('./', 'static', 'css', 'style.css')
}, function(err, result) {
	if (!err) {
		fs.writeFile(path.join('./', 'static', 'css', 'style.css'), result.css, function(err) {
			if (!err) {
				console.log('Sass file compiled successfully!');
			} else {
				console.error('Error writing CSS file:', err);
			}
		});
	} else {
		console.error('Error compiling Sass file:', err);
	}
});

module.exports = sass