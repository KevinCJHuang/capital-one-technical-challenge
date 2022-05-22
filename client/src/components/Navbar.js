import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light mb-3'>
      <div className='container'>
        <Link className='nav-link' to='/'>
          <div className='navbar-brand'>
            <h5 className='align-middle d-inline'>Reward Point System</h5>
          </div>
        </Link>
        <button
          className='navbar-toggler'
          data-toggle='collapse'
          data-target='#navbarToggler'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarToggler'>
          <ul className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <Link className='nav-link' to='/'>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/about'>
                About
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/rules'>
                Rules
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
