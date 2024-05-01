const inquirer = require("inquirer");
const chalk = require("chalk");
const displaySearchMenu = require("./searchMovies");
const registerOrLogin = require("./registerOrLogin");
// Define main menu options
const mainMenu = [
  {
    type: "list",
    name: "option",
    message: "Main Menu:",
    choices: [
      "Register or Login",
      "Search all movies",
      "View all movies",
      "Exit",
    ],
  },
];

// Define the function to handle main menu answers
const handleMainMenuAnswers = (answers) => {
  switch (answers.option) {
    case "Register or Login":
      registerOrLogin();
      break;
    case "Search all movies":
      displaySearchMenu();
      break;
    case "View all movies":
      // viewAllMovies();
      break;
    case "Exit":
      console.clear();
      console.log("\n");
      console.log(chalk.cyan("Thanks for using the Movie App! 💖"));
      process.exit(0);
      break;
  }
};

// Define the displayMainMenu function
const displayMainMenu = () => {
  console.clear();
  console.log();
  console.log(chalk.green("Welcome to the Movie App!"));

  inquirer.prompt(mainMenu).then(handleMainMenuAnswers);
};

module.exports = displayMainMenu;
// Call the displayMainMenu function
displayMainMenu();
