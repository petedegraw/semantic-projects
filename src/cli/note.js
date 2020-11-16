const fs = require('fs');
const fsp = require('fs').promises;
var colors = require('colors');
const inquirer = require('inquirer');
const folder = require('../utils/folder');
const file = require('../utils/file');
const constants = require('../constants');
var glob = require('glob');

exports.create = (file_name) => {
  // const dir_path = '/Users/Shared/Dropbox/Biz/Projects';
  const dir_path = '/Users/petedegraw/Dropbox/Biz/Projects';

  //passsing dir_path and callback function
  fs.readdir(dir_path, function (err, files) {
      //handling error
      if (err) {
          return console.log('Unable to find or open the directory: ' + err);
      }

      // console.clear();
      inquirer
      .prompt([
        {
          type: 'rawlist',
          name: 'project',
          message: 'Create a new note within which project?',
          choices: files,
        }
      ])
      .then(answers => {
        console.info('Adding new file to', answers.project.green.bold);
        console.info('New File', `${dir_path}/${answers.project}/`, file_name.green.bold);
        const new_file = `${dir_path}/${answers.project}/${file_name}`;
        const file_type = file_name.substring(0, 4);
        let type = '';
        switch (file_type) {
          case 'wiki':
            type = 'wiki';
            break;
          case 'proj':
            type = 'proj';
            break;
          case 'req-':
            type = 'req';
            break;
          default:
            break;
        }
        if (type !== '') {
          // copy a template file
          file.copy(`./templates/${type}.md`, new_file, new_file);
        } else {
          // create a new blank file
          var createStream = fs.createWriteStream(`${dir_path}/${answers.project}/${file_name}`);
          createStream.end();
        }
      });
  });
}