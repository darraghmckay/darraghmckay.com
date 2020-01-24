import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const Nav = () => (
  <div className="absolute z-10 w-full uppercase">
    <nav className="relative py-4 px-4 w-full max-w-4xl mx-auto flex flex-row flex-wrap justify-between">
      <Link to="/">Darragh Mc Kay</Link>
      <div>
        <Link to="/projects" className="mr-2">
          Projects
        </Link>
        <HashLink to="/#experience" className="mx-2">
          Experience
        </HashLink>
        <Link to="/blog" className="mx-2">
          Blog
        </Link>
      </div>
    </nav>
  </div>
);

export default Nav;
