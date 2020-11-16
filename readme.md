# Semantic Projects

A file based solution for managing files, assets, and information for your work related or freelance projects. Uses Node JS.

## Setup

1. run `npm install` to install package dependencies
2. run `npm link` to allow you to run `sp ...` from the command line
3. run `npm start` to complete the setup
   1. you will need to enter the directory path for where you want your projects kept

## How to Use

### Projects

| Action | Script |
|-|-|
| create project | `sp -p {project_name}` |
| delete project | `sp -p {project_name} -d` |
| delete all projects | `sp -p -d all` |

### Notes

| Action | Script |
|-|-|
| create project | `sp -n proj-{project_name}.md` |
| create requirement | `sp -n req-{feature}.md` |
| create wiki | `sp -n wiki-{article}.md` |

### Logs

| Action | Script |
|-|-|
| create log entry | `sp -l` |
