const movies = require("./movies.json"); 
const expectedProperties = [
    "id",
  "movieTitle",
  "cast",
  "category",
  "releaseDate",
  "budget",
];

describe("Movies Data Tests", () => {
  test("Movies data is an array", () => {
    expect(Array.isArray(movies)).toBe(true);
  });
  test("Objects only contain expected properties", () => {
    movies.forEach((movie) => {
      const movieProperties = Object.keys(movie);
      expect(expectedProperties.sort()).toEqual(movieProperties.sort());
    });
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
