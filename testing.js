const inquirer = require('inquirer');

// Main menu prompt
function mainMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'mainOption',
            message: 'Current Path: Main Menu',
            choices: [
                'Search all movies',
                'View all movies',
                'Add favorite Movie',
                'Remove favorite Movie',
                'Search favorite movie',
                'Personal info and favorite movies',
                'Logout',
                'Exit'
            ]
        }
    ]).then(answer => {
        switch (answer.mainOption) {
            case 'Search all movies':
                searchMenu();
                break;
            // Handle other options similarly
            case 'Exit':
                process.exit(0);
                break;
            default:
                mainMenu(); // If user selects an invalid option, return to main menu
        }
    });
}

// Submenu for searching movies
function searchMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'searchOption',
            message: 'Current Path: Search all movies',
            choices: [
                'Search via Title',
                'Search via Category',
                'Search via Cast',
                'Back to Main menu'
            ]
        }
    ]).then(answer => {
        switch (answer.searchOption) {
            case 'Search via Title':
                // Perform search via title
                displaySearchResults();
                break;
            // Handle other search options similarly
            case 'Back to Main menu':
                mainMenu(); // Return to main menu
                break;
            default:
                searchMenu(); // If user selects an invalid option, return to search menu
        }
    });
}

// Function to display search results
function displaySearchResults() {
    // Code to search for movies and display results
    // Assume results are stored in an array named 'movies'

    const movies = [
        { title: 'Dunki' },
        { title: 'Kola veri D' }
    ];

    console.log('Result of Search via Title: kola');
    movies.forEach((movie, index) => {
        console.log(`${index + 1}. Movie: ${movie.title}`);
    });

    // Prompt user for further action on search results
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Choose an action:',
            choices: [
                'View details',
                'Add as favorite',
                'Back to Main menu'
            ]
        }
    ]).then(answer => {
        switch (answer.action) {
            case 'View details':
                // Code to view details of selected movie
                break;
            case 'Add as favorite':
                // Code to add selected movie as favorite
                break;
            case 'Back to Main menu':
                mainMenu(); // Return to main menu
                break;
            default:
                displaySearchResults(); // If user selects an invalid option, return to search results
        }
    });
}

// Start the application by calling the main menu function
mainMenu();
