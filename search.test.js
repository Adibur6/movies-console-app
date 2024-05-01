const {
  searchMoviesByTitle,
  searchMoviesByCast,
  searchMoviesByCategory,
} = require("./search");
const movies = require("./movies.json");

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
    const result = searchMoviesByTitle(movies, query);
    
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
      {
        id: 7,
        movieTitle: "The Dark Knight",
        cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
        category: "Action",
        releaseDate: "2008-07-18",
        budget: "$185 million",
      },
      {
        id: 6,
        movieTitle: "The Godfather",
        cast: ["Marlon Brando", "Al Pacino", "James Caan"],
        category: "Crime",
        releaseDate: "1972-03-24",
        budget: "$6 million",
      },
      {
        id: 2,
        movieTitle: "The Last Painter",
        cast: ["Claire Canvas", "Vincent Brush", "Pablo Palette"],
        category: "Drama",
        releaseDate: "2025-03-22",
        budget: "$40 million",
      },
      {
        id: 8,
        movieTitle: "The Shawshank Redemption",
        cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
        category: "Drama",
        releaseDate: "1994-09-23",
        budget: "$25 million",
      },
      {
        id: 4,
        movieTitle: "Whispers of the Ancient",
        cast: ["Sara Scrolls", "Daniel Dynasty", "Olivia Oracle"],
        category: "Adventure",
        releaseDate: "2024-11-15",
        budget: "$95 million",
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
});

describe.skip("Search Movies By Cast", () => {
  test("should return all movies that include the specified actor in the cast", () => {
    const actor = "Tom Hanks";
    const result = searchMoviesByCast(movies, actor);
    expect(result).toEqual([
      {
        title: "Forrest Gump",
        cast: ["Tom Hanks", "Robin Wright"],
        category: "Drama",
      },
      {
        title: "Saving Private Ryan",
        cast: ["Tom Hanks", "Matt Damon"],
        category: "War",
      },
    ]);
  });

  test("should return all movies when actor is empty", () => {
    const actor = "";
    const result = searchMoviesByCast(movies, actor);
    expect(result).toEqual(movies);
  });
});

describe.skip("Search Movies By Category", () => {
  test("should return all movies that belong to the specified category", () => {
    const category = "Action";
    const result = searchMoviesByCategory(movies, category);
    expect(result).toEqual([
      {
        title: "The Dark Knight",
        cast: ["Christian Bale", "Heath Ledger"],
        category: "Action",
      },
      {
        title: "Inception",
        cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
        category: "Action",
      },
    ]);
  });

  test("should return all movies when category is empty", () => {
    const category = "";
    const result = searchMoviesByCategory(movies, category);
    expect(result).toEqual(movies);
  });
});
