// Importing necessary modules from React and external libraries
import React, { useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import '../styles.css';
import { Link } from 'react-router-dom';

// Functional component for displaying Ketogenic recipes
function Ketogenic() {
  // State hook to manage the array of Ketogenic recipes
  const [keto, setKeto] = useState([]);

  // Function to fetch Ketogenic recipes from the Spoonacular API
  const getKeto = async () => {
    // Checking if Ketogenic recipes are already stored in local storage
    const check = localStorage.getItem('vegan');
    if (check) {
      // If yes, retrieve and set the recipes from local storage
      setKeto(JSON.parse(check));
    } else {
      // If not, fetch recipes from the API and store them in local storage
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=12&tags=ketogenic`);
      const data = await api.json();
      localStorage.setItem('vegan', JSON.stringify(data.recipes));
      // Set the recipes in state and log them to the console
      setKeto(data.recipes);
      console.log(data.recipes);
    }
  };

  // useEffect hook to fetch Ketogenic recipes when the component mounts
  useEffect(() => {
    getKeto();
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
      React.createElement(
        'h3',
        null,
        'Vegan picks',
      ),
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
        // Mapping over the Ketogenic recipes to create SplideSlides
        keto.map((recipe) => React.createElement(
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

// Exporting the Ketogenic component as the default export
export default Ketogenic;
