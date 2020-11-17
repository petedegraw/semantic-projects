const fs = require('fs').promises;
var colors = require('colors');
const inquirer = require('inquirer');
const project = require('../cli/project');

exports.init = () => {
  console.log('...Setting up Semantic Projects...'.green);
  console.log('Projects will be saved in this directory:'.bold);
  project.list();
  setTimeout(() => {
    console.log(`If that doesn't look right, rerun "echo 'dir_path=/Path/to/your/Projects' > .env" to set a new directory`.blue);
  }, 700);
}