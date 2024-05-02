const inquirer = require("inquirer");
const chalk = require("chalk");
const { isEmailValid, addUserEmail } = require("./user");
const {searchMoviesByTitle, searchMoviesByCast, searchMoviesByCategory} = require("./search");
const movies = require("./movies.json");    
const boxen = require("boxen");   
let email = "";

function displayMainMenu() {
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

    console.clear();
    console.log();
    console.log(chalk.green("Welcome to the Movie App! 🎬"));

    inquirer.prompt(mainMenu).then(handleMainMenuAnswers);
}


function registerOrLogin() {
  console.clear();
  inquirer
    .prompt([
      {
        type: "input",
        name: "email",
        message: "Current Path: Register\nEnter the email:",
        validate: function (value) {
          if (isEmailValid(value) === true) {
            return true;
          }
          return "Invalid email type. Enter again.";
        },
      },
    ])
    .then((answers) => {
      console.log("Email:", answers.email);
      addUserEmail(answers.email);
      email = answers.email;
      displayMainMenu2();
    })
    .catch((error) => {
      console.error("Error occurred:", error);
    });
}


function displaySearchMenu() {
    const searchMenu = [
        {
            type: "list",
            name: "searchOption",
            message: email ? `You're logged in as ${email}\nCurrent Path: Search all movies` : "Current Path: Search all movies",
            choices: [
                "Search via Title",
                "Search Via Category",
                "Search via Cast",
                "Back to Main menu",
            ],
        },
    ];

    const handleSearchMenuAnswers = (answers) => {
        switch (answers.searchOption) {
            case "Search via Title":
                displaySearchInput("Title");
                break;
            case "Search Via Category":
                displaySearchInput("Category");
                break;
            case "Search via Cast":
                displaySearchInput("Cast");
                break;
            case "Back to Main menu":
                if (email === "") {
                    displayMainMenu();
                } else {
                    displayMainMenu2();
                }
                break;
        }
    };

    console.clear();
    inquirer.prompt(searchMenu).then(handleSearchMenuAnswers);
}
function displaySearchInput(searchOption) {
    const searchMenu = [
        {
            type: 'input',
            name: 'searchQuery',
            message: `Current Path: Search via ${searchOption}\nEnter the ${searchOption}:`
        }
    ];

    console.clear();
    inquirer.prompt(searchMenu).then((answers) => {
        console.log(`Searching via ${searchOption} for: ${answers.searchQuery}`);
        // Implement search functionality based on the searchOption and searchQuery
        let searchResults =[];
        if(searchOption === 'Title') {
            // Handle search via title
            searchResults = searchMoviesByTitle(movies, answers.searchQuery);
        } else if(searchOption === 'Category') {
            // Handle search via category
            searchResults = searchMoviesByCategory(movies, answers.searchQuery);

        } else if(searchOption === 'Cast') {    
            // Handle search via cast
            searchResults = searchMoviesByCast(movies, answers.searchQuery);

        }
        displayMovies(searchResults,`Search results for ${searchOption}: ${answers.searchQuery}`);
      //  console.log(searchResults);
    }).catch((error) => {
        console.error('Error occurred:', error);
    });
}
function displayMovies(movies,extra="") {
    const choices = movies.map(movie => ({
        name: movie.movieTitle,
        value: movie.id
    }));
    choices.push({
        name: chalk.red('<- Back to main menu'),
        value: '<- Back to main menu'
    });

    const movieMenu = [
        {
            type: 'list',
            name: 'selectedMovie',
            message: 'Select a movie:',
            choices: choices
        }
    ];

    console.clear();
    if(extra){
        console.log(chalk.green(extra));
    }
    inquirer.prompt(movieMenu).then((answers) => {
        const selectedMovie = answers.selectedMovie;
        if (selectedMovie === '<- Back to main menu') {
            // Go back to menu
            // Implement logic to return to the menu
            if(email === "") {
                displayMainMenu();
            } else {
                displayMainMenu2();
            }
           
        } else {
            // Find the selected movie object
            const selectedMovieObject = movies.find(movie => movie.id === selectedMovie);
            //console.log('Selected movie:', selectedMovieObject);
            displayAMovie(selectedMovieObject,movies);
            // Implement logic to show details or perform actions related to the selected movie
        }
    }).catch((error) => {
        console.error('Error occurred:', error);
    });
}
function displayAMovie(selectedMovieObject,movies=[]) {
    const { id, movieTitle, cast, category, releaseDate, budget } = selectedMovieObject;

    // Construct the content to display in the box
    const content = `
    
    ${chalk.bold('Movie Title:')} ${movieTitle}
    ${chalk.bold('Cast:')} ${cast.join(', ')}
    ${chalk.bold('Category:')} ${category}
    ${chalk.bold('Release Date:')} ${releaseDate}
    ${chalk.bold('Budget:')} ${budget}
    `;

    // Define boxen options
    const boxenOptions = {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        backgroundColor: 'blue',
        borderColor: 'yellow'
    };

    // Create the boxed content
    const boxedContent = boxen(content, boxenOptions);

    // Log the boxed content
    console.log(boxedContent);

    // Prompt user for options
    inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: 'Options:',
            choices: [
                'Go back',
                'Back to Main Menu'
            ]
        }
    ]).then((answers) => {
        if (answers.option === 'Go back') {
            displayMovies(movies);
       
        } else {
            // Handle going back to the main menu
            if(email === "") {
                displayMainMenu();
            } else {
                displayMainMenu2();
            }
            
        }
    }).catch((error) => {
        console.error('Error occurred:', error);
    });
}



const displayMainMenu2 = () => {
    const greenText = chalk.green(`You're logged in as ${email}\n`);
    const menu = [
        {
            type: 'list',
            name: 'option',
            message: `Main Menu:`,
            choices: [
                'Search all movies',
                'View all movies',
                'Add favourite Movie',
                'Remove favorite Movie',
                'Search Favourite movie',
                'Personal info and Favourite movies',
                `Logout (${email})`,
                'Exit'
            ]
        }
    ];
    console.clear();
    console.log(greenText); 

    inquirer.prompt(menu).then((answers) => {
        switch (answers.option) {
            case 'Search all movies':
                displaySearchMenu();
                break;
            case 'View all movies':
                displayMovies(movies, 'Showing all Movies!');
                break;
            case 'Add favourite Movie':
                // Handle add favorite movie
                break;
            case 'Remove favorite Movie':
                // Handle remove favorite movie
                break;
            case 'Search Favourite movie':
                // Handle search favorite movie
                break;
            case 'Personal info and Favourite movies':
                // Handle personal info and favorite movies
                break;
            case `Logout (${email})`:
                console.log('Logging out...');
                email = "";
                break;
            case 'Exit':
                console.log('Exiting...');
                process.exit(0);
                break;
        }
    }).catch((error) => {
        console.error('Error occurred:', error);
    });
};


displayMainMenu();
