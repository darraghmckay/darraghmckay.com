import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import blogEntries from '../data/blog';

const BlogList = ({ count }) => (
  <div className="py-8 flex-col inline-block w-full">
    <h2 className="text-center">My Blog</h2>
    <div className="my-4 mx-auto w-full lg:max-w-2xl flex flex-row flex-wrap">
      {blogEntries
        .slice(0, count)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map(blogEntry => (
          <div
            className={`blog w-full my-3 px-6 py-4 ${blogEntry.category}`}
            key={blogEntry.path}
          >
            <a href={`/blog/${blogEntry.path}`}>
              <div className="w-full my-3 flex flex-row justify-between items-center">
                <div className="flex flex-col">
                  <strong className="text-2xl">{blogEntry.title}</strong>
                  <small>{blogEntry.category}</small>
                </div>
                <span className="date">{blogEntry.createdAt}</span>
              </div>
            </a>
          </div>
        ))}
    </div>
    <div className="w-full flex flex-row justify-center">
      <Link to="/blog">
        <button>View More</button>
      </Link>
    </div>
  </div>
);

BlogList.defaultProps = {
  count: Infinity,
};

BlogList.propTypes = {
  count: PropTypes.number.isRequired,
};

export default BlogList;
