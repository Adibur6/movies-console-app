const fs = require("fs");
const { addUserEmail, isEmailValid, getFavoriteMovieIds } = require("../src/controllers/user");

let temp = {};
describe("isEmailValid function", () => {
  test("returns true for a valid email address", () => {
    const validEmails = [
      "test@example.com",
      "user123@gmail.com",
      "john.doe@example.co.uk",
      "info@subdomain.example.com",
    ];

    validEmails.forEach((email) => {
      expect(isEmailValid(email)).toBe(true);
    });
  });

  test("returns false for an invalid email address", () => {
    const invalidEmails = [
      "invalid-email",
      "invalid@.com",
      "@example.com",
      "invalid@example",
    ];

    invalidEmails.forEach((email) => {
      expect(isEmailValid(email)).toBe(false);
    });
  });
});

describe("addUserEmail function", () => {
  beforeEach(() => {
    temp = fs.readFileSync("./src/data/user.json", "utf8");
    fs.writeFileSync("./src/data/user.json", "{}");
  });
  afterEach(() => {
    fs.writeFileSync("./src/data/user.json", temp);
  });

  test("adds a new user email with an empty list of favorite movie IDs", () => {
    const email = "test@example.com";
    addUserEmail(email);

    const data = fs.readFileSync("./src/data/user.json", "utf8");
    const userData = JSON.parse(data);

    expect(userData[email]).toBeDefined();
    expect(userData[email]).toEqual([]);
  });

  test("does not overwrite existing user emails", () => {
    const existingEmail = "existing@example.com";
    const initialData = { [existingEmail]: [1, 2] };
    fs.writeFileSync("./src/data/user.json", JSON.stringify(initialData));

    const newEmail = "new@example.com";
    addUserEmail(newEmail);

    const data = fs.readFileSync("./src/data/user.json", "utf8");
    const userData = JSON.parse(data);

    expect(userData[existingEmail]).toBeDefined();
    expect(userData[existingEmail]).toEqual([1, 2]);
    expect(userData[newEmail]).toBeDefined();
    expect(userData[newEmail]).toEqual([]);
  });
});

describe("getFavoriteMovieIds function", () => {
  beforeEach(() => {
    temp = fs.readFileSync("./src/data/user.json", "utf8");
    fs.writeFileSync("./src/data/user.json", "{}");
  });
  afterEach(() => {
    fs.writeFileSync("./src/data/user.json", temp);
  });

  test("returns an empty array if the user does not exist", () => {
    const email = "nonexistent@example.com";
    const favoriteMovieIds = getFavoriteMovieIds(email);

    expect(Array.isArray(favoriteMovieIds)).toBe(true);
    expect(favoriteMovieIds).toHaveLength(0);
  });

  test("returns an empty array if the user has no favorite movies", () => {
    const email = "test@example.com";
    fs.writeFileSync("./src/data/user.json", JSON.stringify({ [email]: [] }));

    const favoriteMovieIds = getFavoriteMovieIds(email);

    expect(Array.isArray(favoriteMovieIds)).toBe(true);
    expect(favoriteMovieIds).toHaveLength(0);
  });

  test("returns the list of favorite movie IDs for the given user", () => {
    const email = "test@example.com";
    const movieIds = [1, 2, 3];
    fs.writeFileSync("./src/data/user.json", JSON.stringify({ [email]: movieIds }));

    const favoriteMovieIds = getFavoriteMovieIds(email);

    expect(favoriteMovieIds).toEqual(movieIds);
  });

  
});
