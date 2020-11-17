# Semantic Projects

## Overview

A file based project management solution for managing and creating files, notes, and information for your projects.

The command line interface and scripts use Node JS. The default templates may be useful to you if you are a developer, designer, product owner, project manager, or contributor to software development. Ideal for your work related or freelance projects.

### Features

- Markdown note templates for [projects](./templates/proj.md), [requirements](./templates/req.md), and [wiki](./templates/wiki.md) articles. You can customize the body of each template to fit your needs. Also includes basic YAML front matter for use on static sites.
- Quick CLI commands for adding logs to log files and creating meeting entries.

### Recommended Markdown Tools

- a markdown editor such as [Typora](https://www.typora.io/)
- a markdown file preview plugin (Mac OS) such as [InkMark's Markdown Quick Look Plugin](http://inkmarkapp.com/markdown-quick-look-plugin-mac-os-x/)

## Setup

1. install [Node JS](https://nodejs.org/en/)
2. run `npm install` to install package dependencies
3. run `echo 'dir_path=/Path/to/your/Projects' > .env`
    using the path you will be using, might be something like '/Users/MyName/Dropbox/Business/Projects')
4. run `npm start` to complete the setup

## Usage

### Considerations

You just need a root project folder that includes all your active projects. This is useful because the app works with a single source of truth for your projects and most importantly, it is a quick way to find your active projects and easily make notes. Works well with cloud storage solutions like Dropbox.

While your team may already have a workflow and file/folder system for projects, this provides a more personal solution for storing project information you find useful. Instead of using note apps and then having files scattered across your devices, just keep the files and notes all in one location, the project folder.

Why markdown files? They are similar to PDF files, nearly any device can open them and any computer can edit them. This eliminates the reliance on online collaboration apps.

Recommended Folder Structure

```asci
├── Projects/
│   ├── _Archived
│   ├── Company A - Project Name
│   ├── Company B - Project Name
│   └── Personal - Project Name
```

### Projects

| Action | Script |
|-|-|
| list projects | `sp list projects` |
| create project | `sp -p {project_name}` |

### Notes

| Action | Script | Notes |
|-|-|-|
| create project | `sp -n proj-{project_name}.md` | prompts for which project in which to create the file |
| create requirement | `sp -n req-{feature}.md` | prompts for which project in which to create the file |
| create wiki | `sp -n wiki-{article}.md` | prompts for which project in which to create the file |

### Logs & Meetings

| Action | Script | Notes |
|-|-|-|
| create log entry | `sp -l` | prompts for which project in which to add or append the log.md file |
| create meeting entry | `sp -m` | prompts for which project in which to add or append the meetings.md file |

## To Do

- [ ] update requirements template