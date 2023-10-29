import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from './Footer';

const Shared = () => {
  return (
    <main>
      <Navigation />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Shared;
