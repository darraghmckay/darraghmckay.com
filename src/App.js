import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import ProjectListPage from './containers/ProjectListPage';
import Project from './containers/Project';
import BlogListPage from './containers/BlogListPage';
import BlogPage from './containers/Blog';
import HomePage from './containers/HomePage';
import NotFoundPage from './containers/NotFoundPage';
import projects from './data/projects';
import blogEntries from './data/blog';
import Tailwind from './components/Tailwind';

const App = () => (
  <div className="flex flex-col min-h-screen justify-between items-center">
    <Router>
      <Nav />
      <Switch>
        {projects.map(project => (
          <Route
            key={project.path}
            path={`/projects/${project.path}`}
            render={() => <Project project={project} />}
          />
        ))}
        <Route path="/projects" exact={true} component={ProjectListPage} />
        {blogEntries.map(blog => (
          <Route
            key={blog.path}
            path={`/blog/${blog.path}`}
            render={() => <BlogPage blog={blog} />}
          />
        ))}
        <Route path="/blog" exact={true} component={BlogListPage} />
        <Route path="/tailwind" exact={true} component={Tailwind} />
        <Route path="/" exact={true} component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
      <div className="page-body w-full mx-auto">
        <Footer />
      </div>
    </Router>
  </div>
);

export default App;
