const fs = require('fs');
var colors = require('colors');
const inquirer = require('inquirer');
const file = require('./file');

exports.init = () => {
  console.log('...Setting up Semantic Projects...'.green);

  inquirer
  .prompt([
    {
      type: 'input',
      name: 'dir_path',
      message: 'What directory will you store projects in?'
    }
  ])
  .then(answers => {
    if (answers.dir_path !== '') {
      fs.writeFile('./env.js', `exports.dir_path = '${answers.dir_path}';`, (err) => {
        if (err) console.log(err);
        console.log(`./env.js file created`);
      });
    }
  });
}