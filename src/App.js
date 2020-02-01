import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import ProjectListPage from './containers/ProjectListPage';
import Project from './containers/Project';
import BlogListPage from './containers/BlogListPage';
import BlogPage from './containers/Blog';
import HomePage from './containers/HomePage';

const App = () => (
  <div>
    <Router>
      <Nav />
      <Switch>
        <Route path="/projects/:projectId" component={Project} />
        <Route path="/projects" component={ProjectListPage} />
        <Route path="/blog/:blogId" component={BlogPage} />
        <Route path="/blog" component={BlogListPage} />
        <Route path="/" component={HomePage} />
      </Switch>
      <div className="page-body w-full mx-auto">
        <Footer />
      </div>
    </Router>
  </div>
);

export default App;
