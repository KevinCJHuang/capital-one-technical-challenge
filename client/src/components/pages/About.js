import React from 'react';
const About = () => {
  return (
    <div>
      <div className='container'>
        <div className='card border-0 m-3'>
          <h5>About this Web App</h5>
          <p>
            This web app is created Capital One's Technical Assessment for Fall
            2022 Co-op Recruitment. For more information, please the README.md
            file in the following github link.
          </p>
          <ul>
            <li>
              Github Link:
              https://github.com/KevinCJHuang/capital-one-technical-challenge
            </li>
            <li>
              Deployment Link:
              https://reward-point-system-chengjie.herokuapp.com/
            </li>
          </ul>
          <p>To use this web app:</p>
          <ul>
            <li>Go to the Home page.</li>
            <li>
              Use the "Add New Transaction Record" section to add any new
              transactions.
            </li>
            <li>
              Click the "Generate Report" button to calculate the reward points.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
