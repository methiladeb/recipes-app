const React = require('react');
const { useState, useEffect } = require('react');
const { Link, useParams } = require('react-router-dom');

// Functional component for displaying searched recipes
function Searched() {
  // State hooks for managing searched recipes, input value, and search state
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [input, setInput] = useState('');
  const params = useParams();
  const [searched, setSearched] = useState(false); // State to track if a search has been performed

  // Function to fetch recipes based on the specified search query
  const getSearched = async (name) => {
    // Fetching data from the Spoonacular API based on the search query
    const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`);
    // Parsing the response data as JSON
    const recipes = await data.json();
    // Setting the fetched recipes in state
    setSearchedRecipes(recipes.results);
    // Set searched to true when a search is performed
    setSearched(true);
  };

  // Function to handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    getSearched(input);
  };

  // useEffect hook to fetch recipes when the component mounts or when search query changes
  useEffect(() => {
    getSearched(params.search);
  }, [params.search]);

  // Returning the component's equivalent JavaScript code
  return React.createElement(
    'div',
    null,
    // Conditionally render the Search component
    !searched && React.createElement(
      'form',
      { onSubmit: handleSearch },
      React.createElement('input', {
        type: 'text',
        placeholder: 'Search...',
        value: input,
        onChange: (e) => setInput(e.target.value),
      }),
      React.createElement('button', { type: 'submit' }, 'Search'),
    ),
    React.createElement(
      'div',
      { className: 'grid' },
      // Mapping over the searched recipes to create individual recipe cards
      searchedRecipes.map((item) => React.createElement('div', { className: 'searched-card', key: item.id }, React.createElement(
        Link,
        { to: `/recipe/${item.id}` },
        // Recipe image
        React.createElement('img', { src: item.image, alt: item.title }),
        // Recipe title
        React.createElement('h4', null, item.title),
      ))),
    ),
  );
}

// Exporting the Searched component as the default export
module.exports = Searched;
