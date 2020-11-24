const fs = require('fs');
const fsp = require('fs').promises;
let colors = require('colors');
const inquirer = require('inquirer');
const moment = require('moment');
const file = require('../utils/file');
const dotenv = require('dotenv');

dotenv.config();

exports.create = () => {

    // passing dir_path and callback function
    fs.readdir(process.env.dir_path, function(err, files) {
        //handling error
        if (err) {
            return console.log('Unable to find or open the directory: ' + err);
        }

        let projects = [];
        files.forEach(file => {
            if (file !== '.DS_Store') {
                projects.push(file);
            }
        });

        inquirer
            .prompt([{
                    type: 'rawlist',
                    name: 'project',
                    message: 'Add a meeting entry to which project?',
                    choices: projects,
                },
                {
                    type: 'input',
                    name: 'subject',
                    message: 'subject?'
                }
            ])
            .then(answers => {
                const meeting_file = `${process.env.dir_path}/${answers.project}/meetings.md`;

                let meeting_data = '';

                meeting_data = `\n### ${moment().format('YYYY-MMM-DD - h:mm a')} - ${answers.subject}`;

                function appendFile(fileToAppend, dataForFile) {
                    fs.appendFile(fileToAppend, dataForFile, (err) => {
                        if (err) console.log(err);
                        console.log(`meeting entry added to ${fileToAppend}`.green.bold);
                    });
                }

                fs.stat(meeting_file, function(err, stat) {
                    if (err == null) {
                        // file already exists: append file
                        console.log('...updating meeting...'.gray);
                        appendFile(meeting_file, meeting_data);
                    } else if (err.code === 'ENOENT') {

                        // file does not exist: create file, append file
                        let data = '';

                        // create file
                        fs.readFile('./templates/meetings.md', function(err, buf) {

                            data = buf.toString();
                            data = data.replace(/:title/g, answers.project);
                            data = data.replace(/:date/g, moment().format('YYYY-MM-DD'));

                            file.write(meeting_file, data);

                            // append file
                            console.log('...updating meeting...'.gray);
                            setTimeout(() => appendFile(meeting_file, meeting_data), 500);
                        });
                    } else {
                        console.log('Some other error: ', err.code);
                    }
                });
            });
    });
};