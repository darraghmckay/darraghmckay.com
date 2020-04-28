import React from 'react';
import ProjectList from '../components/ProjectList';
import { useTitle } from '../utils/hooks';

const ProjectPage = ({ project }) => {
  useTitle(project.title);

  return (
    <div className="project-page" id="top">
      <header className="min-h-screen text-center flex flex-col items-center justify-end">
        <h1>{project.title}</h1>
        <h3>{project.subTitle}</h3>
        {(project.href || project.sourceCode) && (
          <div className="mt-8 mb-1 md:mb-12 flex-row">
            {project.href && (
              <a
                className="button"
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Project
              </a>
            )}
            {project.sourceCode && (
              <a
                className="button secondary"
                href={project.sourceCode}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Source
              </a>
            )}
            {project.downloadLink && (
              <a
                className="button secondary"
                href={project.downloadLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download
              </a>
            )}
          </div>
        )}
        <div className="splash-cover mt-6">
          {project.coverImg && (
            <div className="work-cover mt-0 mx-auto max-w-4xl monitorScreen">
              <div className="browser loading">
                <div className="status-bar">
                  <div className="buttons"></div>
                </div>
                <div className="tab-bar"></div>
                <div className="window">
                  <div className="loader"></div>
                  <img
                    alt={`${project.title} - Cover Photo`}
                    src={project.coverImg}
                    draggable="false"
                  />
                </div>
              </div>
            </div>
          )}
          {project.cover && project.cover()}
        </div>
      </header>
      <div className="page-body w-full mx-auto my-12">
        <div className="mx-auto max-w-2xl px-4 md:px-0 body">
          <span className="block mb-4">{project.createdAt}</span>
          {project.body()}
        </div>
      </div>
      <div className="block my-12 mx-auto max-w-4xl">
        <ProjectList count={9} />
      </div>
    </div>
  );
};

export default ProjectPage;
