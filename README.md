# Favorites Movie Frontend

A simple frontend application for managing favorite movies, built with React, Tailwind CSS, and Vite.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 14.0.0 or higher)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the Repository:**
    ```bash
    gh repo clone dinelkathilina/FavoritesMovieFrontend
    ```

2. **Install Dependencies:**
    ```bash
    npm install
    ```

3. **Update API URLs:**
    - Open the `API` folder and update the `API_URL` variable in the following files:
      - `authService.js`
      - `tmdbService.js`
    - Replace the existing URL with the URL of your backend API.
      ```javascript
      const API_URL = 'https://localhost:7129';
      ```

4. **Run the Application:**
    ```bash
    npm run dev
    ```
    - The application will be available at [http://localhost:3000](http://localhost:3000).

## Note

Make sure to update the `API_URL` variable in the `authService.js` and `tmdbService.js` files with the correct URL of your backend API before running the application.

## Contributing

If you encounter any issues, please [open an issue](https://github.com/dinelkathilina/FavoritesMovieFrontend/issues) on the GitHub repository.
