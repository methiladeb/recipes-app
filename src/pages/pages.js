// Importing necessary React modules and components for defining routes
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './home';
import Cuisine from './Cuisine';
import Searched from './Searched';
import Recipe from './Recipe';

// Functional component for defining application pages and their routes
function Pages() {
  return React.createElement(
    Routes,
    null,
    // Defining individual routes for different pages
    React.createElement(Route, { path: '/', element: React.createElement(Home) }), // Home page route
    React.createElement(Route, { path: '/cuisine/:type', element: React.createElement(Cuisine) }), // Cuisine page route
    React.createElement(Route, { path: '/searched/:search', element: React.createElement(Searched) }), // Searched page route
    React.createElement(Route, { path: '/recipe/:name', element: React.createElement(Recipe) }), // Recipe page route
  );
}

// Exporting the Pages component as the default export
export default Pages;
