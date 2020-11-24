const fs = require('fs');
const fsp = require('fs').promises;
var colors = require('colors');
const inquirer = require('inquirer');
const moment = require('moment');
const folder = require('../utils/folder');
const file = require('../utils/file');
const dotenv = require('dotenv');

dotenv.config();

exports.create = (file_name) => {

  //passsing dir_path and callback function
  fs.readdir(process.env.dir_path, function (err, files) {
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
        },
        {
          type: 'input',
          name: 'title',
          message: 'Title heading?'
        }
      ])
      .then(answers => {
        const new_file = `${process.env.dir_path}/${answers.project}/${file_name}`;
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

        let data = '';

        if (type !== '') {
          fs.readFile(`./templates/${type}.md`, function(err, buf) {
            // console.log(typeof buf.toString());
            data = buf.toString();
            data = data.replace(/:date/g, moment().format('YYYY-MM-DD'));
            
            // add a title
            if (answers.title !== '') {
              data = data.replace(/:title/g, answers.title);
            }
    
            console.info('Create new file in', answers.project.green.bold);
            file.write(`${process.env.dir_path}/${answers.project}/${file_name}`, data);
          });
        } else {
          // create a new blank file
          var createStream = fs.createWriteStream(`${process.env.dir_path}/${answers.project}/${file_name}`);
          createStream.end();
        }
        
      

        // if (type !== '') {
        //   // copy a template file
        //   file.copy(`./templates/${type}.md`, new_file, new_file);
        // } else {
        //   // create a new blank file
        //   var createStream = fs.createWriteStream(`${process.env.dir_path}/${answers.project}/${file_name}`);
        //   createStream.end();
        // }
      });
  });
};