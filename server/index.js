const fs = require('fs');
const path = require('path');
const mdp = require('@cenguidanos/node-markdown-parser');
// could use https://github.com/jonschlinkert/gray-matter
// reference https://github.com/vercel/next.js/tree/canary/examples/blog-starter
const dotenv = require('dotenv');

dotenv.config();

let markdown = new mdp.Markdown(mdp.MarkdownParserOptions);

function buildPage(input_file) {

	let file = fs.readFileSync(process.env.dir_path + '/' + input_file, 'utf-8');

	let data = markdown.toJSON(file);

	// console.log(data);
	let fileName = path.basename(input_file).replace(/ /g, '').replace(/.md/g, '');

	// console.log(`${fileName}.html`);
	// return;

	let html  = `<!doctype html>`;
	    html += `<head>`;
	    html += `<title>${data.title} for ${data.client}</title>`;
	    html += `<meta name="description" content="${data.description}" />`;
	    html += `</head>`;
	    html += `<body>${data.body}</body>`;
	    html += `</html>`;

	fs.writeFile(`./public/${fileName}.html`, html, (err) => {
	  if (err) console.log(err);
	});
}


var glob = require('glob');
//Some options
options = {
    cwd: process.env.dir_path
},

//glob it.
glob('**/*.md', options, function (err, files) {
    if (err) {      
        console.log(err);
    } 
    //Print the array of images at one go
    console.log("\n\n********* Print the array that containing image names *********")
    console.log(files);
    //listing all files using forEach
    console.log("\n\n***************** Print individual image name *****************\n")
    files.forEach(function (file) {
        //TODO: Do whatever you want to do with the file
        // console.log(file);
    	buildPage(file);
    });   
});