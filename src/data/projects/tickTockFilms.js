import React from 'react';
import { WEB_DEVELOPMENT } from '../../constants/blogCategories';

export default {
  title: 'Tick Tock Films',
  subTitle: 'Professional Film Portfolio Site',
  href: 'https://ticktockfilms.ie',
  path: 'tick-tock-films',
  createdAt: '2015-11-23',
  img: 'https://darraghmckay.com:443/couch/uploads/image/tick_tock_logo-1.jpg',
  coverImg:
    'https://darraghmckay.com:443/couch/uploads/image/tick_tock_full.png',
  category: WEB_DEVELOPMENT,
  color: '#FFDC95',
  body: () => (
    <div>
      <p>
        Tick Tock Films are a student film company based in Dublin. Despite
        being students the work they produce is professional industry standard
        and they needed a website which portayed that.
      </p>
      <h2>Video</h2>
      <p>
        Being a film company, videos were their product and thus the site needed
        to be designed around showing and embedding videos.
        <br />
        The homepage consists of a large Image/Video slider, sporting a main
        <em>'Call To Action'</em>button, promting any visitor to view their
        showreel or contact them.
      </p>
      <p>
        Their<em>work</em>page was a huge part of their online portfolio, and as
        always hosting videos can be difficult and expensive. To make things
        lighter and faster I hooked into the
        <em>Vimeo API</em>and the<em>Youtube API.</em>
      </p>
      <p>
        Every film student is familiar with both Vimeo and Youtube's interface,
        so instead of re-inventing the wheel and creating my own interface,
        login system and video submission Management system I came up with the
        following solution.
      </p>
      <ul>
        <li>
          When they upload a video to their Vimeo or Youtube channel / profile
          it is automatically added to the website.
        </li>
        <li>
          They videos are categorized on the website accoring to the tags on
          Vimeo / Youtube.
        </li>
        <li>
          To hide a video from the website another tag can be added that will
          hide it from the website.
        </li>
      </ul>
      <h3>Why?</h3>
      <ul>
        <li>Video hosting is both expensive and difficult to do well.</li>
        <li>
          Vimeo and Youtube have embeddable video players that load far quicker
          than any video I could embed on the site.
        </li>
        <li>
          Using the APIs mean the user only needs to control which category the
          Video appears in on the site on Vimeo / Youtube without needing to
          remember logins and tricks on ticktockfilms.
        </li>
      </ul>
      <h2>Animation - Portfolio Preview</h2>
      <img
        alt="Tick Tock Films - Work Preview"
        src="http://darraghmckay.com/couch/uploads/image/tick.gif"
      />
      <h2>Technologies</h2>
      <ul>
        <li>
          The site is built on customized Bootsrate V3, using my own SASS/CSS3
          and HTML5.
        </li>
        <li>
          It uses the PHP Vimeo and Youtube APIs to pull videos from both
          sources and merge them into the one display.
        </li>
      </ul>
    </div>
  ),
};
