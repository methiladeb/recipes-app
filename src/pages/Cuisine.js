// Importing necessary modules and styles for the Cuisine component
const React = require('react');
const { useState, useEffect } = require('react');
const { Link, useParams } = require('react-router-dom');

// Functional component for displaying recipes based on cuisine
function Cuisine() {
  // State hook to manage the array of recipes for a specific cuisine
  const [cuisine, setCuisine] = useState([]);

  // useParams hook from 'react-router-dom' to access route parameters
  const params = useParams();

  // Function to fetch recipes based on the specified cuisine name
  const getCuisine = async (name) => {
    // Fetching data from the Spoonacular API based on cuisine name
    const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`);
    // Parsing the response data as JSON
    const recipes = await data.json();
    // Setting the fetched recipes in state
    setCuisine(recipes.results);
  };

  // useEffect hook to fetch recipes when the component mounts or when cuisine name changes
  useEffect(() => {
    getCuisine(params.type); // Fetch recipes based on the current cuisine type
    console.log(params.type); // Log the current cuisine type to the console
  }, [params.type]); // Dependency array to re-run the effect when cuisine type changes

  // Rendering the component
  return React.createElement(
    'div',
    { className: 'cuisine-grid' },
    // Mapping over the recipes to create individual recipe cards
    cuisine.map((item) => React.createElement(
      'div',
      { className: 'cuisine-card', key: item.id },
      // Link to the recipe details page
      React.createElement(
        Link,
        { to: `/recipe/${item.id}` },
        // Recipe image
        React.createElement('img', { src: item.image, alt: item.title }),
        // Recipe title
        React.createElement('h4', null, item.title),
      ),
    )),
  );
}

// Exporting the Cuisine component as the default export
module.exports = Cuisine;
