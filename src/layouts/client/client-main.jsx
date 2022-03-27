import React from 'react';
import { Header } from './header';
import { Footer } from './footer';

export const ClientLayout = ({ component }) => {
  return (
    <>
      <Header />
        <div className='relative overflow-y-auto'>
          {component}
        </div>
      <Footer />
    </>
  )
};
