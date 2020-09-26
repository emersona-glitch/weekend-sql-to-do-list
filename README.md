![MIT LICENSE](https://img.shields.io/github/license/emersona-glitch/weekend-sql-to-do-list.svg?style=flat-square)
![REPO SIZE](https://img.shields.io/github/repo-size/emersona-glitch/weekend-sql-to-do-list.svg?style=flat-square)
![TOP_LANGUAGE](https://img.shields.io/github/languages/top/emersona-glitch/weekend-sql-to-do-list.svg?style=flat-square)
![FORKS](https://img.shields.io/github/forks/emersona-glitch/weekend-sql-to-do-list.svg?style=social)

# SQL TO-DO LIST

## Description

_Duration: Weekend Project_

With this project, I set out to make a to-do list application based on the technologies that we've covered in the past week. A user interface will be provided, which the user can use to add, review, edit, or delete tasks and items on the to-do list. Once the user has made an input or taken action in some way, information will be sent to our server, any logical comparisons or manipulations will take place, and then the results will be sent to the database where the data about the items on our list our 'actually' stored. The edited, updated, or retrieved data will then be packaged up by our server, and sent back to the client in order to update any changes that the user will need to see on the DOM.

### Prerequisites

You will need [Node.js](https://nodejs.org/en/) and the node package manager to install dependencies for this app.

## Installation

1. Fork this repository and Clone using `git clone <repo-url.git>`
2. Install any dependencies by navigating to the project directory and using `npm install` in terminal.
3. Create a database named `weekend-to-do-app`,
4. The queries in the `database.sql` file are set up to create the table required for this project.
   The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed.
   I recommend using Postico to run the CREATE TABLE query, as this is what I used.
7. Run `npm start` in your terminal
8. Navigate to (localhost:5000) in your browser to view the project.

## Usage

1. A task name and description can be entered in the olive-green text inputs
2. Once satisfied, the user can click the submit button to add the task to the to-do list
3. Tasks are marked as 'Not Complete' by default.
4. Once complete, the user can mark them as 'Complete' by clicking on the item's 'Mark as Completed' button.
5. If the user wishes, they can delete all tasks that have been completed by clicking on the 'Delete all Completed Tasks'
6. Individual items can be deleted by using their 'Delete' button.

## Built With

Node, Javascript, Express, PostgresQL

## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who gave me the training and guidance to complete this project. Special thanks to [Dane Smith](https://github.com/DoctorHowser), my instructor!

## Support
If you have suggestions or issues, please email [emerson.aagaard@gmail.com](emerson.aagaard@gmail.com)!
