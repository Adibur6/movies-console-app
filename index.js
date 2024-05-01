import inquirer from 'inquirer';

// Define the main menu options
let stack=[];
let loggedIn=false;
let email="";
const mainMenuOptions = [
    { name: 'Option 1', value: 'option1' },
    { name: 'Option 2', value: 'option2' },
    { name: 'Exit', value: 'exit' }
];

// Define submenu for Option 1
const option1SubMenuOptions = [
    { name: 'Suboption 1-1', value: 'suboption1' },
    { name: 'Suboption 1-2', value: 'suboption2' },
    { name: 'Back to Main Menu', value: 'back' }
];

// Define submenu for Option 2
const option2SubMenuOptions = [
    { name: 'Suboption 2-1', value: 'suboption1' },
    { name: 'Suboption 2-2', value: 'suboption2' },
    { name: 'Back to Main Menu', value: 'back' }
];

// Function to display the main menu
function displayMainMenu() {
    inquirer.prompt({
        type: 'list',
        name: 'choice',
        message: 'Main Menu:',
        choices: mainMenuOptions
    }).then(answer => {
        switch (answer.choice) {
            case 'option1':
                displaySubMenu(option1SubMenuOptions);
                break;
            case 'option2':
                displaySubMenu(option2SubMenuOptions);
                break;
            case 'exit':
                console.log('Exiting...');
                break;
        }
    });
}

// Function to display submenus
function displaySubMenu(subMenuOptions) {
    inquirer.prompt({
        type: 'list',
        name: 'choice',
        message: 'Submenu:',
        choices: subMenuOptions
    }).then(answer => {
        if (answer.choice === 'back') {
            console.clear();
            displayMainMenu();
        } else {
            console.log(`Selected: ${answer.choice}`);
            // You can add logic here to handle sub-option selections
            // For simplicity, just logging the selected option
            displaySubMenu(subMenuOptions);
        }
    });
}

// Start the application by displaying the main menu
console.clear();
//displayMainMenu();

function promptWithOptions() {
    const questions = [
        {
            type: 'expand',
            name: 'choice',
            message: 'Choose an option:',
            choices: [
                {
                    key: 'a',
                    name: 'Option A',
                    value: 'a',
                    description: 'This is option A'
                },
                {
                    key: 'b',
                    name: 'Option B',
                    value: 'b',
                    description: 'This is option B'
                },
                {
                    key: 'c',
                    name: 'Option C',
                    value: 'c',
                    description: 'This is option C'
                }
            ]
        }
    ];

    return inquirer.prompt(questions).then(answers => answers.choice);
}

// Usage
promptWithOptions().then(choice => {
    console.log('Chosen option:', choice);
});
