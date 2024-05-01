import inquirer from "inquirer";

// Define the initial question
const questions = [
  {
    type: 'list',
    name: 'productType',
    message: 'What type of product do you want to create?',
    choices: ['Book', 'Movie', 'Song']
  }
];

// Add more questions based on the user's selection
const addProductQuestions = {
  'Book': [
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of the book:'
    },
    {
      type: 'input',
      name: 'author',
      message: 'Enter the author of the book:'
    }
  ],
  'Movie': [
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of the movie:'
    },
    {
      type: 'input',
      name: 'director',
      message: 'Enter the director of the movie:'
    }
  ],
  'Song': [
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of the song:'
    },
    {
      type: 'input',
      name: 'artist',
      message: 'Enter the artist of the song:'
    }
  ]
};

// Prompt the user with the initial question
inquirer.prompt(questions)
  .then(answers => {
    // Get the additional questions based on the user's selection
    const additionalQuestions = addProductQuestions[answers.productType];
    if (additionalQuestions) {
      // Prompt the user with additional questions if available
      return inquirer.prompt(additionalQuestions);
    }
    // If no additional questions, return the initial answers
    return answers;
  })
  .then(answers => {
    console.log('Answers:', answers);
  })
  .catch(error => {
    console.error('Error occurred:', error);
  });
