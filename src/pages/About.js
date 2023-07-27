import React from "react";
import Box from '@mui/material/Box';
import Sidenav from '../sidebar'


const About = () => {
  return (

    <Box sx={{ display: 'flex' }}>
    <Sidenav />

    <div className="container">
      <div className="py-4">
        <h1>About Page</h1>
        <p className="lead">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque rerum
          hic ab veniam reiciendis cum repudiandae, voluptate explicabo nesciunt
          nam accusantium? Soluta cupiditate, accusamus commodi praesentium
          laborum dolorum libero maiores!
        </p>

        <p className="lead">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque rerum
          hic ab veniam reiciendis cum repudiandae, voluptate explicabo nesciunt
          nam accusantium? Soluta cupiditate, accusamus commodi praesentium
          laborum dolorum libero maiores!
        </p>
        <p className="lead">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque rerum hic ab veniam reiciendis cum repudiandae, voluptate explicabo nesciunt nam accusantium? Soluta cupiditate, accusamus commodi praesentium laborum dolorum libero maiores!</p>
      </div>
    </div>
    </Box>
  );
};

export default About;
