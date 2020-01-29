import React from 'react';
import img from '../../imgs/volgati.png';
import coverImg from '../../imgs/volgati-cover.png';
import { WEB_DEVELOPMENT } from '../../constants/blogCategories';

export default {
  title: 'Volgati.com',
  subTitle: 'Platform to Collaborate & Communicate for Fashion Enthusiasts',
  href: 'https://volgati.com',
  path: 'volgati-com',
  createdAt: '2016-09-21',
  img,
  coverImg,
  category: WEB_DEVELOPMENT,
  color: '#222835',
  body: () => (
    <div>
      <h2>What is Volgati?</h2>
      <p>
        Volgati is a startup company where I am currently the lead front-end
        developer.
      </p>
      <blockquote>
        <p>
          We here at Volgati want to synchonise the fashion industry by
          providing a platform to collaborate, communicate and ignite. Beyond
          this, Volgati gives you far more visibility as a our analytics allow
          you to see the industry, real-time market trends, localised data to
          you and much much more. Volgati is also integrated with existing
          platforms to allow for you to also get a feel for how people are
          finding out about you and giving you the opportunity to capitalise on
          that information.
        </p>
      </blockquote>
      <img src={coverImg} />
      <h3>Technology Stack</h3>
      <ul>
        <li>Heroku Deployment Process</li>
        <li>Ruby on Rails Framework</li>
        <li>Postgress Databas</li>
        <li>HTML / SCSS using Rails Template Engine</li>
        <li>Bootsrap for Interactions and Grid</li>
      </ul>
    </div>
  ),
};
