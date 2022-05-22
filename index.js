//require necessary files
const fs = require("fs");
const inquirer = require("inquirer");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const Employee = require("./lib/Employee");

//create empty array for employee data to be pushed into
const teamMembers = [];

//create inquirer prompts for employee data
function addEmployee() {
  inquirer
    .prompt([
      {
        //use LIST instead of CHECKBOX to prompt the (when) function. note: tried checkbox and it dind't work
        type: "list",
        name: "title",
        message: "What is the job title of the employee you would like to add?",
        choices: ["Manager", "Engineer", "Intern", "Finished"],
      },
      {
        type: "input",
        name: "name",
        when: (response) => response.title !== "Finished",
        message: "Please enter the name of the employee",
      },
      {
        type: "input",
        name: "employeeID",
        when: (response) => response.title !== "Finished",
        message: "Please enter the employee ID",
      },
      {
        type: "input",
        name: "email",
        when: (response) => response.title !== "Finished",
        message: "Please enter the email address of the employee",
      },
      //use when to display which questions will be asked depending on user input of Engineer, Intern, or Manager
      {
        type: "input",
        name: "officeNumber",
        when: (response) => response.title === "Manager",
        message: "Please enter the office number of the team manager",
      },
      {
        type: "input",
        name: "github",
        when: (response) => response.title === "Engineer",
        message: "Please enter the Github username of the employee",
      },
      {
        type: "input",
        name: "school",
        when: (response) => response.title === "Intern",
        message: "Please enter the name of the school the employee attends",
      },
    ])
    .then((response) => {
      //create if statements for each employee added
      if (response.title === "Manager") {
        const manager = new Manager(
          response.name,
          response.employeeID,
          response.email,
          response.officeNumber
        );
        teamMembers.push(manager);
        addEmployee();

        //call inquirer prompts to add employee if this is chosen
      } else if (response.title === "Engineer") {
        const engineer = new Engineer(
          response.name,
          response.employeeID,
          response.email,
          response.github
        );
        teamMembers.push(engineer);

        addEmployee();
        //call inquirer prompts to add employee if this is chosen
      } else if (response.title === "Intern") {
        const intern = new Intern(
          response.name,
          response.employeeID,
          response.email,
          response.school
        );
        teamMembers.push(intern);

        addEmployee();
      } else {
        createFile();
      }
    });
  //create end to loop, whether or not the user wants to add or stop
}
addEmployee();

//create the strucutre of the html and pass through the teamMembers array. include cardstructure as well.
const createFile = (teamMembers) => {
  let fileStructure = `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="./style.css" />
          <title>Team Profile Generator</title>
      </head>
      <header>My team</header>
      <body>
      <section>
          <div>${createCard(teamMembers)}</div>
          </section>
      </body>
      </html>`;

  fs.writeFile("index.html", fileStructure, (err) =>
    err ? console.error(err) : console.log("File added!")
  );
};

function runTest(teamMembers) {
  //use if statement to fill in div according to user input
  if (teamMembers.title === "Engineer") {
    return `<div>"https://github.com/${teamMembers.github}"</div>`;
  } else {
    teamMembers.title === "Intern";
    return `<div>"I attend ${teamMembers.school}"</div>`;
  }
}

//create card template to place each employee into and pass through teamMembers array
const createCard = () => {
  let cardStructure = "";
  teamMembers.forEach((teamMember) => {
    cardStructure += `<div class="card" style="width: 18rem;">
  <div class="card-body">
  <h5 class="card-title">${teamMember.getName()}</h5>
  <h6 class="card-subtitle mb-2 text-muted">${teamMember.getRole()}</h6>
  <div>Email: ${teamMember.getEmail()}</div>
 
  <div>Employee ID: ${teamMember.getId()}</div>

</div>
</div>`;
  });
  return cardStructure;
};
