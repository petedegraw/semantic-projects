# Semantic Projects

A file based solution for managing files, assets, and information for your work related or freelance projects. Uses Node JS.

Includes markdown note templates for projects, requirements, and wiki articles. You can customize the body of each template to fit your needs. Also includes basic YAML front matter.

## Setup

1. run `npm install` to install package dependencies
2. run `npm start` to complete the setup
   1. you will need to enter the directory path for where you want your projects kept, this may be something like '/Users/MyName/Dropbox/Business/Projects'

## Usage

### Projects

| Action | Script |
|-|-|
| create project | `sp -p {project_name}` |

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

## To Do

- [ ] update project.js to work from constants
- [ ] update requirements template
- [ ] add meeting template