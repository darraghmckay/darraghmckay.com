import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import BlogList from './components/BlogList';
import DeskHeader from './components/DeskHeader';
import Footer from './components/Footer';
import Intro from './components/Intro';
import ProjectList from './components/ProjectList';
import Skills from './components/Skills';
import ProjectListPage from './containers/ProjectListPage';
import Project from './containers/Project';
import BlogListPage from './containers/BlogListPage';
import BlogPage from './containers/Blog';

const App = () => (
  <div>
    <Router>
      <Nav />
      <Switch>
        <Route path="/projects/:projectId" component={Project} />
        <Route path="/projects" component={ProjectListPage} />
        <Route path="/blog/:blogId" component={BlogPage} />
        <Route path="/blog" component={BlogListPage} />
        <Route path="/">
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
        </Route>
      </Switch>
      <div className="page-body w-full mx-auto">
        <Footer />
      </div>
    </Router>
  </div>
);

export default App;
