
const fs = require('fs');
const inquirer = require("inquirer");

const Manager = require('./Develop/lib/Manager');
const Intern = require('./Develop/lib/Intern');
const Engineer = require('./Develop/lib/Engineer');

const createHTML = require('./Develop/src/page-template')

const team = [];

const managerQuestions = () => {
    return inquirer.prompt([
        {
            type: "input",
            message: "Whats your managers name?",
            name: "managerName"
        },
        {
            type: "input",
            message: "Whats your managers employee ID?",
            name: "managerID"
        },
        {
            type: "input",
            message: "Whats your managers email?",
            name: "managerEmail"
        },
        {
            type: "input",
            message: "Whats your managers office number?",
            name: "managerPhoneNumber"
        },
    ])

        .then((answers) => {

            const managerObj = new Manager(answers.managerName, answers.managerID, answers.managerEmail, answers.managerPhoneNumber);
            team.push(managerObj);
            promptMenu();
        })     
}

const promptMenu = () => {
    return inquirer.prompt([
        {
            type: "list",
            message: "Would you like to add a Engineer or Intern to your team? or finish building your team?",
            name: "listofOptions",
            choices: ["Engineer", "Intern", "finish building my team"]
        }
    ])

    .then(userChoice => {
        switch (userChoice.listofOptions) {
            case "Engineer":
                addEngineer();
                break;
            case "Intern":
                addIntern();
                break;
            default: writeFile();
        }
    });
};

const addEngineer = () => {
    return inquirer.prompt([
        {
            type: "input",
            message: "Whats your engineers name?",
            name: "engineerName"
        },
        {
            type: "input",
            message: "Whats your engineers employee ID?",
            name: "engineerID"
        },
        {
            type: "input",
            message: "Whats your engineers email?",
            name: "engineerEmail"
        },
        {
            type: "input",
            message: "Whats your engineers github username?",
            name: "engineerGithub"
        },

    ])
        .then((answers) => {

            const engineerObj = new Engineer(answers.engineerName, answers.engineerID, answers.engineerEmail, answers.engineerGithub);
            team.push(engineerObj);
            promptMenu();
        })     
}

const addIntern = () => {
    return inquirer.prompt([
        {
            type: "input",
            message: "Whats your interns name?",
            name: "internName"
        },
        {
            type: "input",
            message: "Whats your interns employee ID?",
            name: "internID"
        },
        {
            type: "input",
            message: "Whats your interns Email?",
            name: "internEmail"
        },
        {
            type: "input",
            message: "Whats your interns school?",
            name: "internSchool"
        },

    ])

        .then((answers) => {

            const internObj = new Intern(answers.internName, answers.internID, answers.internEmail, answers.internSchool);
            team.push(internObj);
            promptMenu();
        })     
}


function writeFile() {
    fs.writeFile('workteam.html', createHTML(team), (err) => {
        if (err) {
            console.log(err);
        }
        console.log("Team has been created!");
    })
}

managerQuestions();