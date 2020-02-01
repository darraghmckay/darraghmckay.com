import React from 'react';
import DeskHeader from '../components/DeskHeader';
import Intro from '../components/Intro';
import BlogList from '../components/BlogList';
import ProjectList from '../components/ProjectList';
import Skills from '../components/Skills';
import { useTitle } from '../utils/hooks';

const HomePage = () => {
  useTitle('Portfolio');

  return (
    <React.Fragment>
      <DeskHeader />
      <div className="page-body w-full mx-auto">
        <div className="mx-auto max-w-4xl">
          <Intro />
          <ProjectList count={9} />
        </div>
        <Skills />
        <div className="mx-auto max-w-4xl">
          <BlogList count={3} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomePage;
