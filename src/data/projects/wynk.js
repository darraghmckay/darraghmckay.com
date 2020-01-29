import React from 'react';
import img from '../../imgs/wynk.png';
import coverImg from '../../imgs/wynk-cover.png';
import wynkCoverCroppedImage from '../../imgs/wynk-cover-cropped.png';
import { APP_DEVELOPMENT } from '../../constants/blogCategories';

export default {
  title: 'Wynk',
  subTitle: 'Dating App that Matches You with People with Common Interests',
  href: 'https://getwynk.com',
  path: 'wynk',
  createdAt: '2018-02-21',
  img,
  coverImg,
  category: APP_DEVELOPMENT,
  color: '#2cc3b6',
  body: () => (
    <div>
      <h2>What is Wynk?</h2>
      <p>
        Wynk is an early stage startup where I am the CTO and lead developer of
        a small team.
      </p>
      <blockquote>
        <p>
          Wynk is a dating app thatpairs people based on, not only on a mutual
          attraction but also, an activity both people would like to do
        </p>
      </blockquote>
      <p>
        Unlike many dating apps which focus purely on looks, Wynk finds you new
        and interesting people in three easy steps
      </p>
      <ol>
        <li>
          Find new and interesting things to do near you. Whether it's finding
          your new favourite reastaurant or discovering your love for archery
        </li>
        <li>
          Find new and interesting people to join you. Swipe right or left on
          their profiles to like or pass them
        </li>
        <li>
          When someone likes you, you like them back and you both want to do the
          same things, you Match. Now it's up to you to get chatting
        </li>
      </ol>
      <img alt="Wynk - Dating App" src={wynkCoverCroppedImage} />
      <p>
        The app is no longer in development, but can still be downloaded from
        here<a href="https://getwynk.com">https://getwynk.com</a>
      </p>
      <p>Technology Stack:</p>
      <ul>
        <li>iOS and Android App developed in React Native</li>
        <li>NodeJS Backend</li>
        <li>MongoDB Storage</li>
        <li>AngularJS Internal Dashboard</li>
        <li>AWS Deployment</li>
        <li>Deprecated Native Swift (iOS) and Java (Android) Apps</li>
      </ul>
    </div>
  ),
};
