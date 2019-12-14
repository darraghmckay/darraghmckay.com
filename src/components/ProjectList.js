import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import projects from '../data/projects';

const ProjectList = ({ count }) => (
  <div className="py-8 my-12 flex-col text-center inline-block w-full">
    <h2 className="text-4xl">My Projects</h2>
    <div className="my-12 md:px-8 w-full flex flex-row flex-wrap">
      {projects
        .slice(0, count)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map(project => (
          <div
            className="project lg:w-1/3 sm:w-1/2 w-full"
            key={project.path}
            style={{
              backgroundColor: project.color,
              backgroundImage: `url(${project.img})`,
            }}
          >
            <HashLink
              className="w-full h-full block"
              to={`/projects/${project.path}#top`}
            >
              <div
                className="w-full h-full p-6 flex flex-col text-left justify-center items-start"
                style={{
                  backgroundColor: project.color,
                }}
              >
                <strong className="text-2xl">{project.title}</strong>
                <small className="mt-1">{project.subTitle}</small>
              </div>
            </HashLink>
          </div>
        ))}
    </div>
    {count < Infinity && (
      <div className="w-full flex flex-row justify-center">
        <button>
          <Link to="/projects">View More</Link>
        </button>
      </div>
    )}
  </div>
);

ProjectList.propTypes = {
  count: PropTypes.number.isRequired,
};

ProjectList.defaultProps = {
  count: Infinity,
};

export default ProjectList;
