// Importing necessary modules from React and external libraries
import React, { useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import '../styles.css';
import { Link } from 'react-router-dom';

// Functional component for displaying recommended recipes
function Recommendations() {
  // State hook to manage the array of recommended recipes
  const [recs, setRecs] = useState([]);

  // Function to fetch recommended recipes from the Spoonacular API
  const getRecs = async () => {
    // Checking if recommended recipes are already stored in local storage
    const check = localStorage.getItem('vegan');
    if (check) {
      // If yes, retrieve and set the recipes from local storage
      setRecs(JSON.parse(check));
    } else {
      // If not, fetch recipes from the API and store them in local storage
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=12`);
      const data = await api.json();
      localStorage.setItem('vegan', JSON.stringify(data.recipes));
      // Set the recipes in state and log them to the console
      setRecs(data.recipes);
      console.log(data.recipes);
    }
  };

  // useEffect hook to fetch recommended recipes when the component mounts
  useEffect(() => {
    getRecs();
  }, []);

  // Rendering the component
  return React.createElement(
    'div',
    null,
    // Wrapper div for styling purposes
    React.createElement(
      'div',
      { className: 'wrapper' },
      // Heading for the section
      React.createElement('h3', null, 'Recommended Picks'),
      // Splide component for displaying a carousel of recipes
      React.createElement(
        Splide,
        {
          options: {
            perPage: 4,
            arrows: false,
            pagination: false,
            drag: 'free',
            gap: '5rem',
          },
        },
        // Mapping over the recommended recipes to create SplideSlides
        recs.map((recipe) => React.createElement(
          SplideSlide,
          { key: recipe.id },
          // Individual recipe card with a link to the recipe details page
          React.createElement(
            'div',
            { className: 'card' },
            React.createElement(
              Link,
              { to: `/recipe/${recipe.id}` },
              React.createElement('p', null, recipe.title), // Recipe title
              React.createElement('img', { src: recipe.image, alt: recipe.title }), // Recipe image
              React.createElement('div', { className: 'gradient' }), // Gradient overlay for styling
            ),
          ),
        )),
      ),
    ),
  );
}

// Exporting the Recommendations component as the default export
export default Recommendations;
