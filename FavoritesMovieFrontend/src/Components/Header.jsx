import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(() => {
    const storedThemeMode = localStorage.getItem("themeMode");
    return storedThemeMode === "dark";
  });

  const handleLogout = () => {
    // Delete the token from local storage
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    if (isChecked) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isChecked]);

  const handleToggle = () => {
    const isDarkMode = !isChecked;
    setIsChecked(isDarkMode);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("themeMode", isDarkMode ? "dark" : "light");
  };

  const [showModal, setShowModal] = useState(false);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [error, setError] = useState("");
  
  const fetchFavorites = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.get("https://localhost:7219/favorites", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const titles = response.data.map((movie) => ({
        id: movie.movieId,
        title: movie.title,
      }));
      setFavoriteMovies(titles);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleFavoritesClick = () => {
    fetchFavorites();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const handleRemoveFavorite = async (movieid) => {
    const token = localStorage.getItem("token");
    if (!token) return;
  
    try {
      const url = `https://localhost:7219/favorites/remove?movieid=${movieid}`;
      const headers = { Authorization: `Bearer ${token}` };
  
      const response = await axios.delete(url, { headers });
  
      if (response.status === 200) {
        console.log("Movie removed from favorites.");
        alert("Movie removed from favorites successfully.");
  
        // Update state directly after removing
        setFavoriteMovies((prevMovies) =>
          prevMovies.filter((movie) => movie.id !== movieid)
        );
  
        // Optionally fetch again to ensure backend sync
        if (favoriteMovies.length === 1) {
          fetchFavorites(); // Explicit fetch for empty state after last item
        }
      } else {
        console.error(`Error: ${response.statusText}`);
        alert("Failed to remove movie from favorites.");
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
      alert("An error occurred while removing the movie from favorites.");
    }
  };
  
  

  return (
    <header>
      <nav className="bg-gray-100 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-700">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl ">
          <Link to="/" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white text-gray-800">
              FavoriteMovies
            </span>
          </Link>
          <div className="flex items-center lg:order-2 ">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={isChecked}
                onChange={handleToggle}
              />
              <div
                className={`relative w-11 h-6 ${
                  isChecked ? "bg-blue-600" : "bg-gray-300"
                } rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600`}
              ></div>
              <span className="ms-3 text-sm font-medium text-gray-800 dark:text-gray-300 mr-5">
                {isChecked ? "Light Mode" : "Dark Mode"}
              </span>
            </label>

            <button
              onClick={handleFavoritesClick}
              className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-red-500 dark:hover:bg-red-800 focus:outline-none dark:focus:ring-orange-400"
            >
              Favorites
            </button>
            <button
              onClick={handleLogout}
              className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal} // Close when clicking outside
        >
          <div
            className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto relative dark:bg-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 focus:outline-none dark:text-gray-400"
              aria-label="Close Modal"
            >
              ✖
            </button>

            {/* Modal Header */}
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Favorite Movies
            </h2>

            {/* Movie List */}
            {/* {error && (
              <p className="text-red-500 text-sm mb-4">
                Failed to fetch favorites: {error}
              </p>
            )} */}
            <ul className="space-y-2">
              {favoriteMovies.map((movie) => (
                <li
                  key={movie.id}
                  className="flex justify-between items-center border-b pb-2 dark:border-gray-600"
                >
                  <span className="text-gray-800 dark:text-gray-200">
                    {movie.title}
                  </span>
                  <button
                    onClick={() => handleRemoveFavorite(movie.id)}
                    className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};
