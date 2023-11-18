// Importing icons from react-icons library
import { FaHamburger } from 'react-icons/fa';
import { GiNoodles, GiTacos, GiBowlOfRice } from 'react-icons/gi';

// Importing styled-components library for styling React components
import styled from 'styled-components';

// Importing NavLink from react-router-dom for navigation links
import { NavLink } from 'react-router-dom';

// Importing React for creating functional components
import React from 'react';

// Styled component for the container that holds the navigation links
const List = styled.div`
    display: flex;
    justify-content: center;
    margin: 2rem 0rem;
`;

// Styled component for the navigation link items
const StyleLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  text-decoration: none;
  background: linear-gradient(35deg, #494949, #313131);
  width: 6rem;
  height: 6rem;
  cursor: pointer;
  transform: scale(0.8);

  h4 {
    color: white;
    font-size: 0.8rem;
  }

  svg {
    color: white;
    font-size: 1.5rem;
  }

  // Styling for the active state of the navigation link
  &.active {
    background: linear-gradient(to right, #f27121, #e94057);
    svg {
      color: white;
    }
    h4 {
      color: white;
    }
  }
`;

// Functional component for rendering the category navigation links
function Category() {
  return React.createElement(
    List,
    null,
    // Creating navigation links for different cuisine categories
    React.createElement(
      StyleLink,
      { to: '/cuisine/American' },
      React.createElement(FaHamburger, null), // Hamburger icon for American cuisine
      React.createElement('h4', null, 'American'), // Text label for American cuisine
    ),
    React.createElement(
      StyleLink,
      { to: '/cuisine/Italian' },
      React.createElement(GiNoodles, null), // Noodles icon for Italian cuisine
      React.createElement('h4', null, 'Italian'), // Text label for Italian cuisine
    ),
    React.createElement(
      StyleLink,
      { to: '/cuisine/Mexican' },
      React.createElement(GiTacos, null), // Tacos icon for Mexican cuisine
      React.createElement('h4', null, 'Mexican'), // Text label for Mexican cuisine
    ),
    React.createElement(
      StyleLink,
      { to: '/cuisine/Asian' },
      React.createElement(GiBowlOfRice, null), // Rice bowl icon for Asian cuisine
      React.createElement('h4', null, 'Asian'), // Text label for Asian cuisine
    ),
  );
}

// Exporting the Category component as the default export
export default Category;
