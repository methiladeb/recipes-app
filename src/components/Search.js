// Importing necessary modules and styles for the Search component
require('../styles.css');
const React = require('react');
const { FaSearch } = require('react-icons/fa');
const { useNavigate } = require('react-router-dom');

// Functional component for the search form
function Search() {
  // State variable to manage the input value in the search form
  const [input, setInput] = React.useState('');
  // useNavigate hook from 'react-router-dom' for programmatic navigation
  const navigate = useNavigate();

  // Function to handle form submission
  const submitHandler = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    // Navigate to the search results page with the input value
    navigate(`/searched/${input}`);
  };

  // Rendering the component
  return React.createElement(
    'form',
    { className: 'form-style', onSubmit: submitHandler },
    React.createElement(
      'div',
      null,
      React.createElement(FaSearch, null),
      React.createElement('input', {
        onChange: (e) => setInput(e.target.value),
        type: 'text',
        value: input,
      }),
    ),
  );
}

// Exporting the Search component as the default export
module.exports = Search;
