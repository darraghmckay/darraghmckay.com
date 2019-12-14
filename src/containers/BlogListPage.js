import React from 'react';
import DeskHeader from '../components/DeskHeader';
import BlogList from '../components/BlogList';

const BlogListPage = () => (
  <React.Fragment>
    <DeskHeader />
    <div className="page-body w-full mx-auto my-12">
      <div className="mx-auto max-w-4xl">
        <BlogList />
      </div>
    </div>
  </React.Fragment>
);

export default BlogListPage;
