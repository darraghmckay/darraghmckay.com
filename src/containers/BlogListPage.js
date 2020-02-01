import React from 'react';
import DeskHeader from '../components/DeskHeader';
import BlogList from '../components/BlogList';
import { useTitle } from '../utils/hooks';

const BlogListPage = () => {
  useTitle('Blog');
  return (
    <React.Fragment>
      <DeskHeader />
      <div className="page-body w-full mx-auto my-12">
        <div className="mx-auto max-w-4xl">
          <BlogList />
        </div>
      </div>
    </React.Fragment>
  );
};

export default BlogListPage;
