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
        const new_file = `${dir_path}/${answers.project}/log.md`;

        // get today's date
        let log_data = '';
        let date_unformatted = new Date();
        let date = date_unformatted.getFullYear() + '-' + date_unformatted.getDate() + '-' + date_unformatted.getMonth();

        log_data = `\n|${date}|${answers.message}|`;

        // console.info('Create new file in', answers.project.green.bold);
        fs.stat(new_file, function(err, stat) {
          if (err == null) {
              console.log(`${new_file} already exists`.bold.red);
              fs.appendFile(new_file, log_data, (err) => {
                if (err) console.log(err);
                console.log(`${new_file} file created`);
              });
          } else if (err.code === 'ENOENT') {
              // does not exist, create the file, append the file
              file.copy('./templates/log.md', new_file, new_file);
              
              let data = '';

              fs.readFile(new_file, function(err, buf) {
                
                data = buf.toString();
                data = data.replace(/:title/g, answers.project)

                file.write(new_file, data);
                // append file with log
                fs.appendFile(new_file, log_data, (err) => {
                  if (err) console.log(err);
                  console.log(`${new_file} log entered`);
                });
              });
          } else {
              console.log('Some other error: ', err.code);
          }
        });
        
      

        // if (type !== '') {
        //   // copy a template file
        //   file.copy(`./templates/${type}.md`, new_file, new_file);
        // } else {
        //   // create a new blank file
        //   var createStream = fs.createWriteStream(`${dir_path}/${answers.project}/${file_name}`);
        //   createStream.end();
        // }
      });
  });
}