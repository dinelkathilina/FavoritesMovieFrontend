import axios from 'axios';
const API_URL = 'https://localhost:7219';

const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
const tmdbservice =  {
  // Fetch favorites
  getFavorites: async (token) => {
    try {
      const response = await axios.get(`${API_URL}/favorites`, {
        headers: {
          ...DEFAULT_HEADERS,
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching favorites:', {
        message: error.message,
        response: error.response || 'No response',
      });
      throw error;
    }
  },

  // Remove from favorites
  removeFavorite: async (movieId, token) => {
    try {
      const response = await axios.delete(`${API_URL}/favorites/remove?movieid=${movieId}`, {
        headers: {
          ...DEFAULT_HEADERS,
          Authorization: `Bearer ${token}`,
        },
      });
      return response.status === 200;  // Return true if successful
    } catch (error) {
      console.error("Error removing favorite:", error.message);
      throw error;
    }
  },


  // Fetch movie rating
  fetchMovieRating: async (movieId, token) => {
    try {
      const response = await axios.get(
        `${API_URL}/movie/rating`,
        {
          params: { movieId },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.vote_average || "N/A"; // Return the rating or "N/A"
    } catch (error) {
      console.error("Error fetching movie rating:", error.message);
      throw error;
    }
  },

  // Fetch movie details
  getMovieDetails: async (movieId, token) => {
    try {
      const response = await axios.get(
        `${API_URL}/movie/details/${movieId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data; // Return the movie details
    } catch (error) {
      console.error("Error fetching movie details:", error.message);
      throw error;
    }
  },
    // Add to favorites
    addFavorite: async (movieId, token) => {
        try {
          const response = await axios.post(
            `${API_URL}/favorites/add?movieId=${movieId}`,
            {}, // Empty body
            {
              headers: {
                ...DEFAULT_HEADERS,
                Authorization: `Bearer ${token}`,
              },
            }
          );
          return response.status === 200; // Return true if successful
        } catch (error) {
          console.error("Error adding to favorites:", error.message);
          throw error;
        }
      },

      // Check if the movie is in favorites
  isMovieFavorite: async (movieId, token) => {
    try {
      const response = await axios.get(
        `${API_URL}/favorites/isFavorite`,
        {
          params: { movieId },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.isFavorite; // Return whether the movie is a favorite
    } catch (error) {
      console.error("Error checking movie favorites:", error.message);
      throw error;
    }
  },

// Fetch movie cast
getMovieCast: async (movieId, token) => {
    try {
      const response = await axios.get(
        `${API_URL}/movie/cast`,
        {
          params: { movieId },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data; // Return the movie cast data
    } catch (error) {
      console.error("Error fetching movie cast:", error.message);
      throw error;
    }
  },
  

  // Search for movies
  searchMovies: async (query, token) => {
    try {
      const response = await axios.get(`${API_URL}/movies/search`, {
        params: { query },
        headers: {
          ...DEFAULT_HEADERS,
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;  // Return movie data
    } catch (error) {
      console.error("Error searching for movies:", error.message);
      throw error;
    }
  }
}

export default tmdbservice;