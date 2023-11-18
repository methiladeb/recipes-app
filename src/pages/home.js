// Importing necessary React module and components for the Home page
import React from 'react';
import recommendations from '../components/recommendations';
import Vegetarian from '../components/Vegetarian';
import Vegan from '../components/Vegan';
import Paleo from '../components/Paleo';
import Ketogenic from '../components/Ketogenic';

// Functional component for the Home page, displaying various recipe categories
function Home() {
  return React.createElement(
    'div',
    null,
    // Creating instances of different recipe category components
    React.createElement(recommendations, null), // Recommendations component
    React.createElement(Vegetarian, null), // Vegetarian component
    React.createElement(Vegan, null), // Vegan component
    React.createElement(Paleo, null), // Paleo component
    React.createElement(Ketogenic, null), // Ketogenic component
  );
}

// Exporting the Home component as the default export
export default Home;
