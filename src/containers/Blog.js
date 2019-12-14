import React from 'react';
import blogs from '../data/blog';
import BlogList from '../components/BlogList';

const BlogPage = ({
  match: {
    params: { blogId },
  },
}) => {
  const blog = blogs.find(({ path }) => path === blogId);

  return (
    <div className="blog-page" id="top">
      <header className="text-center flex flex-col items-center justify-center">
        <h1>{blog.title}</h1>
      </header>
      <div className="page-body w-full mx-auto my-12">
        <div className="mx-auto max-w-2xl body">
          <span className="block mb-4">{blog.createdAt}</span>
          {blog.body()}
        </div>
      </div>
      <div className="block my-12 mx-auto max-w-4xl">
        <BlogList count={6} />
      </div>
    </div>
  );
};

export default BlogPage;
