import React from 'react';
import { useTitle } from '../utils/hooks';

const NotFoundPage = () => {
  useTitle("That's a 404");

  return (
    <div className="not-found-page">
      <header className="text-center flex flex-col items-center justify-center flex-grow">
        <h1>That's a 404</h1>
        <h3>I really couldn't find what you're looking for</h3>
      </header>
    </div>
  );
};

export default NotFoundPage;
