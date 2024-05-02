const fs = require('fs');

function isEmailValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function addUserEmail(email) {
    let userData = {};
    try {
        const data = fs.readFileSync('./src/data/user.json', 'utf8');
        
        userData = JSON.parse(data);
    } catch (error) {
        console.error('Error reading user data:', error);
    }

    userData[email] = userData[email] || [];

    fs.writeFileSync('./src/data/user.json', JSON.stringify(userData, null, 2));
    

}

function addFavoriteMovie(email, movieIds) {
    let userData = {};
    try {
        const data = fs.readFileSync('./src/data/user.json', 'utf8');
        userData = JSON.parse(data);
    } catch (error) {
        console.error('Error reading user data:', error);
    }

    userData[email] = movieIds;

    fs.writeFileSync('./src/data/user.json', JSON.stringify(userData, null, 2));
}

function getFavoriteMovieIds(email) {
    let userData = {};
    try {
        const data = fs.readFileSync('./src/data/user.json', 'utf8');
        userData = JSON.parse(data);
    } catch (error) {
        console.error('Error reading user data:', error);
    }

    const favoriteMovieIds = userData[email] || [];

    return favoriteMovieIds;
}
module.exports = { isEmailValid, addUserEmail, addFavoriteMovie, getFavoriteMovieIds };