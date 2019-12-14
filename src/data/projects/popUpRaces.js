import React from 'react';
import { WEB_DEVELOPMENT } from '../../constants/blogCategories';

export default {
  title: 'Pop Up Races',
  subTitle: 'Running Races Registration, Payment and Results',
  href: 'https://popupraces.ie',
  path: 'pop-up-races',
  createdAt: '2015-11-23',
  img: 'https://darraghmckay.com:443/couch/uploads/image/purbanner.jpg',
  coverImg:
    'https://darraghmckay.com:443/couch/uploads/image/popupraces_full_2.png',
  category: WEB_DEVELOPMENT,
  color: '#002a46',
  body: () => (
    <div>
      <p>
        Pop Up Races is so far the largest project which I've taken on. I was
        approached with the task of building a small site which listed custom
        running events back in May 2014.
      </p>
      <p>Since then it has expanded massively as a company and a website.</p>
      <p>The original features of the site were as follows:</p>
      <ul>
        <li>Event Creation</li>
        <li>Display the Events on the Homepage and a Custom Events Page</li>
        <li>Photo Gallery Page including upload system</li>
        <li>Contact Us Form</li>
      </ul>
      <p>
        Fairly standard static/dynamic website, well within my abilities at the
        time.
      </p>
      <h3>Now...</h3>
      <p>
        The site as it stands looks more or less the same but the number of
        features which I've had to add is incredible.
      </p>
      <ul>
        <li>
          Event Creation
          <ul>
            <li>Events can have multiple distances</li>
            <li>
              Each distance / event can have multiple prices (Adult, Student,
              Family etc..)
            </li>
            <li>
              Each Event can have the ability to allow or disable online
              registration
            </li>
            <li>
              There is a custom google location pointing to the Start Line of
              each race
            </li>
            <li>
              Custom Text for each event for the confirmation of registration
              email
            </li>
          </ul>
        </li>
        <li>Display the Events on the Homepage and a Custom Events Page</li>
        <li>
          Allow people to register for events and pay with CC / DC with Stripe
          <ul>
            <li>
              One Account can register multiple guests too i.e. a woman can
              register her husband at the same time
            </li>
            <li>
              People can choose to pay for the Student / Adult / Family Price
              etc..
            </li>
          </ul>
        </li>
        <li>
          Allow people to register for the site and sign in to the site
          <ul>
            <li>
              Link any event they sign up for to their account, so they can see
              their updated result.
            </li>
          </ul>
        </li>
        <li>
          Photo Gallery Page <s>including upload system</s>
          <ul>
            <li>
              Photo Gallery is now retrieved from facebook using the facebook
              API (
              <a href="https://github.com/darraghmckay/facebook-photo-gallery">
                Read More
              </a>
              )
            </li>
          </ul>
        </li>
        <li>
          Results Upload &amp; Leaderboard
          <ul>
            <li>
              Results are now uploaded via CSV and linked to the runners
              accounts
            </li>
            <li>
              Results are entered into a global leaderboard at the same time,
              where each registered user only has one race entry in the
              leaderboard, so they can see exactly where they rank
            </li>
          </ul>
        </li>
        <li>Contact Us Form</li>
        <li>Wordpress Blog / Wordpress Integration</li>
        <li>Email Newsletter</li>
        <li>Admin Panel</li>
      </ul>
      <p>
        As you can see, there has been a huge addition in features since the
        original site development back in 2014.
      </p>
      <p>
        The whole site is custom buiit at the moment (aside from The Wordpress
        Blog), and is built with PHP, HTML / CSS and Javascript / JQuery.
      </p>
      <h2>My Experience</h2>
      <p>
        I can honestly say I have learnt a lot from this project. I've spent
        hours on it over the past 2 years, and the ongoing development has had
        to make me think on my toes.
      </p>
      <p>
        If I were to start again, of course I would entirely change everything,
        but that's a good thing, because it means I've learnt something over the
        last 2 years.
      </p>
      <img src="https://darraghmckay.com:443/couch/uploads/image/pur_blog.JPG" />
      <p className="text-center">Wordpress Blog</p>
      <img src="https://darraghmckay.com:443/couch/uploads/image/pur_results.JPG" />
      <p className="text-center">
        Results Page - Including Filtering By Category / Sex / Distance and
        Keyword
      </p>
    </div>
  ),
};
