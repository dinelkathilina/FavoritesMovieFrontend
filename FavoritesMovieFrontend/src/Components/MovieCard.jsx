import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import tmdbservice from "../../API/tmdbservice";

export const MovieCard = ({ movieid, title, year, poster }) => {
  const [rating, setRating] = useState("Loading...");
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);
  const [cast, setCast] = useState([]); // State for cast

  useEffect(() => {
    const fetchDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found.");
        setRating("Error: No Token");
        return;
      }

      try {
        // Fetch movie rating
        const movieRating = await tmdbservice.fetchMovieRating(movieid, token);
        setRating(movieRating);

        // Check if the movie is in favorites
        const favoriteStatus = await tmdbservice.isMovieFavorite(movieid, token);
        setIsFavorite(favoriteStatus);
      } catch (error) {
        console.error("Failed to fetch movie details", error.message || error);
        setRating("Error fetching details");
      }
    };

    fetchDetails();
  }, [movieid]);

  const fetchMovieDetails = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found.");
      return;
    }

    try {
      // Fetch movie details using tmdbservice
      const detailsResponse = await tmdbservice.getMovieDetails(movieid, token);
      setMovieDetails(detailsResponse);

      // Fetch cast details using tmdbservice
      const castResponse = await tmdbservice.getMovieCast(movieid, token);
      setCast(castResponse);

      setIsModalOpen(true); // Open the modal after fetching details
    } catch (error) {
      console.error("Failed to fetch movie details or cast", error.message || error);
    }
  };

  const addFavorites = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const success = await tmdbservice.addFavorite(movieid, token);
      if (success) {
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Failed to add to favorites", error.message || error);
    }
  };

  return (
    <>
      <div
        className="w-full max-w-sm bg-gray-300 border border-gray-200 rounded-lg shadow dark:bg-gray-700 dark:border-gray-600 p-4 hover:bg-gray-400 dark:hover:bg-gray-600 transition duration-300 cursor-pointer"
        onClick={fetchMovieDetails} // Open modal on poster click
      >
        <img
          className="p-8 rounded-t-lg w-auto h-auto object-cover"
          src={poster}
          alt={`${title} poster`}
        />
        <div className="flex items-center justify-between mt-2.5 mb-5">
          <span className="bg-blue-100 text-blue-800 text-s font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
            {rating}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent modal opening
              addFavorites();
            }}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {isFavorite ? "Added" : "Add to Favorites"}
          </button>
        </div>
        <div className="px-5 pb-5">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {title} ({year})
          </h5>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {movieDetails ? (
          <div>
            <h2 className="text-xl font-bold text-black dark:text-white">
              {movieDetails.title}
            </h2>
            <p className="mt-2 text-black dark:text-white">
              {movieDetails.overview}
            </p>
            <ul className="mt-4  text-black dark:text-white">
              <li>
                <strong>Genres:</strong> {movieDetails.genres.join(", ")}
              </li>
              
              <li>
                <strong>Cast:</strong>
                <ul className="list-disc ml-5 mt-2 ">
                  {cast.map((actor, index) => (
                    <li key={index} className="text-black dark:text-white">
                      {actor}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        ) : (
          <p>Loading details...</p>
        )}
      </Modal>
    </>
  );
};
