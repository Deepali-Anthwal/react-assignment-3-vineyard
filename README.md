# Assignment 3

## Introduction:
This project is a comprehensive React application that integrates with the Google Books API. It features a real-time search engine, a persistence-based "Favorites" system, and dynamic routing to provide a complete, high-performance book discovery experience.

## Tech Stack:
* **React.js**: Core framework for state and component management.
* **React Router DOM**: To handle multi-page navigation (Home, Favorites, and Details).
* **Axios/Fetch**: For handling asynchronous API requests to the Google Books API.
* **LocalStorage API**: Used to persist "Favorite" books across browser sessions.
* **CSS3**: Signature minimalist styling.

## Implementation Summary:
The application is built with a focus on data handling and component reusability:
- **API Integration & Hooks**: Leveraged `useEffect` to fetch book data on component mount and `useState` to manage search queries, loading states, and error handling.
- **Dynamic Search & Filtering**: Implemented a search interface that queries the Google Books API dynamically, allowing users to filter books by title or author.
- **State Persistence (Favorites)**: Developed a "Favorites" system where book IDs are stored in `localStorage`. Users can toggle favorite status, which persists even after a page refresh.
- **Reusable Component Architecture**: Created a modular `BookCard` component and custom `Button` elements to ensure a consistent UI/UX across the Search and Favorites pages.
- **Dynamic Detail Views**: Utilized `useParams` to fetch and render specific book metadata (description, author, and high-res cover images) based on the unique volume ID.

## How to Run the Project:
1. **Download the Source Code:**
   - Click the green **Code** button on the GitHub repository.
   - Select **Download ZIP**.
   - Extract the files to a folder on your computer.
2. **Open Terminal:**
   - Open your terminal or command prompt inside the project folder.
3. **Install Dependencies:**
   npm install
4. **Start Project:**
   npm start
