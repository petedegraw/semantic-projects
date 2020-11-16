const fs = require('fs');
const fsp = require('fs').promises;
var colors = require('colors');
const inquirer = require('inquirer');
const moment = require('moment');
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

      inquirer
      .prompt([
        {
          type: 'rawlist',
          name: 'project',
          message: 'Add a log entry to which project?',
          choices: files,
        },
        {
          type: 'input',
          name: 'message',
          message: 'message?'
        }
      ])
      .then(answers => {
        const log_file = `${dir_path}/${answers.project}/log.md`;

        let log_data = '';

        log_data = `\n|${moment().format('MMM Do YYYY, h:mm a')}|${answers.message}|`;

        function appendFile(fileToAppend, dataForFile) {
          fs.appendFile(fileToAppend, dataForFile, (err) => {
            if (err) console.log(err);
            console.log(`log entry added to ${fileToAppend}`.green.bold);
          });
        }

        fs.stat(log_file, function(err, stat) {
          if (err == null) {
            // file already exists: append file
            console.log('...updating log...'.gray);
            appendFile(log_file, log_data);
          } else if (err.code === 'ENOENT') {
            
            // file does not exist: create file, append file
            let data = '';

            // create file
            fs.readFile('./templates/log.md', function(err, buf) {
              
              data = buf.toString();
              data = data.replace(/:title/g, answers.project);
              data = data.replace(/:date/g, moment().format('YYYY-MM-DD'));

              file.write(log_file, data);

              // append file
              console.log('...updating log...'.gray);
              setTimeout(() => appendFile(log_file, log_data), 500);
            });
          } else {
              console.log('Some other error: ', err.code);
          }
        });
      });
  });
}