const fs = require('fs');
const fsp = require('fs').promises;
var colors = require('colors');
const inquirer = require('inquirer');
const folder = require('../utils/folder');
const file = require('../utils/file');
const constants = require('../constants');

exports.create = (project_name) => {
  
  // verify or create root and active directories
  folder.make(`./${constants.project_folder_root}`);
  folder.make(`./${constants.project_folder_root}/${constants.project_folder_active}`);

  // create new project
  let project_path = `./${constants.project_folder_root}/${constants.project_folder_active}/${project_name}`;

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
      fsp.rmdir(`./${constants.project_folder_root}`, { recursive: true })
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
      fsp.rmdir(`./${constants.project_folder_root}/${constants.project_folder_active}/${project_name}`, { recursive: true })
        .then(() => console.log(`${project_name}`.bold, 'project removed!'.green));
    } else {
      console.info('Cancelled');
    }
  });
}