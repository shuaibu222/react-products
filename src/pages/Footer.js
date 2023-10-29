import React from 'react';

const Footer = () => {
  return (
    <footer>
      <p>&copy;Product Review {new Date().getFullYear().toString()}</p>
    </footer>
  );
};

export default Footer;
