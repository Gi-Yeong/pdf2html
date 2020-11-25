const {Poppler} = require('node-poppler');
const imageToBase64 = require('image-to-base64');
const fs = require('fs')

console.log(process.argv[2])

const file = 'sample.pdf';
const poppler = new Poppler();
const options = {
	firstPageToConvert: 1,
	lastPageToConvert: 1,
	pngFile: true
};
const outputFile = `sample`;

poppler.pdfToCairo(file, outputFile, options).then(() => {
	let base64Image = null;
	imageToBase64(outputFile + "-1.png") // Path to the image
		.then(
			(response) => {
				base64Image = response;
				makeHtmlFile(base64Image)
			}
		)
		.catch(
			(error) => {
				console.log(error); // Logs an error if there was one
			}
		)

	function makeHtmlFile(base64Pic) {
		// console.log(base64Pic)
		const htmlSample = "<!DOCTYPE html>\n" +
			"<html lang=\"ko\">\n" +
			"<head>\n" +
			"    <meta charset=\"UTF-8\">\n" +
			"    <title>Title</title>\n" +
			"</head>\n" +
			"<body>\n" +
			"<img src=\"data:image/png;base64," + base64Pic + "\"\>\n" +
			"</body>\n" +
			"</html>"
		console.log(htmlSample)
		fs.writeFile('temp.html', htmlSample, 'utf8', function (error) {
			console.log('write end')
		})
	}
});


//https://www.npmjs.com/package/node-poppler
//https://www.npmjs.com/package/image-to-base64
//https://github.com/brix/crypto-js

//https://github.com/robinmoisson/staticrypt
//Staticrypt is available through npm as a CLI, install with npm install -g staticrypt and use as follow:
// Usage: staticrypt <filename> <passphrase> [options]