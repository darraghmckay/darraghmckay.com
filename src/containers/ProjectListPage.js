import React from 'react';
import DeskHeader from '../components/DeskHeader';
import ProjectList from '../components/ProjectList';
import { useTitle } from '../utils/hooks';

const ProjectListPage = () => {
  useTitle('Projects');
  return (
    <React.Fragment>
      <DeskHeader />
      <div className="page-body w-full mx-auto my-12">
        <div className="mx-auto max-w-4xl">
          <ProjectList />
        </div>
      </div>
    </React.Fragment>
  );
};
export default ProjectListPage;
