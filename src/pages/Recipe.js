// Importing necessary React modules and components for the Recipe page
import React, { useState, useEffect } from 'react';
import '../styles.css';
import { useParams } from 'react-router-dom';

// Functional component for displaying details of a recipe
function Recipe() {
  // Accessing route parameters
  const params = useParams();
  // State hooks for managing recipe details and active tab
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState('instructions');

  // Function to fetch recipe details based on the provided recipe name
  const fetchDetails = async () => {
    const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
    const detailData = await data.json();
    // Setting fetched details in state
    setDetails(detailData);
  };

  // useEffect hook to fetch recipe details when the component mounts or when recipe name changes
  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  // Conditional rendering of the instructions tab content
  const instructionsTab = activeTab === 'instructions' && React.createElement('div', null, React.createElement('h3', { dangerouslySetInnerHTML: { __html: details.summary } }), React.createElement('h3', { dangerouslySetInnerHTML: { __html: details.instructions } }));

  // Conditional rendering of the ingredients tab content
  const ingredientsTab = activeTab === 'ingredients' && React.createElement('ul', null, details.extendedIngredients.map((ingredient) => React.createElement('li', { key: ingredient.id }, ingredient.original)));

  return React.createElement(
    'div',
    { className: 'detail-wrapper' },
    React.createElement(
      'div',
      null,
      React.createElement('h2', null, details.title),
      React.createElement('img', { src: details.image, alt: details.title }),
    ),
    React.createElement(
      'div',
      { className: 'info' },
      React.createElement('button', {
        type: 'button',
        className: `button ${activeTab === 'instructions' ? 'active' : ''}`,
        onClick: () => setActiveTab('instructions'),
      }, 'Instructions'),
      React.createElement('button', {
        type: 'button',
        className: `button ${activeTab === 'ingredients' ? 'active' : ''}`,
        onClick: () => setActiveTab('ingredients'),
      }, 'Ingredients'),
      instructionsTab,
      ingredientsTab,
    ),
  );
}

// Exporting the Recipe component as the default export
export default Recipe;
