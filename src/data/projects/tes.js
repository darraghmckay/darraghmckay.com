import React from 'react';
import { WEB_DEVELOPMENT } from '../../constants/blogCategories';

export default {
  title: 'Trinity Entrepreneurial Society',
  subTitle: 'Wordpress Website for the Society',
  href: 'http://testrinity.com',
  path: 'trinty-entrepreneurial-society',
  createdAt: '2015-11-23',
  img: 'https://darraghmckay.com:443/couch/uploads/image/tes_logo-1.jpg',
  coverImg: 'https://darraghmckay.com:443/couch/uploads/image/tes_full.png',
  category: WEB_DEVELOPMENT,
  color: '#104470',
  body: () => (
    <div>
      <p>
        I was elected <em>'Web Designer'</em>for Trinity's Entrepreneurial
        Society at the end of the 2015 College year (June).
        <br />
        This was different from most of my other work in the sense that I didn't
        have to build and design a website from scratch.
        <strong>It was already done!!</strong>.<br />
        <br />
        That said, it brought on a whole bunch of new experiences for me.
      </p>
      <ul>
        <li>
          It is hosten on Amazon's AWS. This was my first time using AWS,
          SSH'ing, Virtual Hosts etc..
        </li>
        <li>
          It was my first time collaborating<strong>properly</strong>
          on a site using VCS such as Git.
        </li>
        <li>
          It was the first site I'd taken over, thankfully I was the more
          experienced developer in this situation and I brought a lot to the
          table, but I'd never dealt with '<em>cleaning up'</em>
          before.
        </li>
      </ul>
      <h3>If it was already designed and developed what did I do?</h3>
      <p>
        Well it may have been a working website but there was a lot I improved
        upon.
      </p>
      <ul>
        <li>
          Firstly, I converted the site to use
          <em>'pretty urls'</em>
          <ul>
            <li>
              So <em>testrinity.com/events.html</em> becomes
              <em>testrinity.com/events</em>
            </li>
          </ul>
        </li>
        <li>
          I integrated it with Wordpress so regular committee members could
          create pages from the template page.
        </li>
        <li>
          I setup and styled the Wordpress Blog, so committee members could
          blog.
        </li>
        <li>
          I redesigned the Events page and made it dynamic so that the events
          are automatically pulled in from the TES Facebook page (so I didn't
          have to manually update it every week).
        </li>
        <li>
          I redesigned the 'Committee' page, converted it to a modern
          <em>'card style'</em>with on-hover events displaying a bio and a
          LinkedIn link.
        </li>
        <li>And many more minor UI changes.</li>
      </ul>
    </div>
  ),
};
