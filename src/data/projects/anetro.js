import React from 'react';
import img from '../../imgs/anetroSquare.jpg';
import coverImg from '../../imgs/kain.png';
import { WEB_DEVELOPMENT } from '../../constants/blogCategories';

export default {
  title: 'ANETRO',
  subTitle: 'All Your Internal Feedback, All in One Place',
  href: 'https://anetro.com',
  path: 'anetro',
  createdAt: '2015-11-23',
  img,
  coverImg,
  category: WEB_DEVELOPMENT,
  color: '#1ABC9C',
  body: () => (
    <div>
      <h2>What is Anetro?</h2>
      <p>
        Anetro is a startup company that I am currently the CTO (Chief Technical
        Officer) of. In other words, we're a 5 man team and I'm the lead
        developer.
      </p>
      <blockquote>
        <p>
          <em>
            Anetro is a communcation-enhancing tool which gives greater
            visibility, saves users time and increases efficiency
          </em>
        </p>
        <p>
          Anetro allows for the entire business "communication to be
          <strong>synced and stored in one place</strong>, which prevents loss
          of information but also allows each individual business to have far
          greater visibility
        </p>
        <p>
          The analysis model generated by Anetro gives users the opportunity to
          <strong> enhance operational efficiency</strong>
          and save time because users know far more about their activities
        </p>
      </blockquote>
      <h2>The Build</h2>
      <p>
        As I'm the lead developer on this, I made all of the decisions, but for
        once, I feel like they were educated decisions.
      </p>
      <p>
        The code is served from an AWS Linux Server running apache, I made this
        choice because I knew the web app would have a large target market,
        across the globe and AWS makes it easy to serve code from different
        locations and deal with scalling quite easily.
      </p>
      <p>
        I decided to build the web app using the
        <strong>Laravel PHP Framework</strong>.
        <br />I chose Laravel because it makes it really easy to create models
        and classes. It makes writing to and selecting from the database
        incredibly easy, as well as making routing (and hence pretty urls) quite
        handy. Along with a whole lot of other features such as encryption going
        in and decryption coming out of the database, a built in theme engine,
        user authentication, etc. etc.
      </p>
      <h2>Progress</h2>
      <p>
        So far it's still in alpha mode, but we're looking to go forward with a
        private beta soon, and then onto a public beta in the next month or so.
      </p>
      <p>
        But the build is more or less ready to go, it has all the functionality
        you might expect from a feedback platform
      </p>
      <ul>
        <li>Registering a Company / Group</li>
        <li>Registering as an Admin</li>
        <li>Registering / Inviting Employees / Group members</li>
        <li>Logging Feedback</li>
        <li>Viewing Feedback as an Admin</li>
        <li>
          Viewing the live analytics which we compute from the feedback which is
          logged by the employees.
        </li>
        <li>And much more</li>
      </ul>
      <h3>Technology Stack</h3>
      <ul>
        <li>Linux Server from AWS</li>
        <li>Laravel PHP Framework for core functionality</li>
        <li>MySql Server</li>
        <li>HTML / SCSS Styling</li>
        <li>Bootsrap for Interactions</li>
      </ul>
    </div>
  ),
};
