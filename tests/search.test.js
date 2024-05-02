const {
  searchMoviesByTitle,
  searchMoviesByCast,
  searchMoviesByCategory,
} = require("../src/controllers/search");
const movies = require("../src/data/movies.json");
const customMovies = [
  {
    id: 1,
    movieTitle: "Journey Through the Stars",
    cast: ["John Spacey", "Emma Quasar", "Liam Neutron"],
    category: "Science Fiction",
    releaseDate: "2024-12-17",
    budget: "$100 million",
  },
  {
    id: 5,
    movieTitle: "Love in the Time of AI",
    cast: ["Eve Electron", "Adam Atom", "Turing Lovebot"],
    category: "Romantic Comedy",
    releaseDate: "2025-02-14",
    budget: "$60 million",
  },
  {
    id: 3,
    movieTitle: "Code of Tomorrow",
    cast: ["Alice Algorithm", "Bob Binary", "Charlie Compiler"],
    category: "Thriller",
    releaseDate: "2024-08-30",
    budget: "$80 million",
  },
];
describe("Search Movies By Title", () => {
  test("should return a single movie that match the title query", () => {
    const query = "The Godfather";
    const result = searchMoviesByTitle(movies, query);
    expect(result).toEqual([
      {
        id: 6,
        movieTitle: "The Godfather",
        cast: ["Marlon Brando", "Al Pacino", "James Caan"],
        category: "Crime",
        releaseDate: "1972-03-24",
        budget: "$6 million",
      },
    ]);
  });
  test("should return multiple movies that match the title query", () => {
    const query = "The";

    const result = searchMoviesByTitle(customMovies, query);

    const match = [
      {
        id: 1,
        movieTitle: "Journey Through the Stars",
        cast: ["John Spacey", "Emma Quasar", "Liam Neutron"],
        category: "Science Fiction",
        releaseDate: "2024-12-17",
        budget: "$100 million",
      },
      {
        id: 5,
        movieTitle: "Love in the Time of AI",
        cast: ["Eve Electron", "Adam Atom", "Turing Lovebot"],
        category: "Romantic Comedy",
        releaseDate: "2025-02-14",
        budget: "$60 million",
      },
    ];
    expect(result).toEqual(match);
  });

  test("should return movies in ascending order by title", () => {
    const query = "The";
    const result = searchMoviesByTitle(movies, query);
    const sortedResult = result.sort((a, b) =>
      a.movieTitle.localeCompare(b.movieTitle)
    );
    expect(result).toEqual(sortedResult);
  });

  test("should return all movies when query is empty", () => {
    const query = "";
    const result = searchMoviesByTitle(movies, query);
    expect(result).toEqual(movies);
  });
  test("should return empty array when no movie matches the query", () => {
    const query = "The Godfather 2";
    const result = searchMoviesByTitle(customMovies, query);
    expect(result).toEqual([]);
  });
});

describe("Search Movies By Cast", () => {
  test("should return all movies that include the specified actor in the cast", () => {
    const actor = "John Spacey";

    const result = searchMoviesByCast(customMovies, actor);

    expect(result).toEqual([
      {
        id: 1,
        movieTitle: "Journey Through the Stars",
        cast: ["John Spacey", "Emma Quasar", "Liam Neutron"],
        category: "Science Fiction",
        releaseDate: "2024-12-17",
        budget: "$100 million",
      },
    ]);
  });

  test("should return all movies when actor is empty", () => {
    const actor = "";
    const result = searchMoviesByCast(movies, actor);
    expect(result).toEqual(movies);
  });
  test("should return movies in ascending order by title", () => {
    const actor = "Christian";
    const result = searchMoviesByCast(movies, actor);
   
    const sortedResult = result.sort((a, b) =>
      a.movieTitle.localeCompare(b.movieTitle)
    );
    expect(result).toEqual(sortedResult);
  });
  test("should return empty array when no movie matches the actor", () => {
    const actor = "John Doe";
    const result = searchMoviesByCast(customMovies, actor);
    expect(result).toEqual([]);
  });
});

describe("Search Movies By Category", () => {
  test("should return all movies that belong to the specified category", () => {
    const category = "Thriller";
    const result = searchMoviesByCategory(customMovies, category);
    expect(result).toEqual([
      {
        id: 3,
        movieTitle: "Code of Tomorrow",
        cast: ["Alice Algorithm", "Bob Binary", "Charlie Compiler"],
        category: "Thriller",
        releaseDate: "2024-08-30",
        budget: "$80 million",
      },
    ]);
  });

  test("should return all movies when category is empty", () => {
    const category = "";
    const result = searchMoviesByCategory(movies, category);
    expect(result).toEqual(movies);
  });
  test("should return movies in ascending order by title", () => {
    const category = "Action";
    const result = searchMoviesByCategory(movies, category);
    const sortedResult = result.sort((a, b) =>
      a.movieTitle.localeCompare(b.movieTitle)
    );
    expect(result).toEqual(sortedResult);
  });
  test("should return empty array when no movie matches the category", () => {
    const category = "Horror";
    const result = searchMoviesByCategory(customMovies, category);
    expect(result).toEqual([]);
  });
});
