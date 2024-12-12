import React, { useState } from "react";
import axios from "axios";
import { MovieCard } from "./MovieCard";

export const SearchInput = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const token = localStorage.getItem("token"); // Retrieve token for authentication
      const response = await axios.get(`https://localhost:7219/movies/search`, {
        params: { query },
        headers: { Authorization: `Bearer ${token}` },
      });
      setMovies(response.data); // Set movies from API response
    } catch (err) {
      if (err.response) {
        setError(err.response.data || "Error occurred during search.");
      } else {
        setError("Network error or server not reachable.");
      }
    }
  };

  return (
    <div className="relative bg-blue-gray-800 dark:bg-gray-600">
      <div className="container mx-auto p-4 pt-6">
        <form
          className="mx-auto w-3/4 sm:w-1/2 md:w-1/3"
          onSubmit={handleSearch}
        >
          <label
            for="default-search"
            class="text-sm font-medium text-gray-100 sr-only dark:text-white"
          >
            Search
          </label>
          <div class="relative flex items-center">
            <div class="absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="flex justify-center p-4 pl-10 text-sm text-black border border-gray-300 rounded-lg bg-gray-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Movies..."
              required
            />
            <button
              type="submit"
              className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-2"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {error && <p className="text-red-600 mt-4">{error}</p>}
      <div className="bg-gray-100 py-4 dark:bg-gray-700">
        <div className="container mx-auto">
          <div className="flex justify-center">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-max">
              {movies.length > 0
                ? movies.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movieid={movie.id}
                      title={movie.title}
                      year={movie.release_date.substring(0, 4)}
                      poster={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      genres={movie.genres}
                    />
                  ))
                : query && <p className="text-gray-500"></p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
