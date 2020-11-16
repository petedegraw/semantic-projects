#!/usr/bin/env node
let argv = require('minimist')(process.argv.slice(2));
const project = require('./src/cli/project');
const note = require('./src/cli/note');

// console.dir(argv);

// Projects
// create project
if (argv.p && argv.p !== true && argv.d !== true) {
  project.create(argv.p);
}
// delete project
if (argv.p && argv.d && typeof argv.d === 'boolean' && argv.d !== 'all') {
  project.deleteProject(argv.p);
}
// delete all projects
if (argv.p && argv.d && typeof argv.d === 'string' && argv.d === 'all') {
  project.deleteProjects();
}

// Notes
// create note
if (argv.n && argv.n !== true && argv.n !== true) {
  note.create(argv.n);
}