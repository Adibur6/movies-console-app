import inquirer from 'inquirer';
import {isEmailValid} from '../user.js';

const registerOrLogin = () => {
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
        // Proceed with registration or login logic using the email
    }).catch(error => {
        console.error('Error occurred:', error);
    });
};

// Call the registerOrLogin function
registerOrLogin();

export default registerOrLogin;
