const inquirer = require('inquirer');
const chalk = require('chalk');
const displayMainMenu = require('./mainMenuWithoutLoggIn.js');

const searchMenu = [
    {
        type: 'list',
        name: 'searchOption',
        message: 'Current Path: Search all movies',
        choices: [
            'Search via Title',
            'Search Via Category',
            'Search via Cast',
            'Back to Main menu'
        ]
    }
];

const handleSearchMenuAnswers = (answers) => {
    switch (answers.searchOption) {
        case 'Search via Title':
            console.log('TODO: Implement search by title functionality');
            // Implement search by title functionality
            break;
        case 'Search Via Category':
            console.log('TODO: Implement search by category functionality');
            // Implement search by category functionality
            break;
        case 'Search via Cast':
            console.log('TODO: Implement search by cast functionality');
            // Implement search by cast functionality
            break;
        case 'Back to Main menu':
            displayMainMenu();
            break;
    }
};

const displaySearchMenu = () => {
    console.clear();
    inquirer.prompt(searchMenu).then(handleSearchMenuAnswers);
};

// Call function to display search menu
displaySearchMenu();

module.exports = displaySearchMenu;
