const fs = require('fs');
const fsp = require('fs').promises;
var colors = require('colors');
const inquirer = require('inquirer');
const folder = require('../utils/folder');
const file = require('../utils/file');
const dotenv = require('dotenv');

dotenv.config();

exports.list = () => {
  fs.readdir(process.env.dir_path, function (err, files) {
    files.forEach(file => {
      if (file !== '.DS_Store') {
        console.log('  • ' + file);
      }
    });
  });
}

exports.create = (project_name) => {
  
  // verify or create root and active directories
  folder.make(`./${process.env.dir_path}`);
  folder.make(`./${process.env.dir_path}`);

  // create new project
  let project_path = `./${process.env.dir_path}/${project_name}`;

  // verify project with this project_name does not exist
  fs.stat(project_path, function(err, stat) {
    if (err == null) {
        console.log('Oh snap!'.bold.red, `there is already a project with the name ${project_name}`);
    } else if (err.code === 'ENOENT') {
        // does not exist
        console.log(`creating new project: ${project_name}`.bold);
        
        folder.make(project_path, project_name);
        // file.copy('./templates/project.md', project_path, `${project_path}/${project_name}.md`);
        
        console.log('SUCCESS!'.green)
    } else {
        console.log('Some other error: ', err.code);
    }
  });
}

exports.deleteProjects = () => {
  
  inquirer
  .prompt([
    {
      type: 'rawlist',
      name: 'confirm',
      message: 'Delete all projects. Are you sure?',
      choices: ['yes', 'no'],
    },
  ])
  .then(answers => {
    console.info('Answer:', answers.confirm);
    if (answers.confirm === 'yes') {
      fsp.rmdir(`./${process.env.dir_path}`, { recursive: true })
        .then(() => console.log('projects removed!'.green));
    } else {
      console.info('Cancelled');
    }
  });

}

exports.deleteProject = (project_name) => {
  inquirer
  .prompt([
    {
      type: 'rawlist',
      name: 'confirm',
      message: 'Delete the ' + project_name + ' project. Are you sure?',
      choices: ['yes', 'no'],
    },
  ])
  .then(answers => {
    console.info('Answer:', answers.confirm);
    if (answers.confirm === 'yes') {
      fsp.rmdir(`./${process.env.dir_path}/${project_name}`, { recursive: true })
        .then(() => console.log(`${project_name}`.bold, 'project removed!'.green));
    } else {
      console.info('Cancelled');
    }
  });
}