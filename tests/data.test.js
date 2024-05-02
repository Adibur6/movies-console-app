const movies = require("../src/data/movies.json"); 
function isMovie(obj) {
    return obj && typeof obj.id === 'number' &&
        typeof obj.movieTitle === 'string' &&
        Array.isArray(obj.cast) && obj.cast.every(cast => typeof cast === 'string') &&
        typeof obj.category === 'string' &&
        typeof obj.releaseDate === 'string' &&
        typeof obj.budget === 'string';
}
describe("Movies Data Tests", () => {
  test("Movies data is an array", () => {
    expect(Array.isArray(movies)).toBe(true);
  });
  test('all elements in movies are instances of Movie', () => {
    expect(movies.every(isMovie)).toBe(true);
});

  test("No info is missing from any movie object", () => {
    movies.forEach((movie) => {
      // Ensure no property is undefined
      Object.values(movie).forEach((value) => {
        expect(value).toBeDefined();
      });
    });
  });

  test("Every movie object id is unique", () => {
    const uniqueMovies = new Set(movies.map((movie) => movie.id));
    expect(uniqueMovies.size).toBe(movies.length);
  });

});
