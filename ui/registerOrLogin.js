const inquirer = require('inquirer');
const { isEmailValid, addUserEmail } = require('../user');
const displayMainMenu = require('./mainMenuWithoutLoggIn');



const registerOrLogin = () => {
    console.clear();
    inquirer.prompt([
        {
            type: 'input',
            name: 'email',
            message: 'Current Path: Register\nEnter the email:',
            validate: function (value) {
                
                if (isEmailValid(value) === true){
                    return true;
                }
                return 'Invalid email type. Enter again.';
            }
        }
    ]).then(answers => {
        console.log('Email:', answers.email);
        addUserEmail(answers.email);
        // Proceed with registration or login logic using the email
         
    }).catch(error => {
        console.error('Error occurred:', error);
    });
    displayMainMenu();
};

// Call the registerOrLogin function

module.exports=  registerOrLogin;
