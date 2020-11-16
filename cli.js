#!/usr/bin/env node
let argv = require('minimist')(process.argv.slice(2));
const setup = require('./src/utils/setup');
const project = require('./src/cli/project');
const note = require('./src/cli/note');
const log = require('./src/cli/log');

// console.dir(argv);

// setup
if (argv.s && argv.s === 'init') {
  setup.init();
}

// Projects
// create project
if (argv.p && argv.p !== true && argv.d !== true) {
  project.create(argv.p);
}
// delete project
// | delete project | `sp -p {project_name} -d` |
// if (argv.p && argv.d && typeof argv.d === 'boolean' && argv.d !== 'all') {
//   project.deleteProject(argv.p);
// }
// delete all projects
// | delete all projects | `sp -p -d all` |
// if (argv.p && argv.d && typeof argv.d === 'string' && argv.d === 'all') {
//   project.deleteProjects();
// }

// Notes
// create note
if (argv.n && argv.n !== true && argv.n !== true) {
  note.create(argv.n);
}

// Logs
// create log entry
if (argv.l) {
  log.create();
}