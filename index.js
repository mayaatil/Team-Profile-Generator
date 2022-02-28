//require necessary files
const fs = require("fs");
const inquirer = require("inquirer");
const Employee = require("./lib/employee");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const Manager = require("./lib/manager");

//create empty array for employee data to be pushed into
let employeeData = [];

//create inquirer prompts for employee data
function createTeamRoster() {
  let questions = [
    {
      type: "input",
      name: "manager",
      message: "Please enter the first and last name of the team manager",
    },
    {
      type: "input",
      name: "managerID",
      message: "Please enter the ID of the team manager",
    },
    {
      type: "input",
      name: "managerEmail",
      message: "Please enter the email address of the team manager",
    },
    {
      type: "input",
      name: "office",
      message: "Please enter the office number of the team manager",
    },
    {
      type: "checkbox",
      name: "title",
      message: "What is the job title of the employee you would like to add?",
      choices: ["Engineer", "Intern"],
    },
    {
      type: "input",
      name: "employee",
      message: "Please enter the first and last name of the employee",
    },
    {
      type: "input",
      name: "employeeID",
      message: "Please enter the ID of the employee",
    },
    {
      type: "input",
      name: "employeeEmail",
      message: "Please enter the email address of the employee",
    },
    //use when to display which questions will be asked depending on user input of Engineer or Intern
    {
      type: "input",
      name: "github",
      when: (employeeInput) => employeeInput.title === "Engineer",
      message: "Please enter the Github username of the employee",
    },
    {
      type: "input",
      name: "school",
      when: (employeeInput) => employeeInput.title === "Intern",
      message: "Please enter the school of the employee",
    },
  ];
  //return back to main menu and utilize employee input
  return inquirer.prompt(questions).then((employeeInput) => {
    let addTeamManager = new Manager(
      employeeInput.manager,
      employeeInput.managerID,
      employeeInput.managerEmail,
      employeeInput.office,
      employeeInput.title
    );
    employeeData.push(addTeamManager);

    //push employee to array (engineer)
    let addEngineer = new Engineer(
      employeeInput.employee,
      employeeInput.employeeID,
      employeeInput.employeeEmail,
      employeeInput.github
    );
    employeeData.push(addEngineer);

    //push employee to array (intern)
    let addIntern = new Intern(
      employeeInput.employee,
      employeeInput.employeeID,
      employeeInput.employeeEmail,
      employeeInput.school
    );
    employeeData.push(addIntern);
    console.log(employeeData);
  });
}

//add cards for each intern or engineer added.
function createEachMember(employeeData) {
  teamMembers.forEach((teamMember) => {
    typeTeamMember += `<div class="card">
        <h1>${employeeData.employee}</h1>
        <div id="title"></div>
        <div>Employee ID: ${employeeData.employeeID}</div>
        <div>Employee Email: ${employeeData.employeeEmail} </div>
        <div id="additional"></div>
        </div>`;
  });

  //use if statement to fill in div according to user input
  if (employeeInput.title === "Engineer") {
    $("#title").textContent = "Engineer";
    $(
      "#additional"
    ).textContent = `"https://github.com/${employeeData.github}"`;
  } else {
    $("#title").textContent("Intern");
    $("#additional").textContent = `"https://github.com/${school}"`;
  }
}

//create structure of html and include card
function showTeamRoster(employeeData, typeTeamMember) {
  `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="./style.css" />
        <title>Team Profile Generator</title>
    </head>
    <header class="headerColor">My team</header>
    <body>
    <section>
        <div class="card">
        <h1>${employeeData.manager}</h1>
        <p>Team Manager</P>
        <div>ID: ${employeeData.managerID}</div>
        <div>Email: ${employeeData.managerEmail}</div>
        <div>Office: ${employeeData.office}</div>
        </div>
        </section>
        <section>
        ${typeTeamMember}
        </section>
    </body>
    </html>`;
}

//then, write html file using: fs.writeFile("fileName", content). this brings all the data from the array to the HTML file.
function writeFile(employeeData) {
  fs.writeFile("./dist/index.html", showTeamRoster(employeeData), (err) =>
    err ? console.log(err) : console.log("Success!")
  );
}

//call functions
createEachMember();
showTeamRoster();
writeFile();
