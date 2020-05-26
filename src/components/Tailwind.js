import React from 'react';
import { HashLink } from 'react-router-hash-link';
import DIR from 'isomer-route/src/directions';
import { Point } from 'isomer';
import BlogPage from '../containers/Blog';
import IsometricRoute from './IsometricRoute';

const tailwindPost = {
  title: 'Tailwind UI',
  createdAt: '2020-05-26',
  body: () => (
    <div>
      <h4>Why me</h4>
      <p className="mb-4">
        In my spare time, I love to build things, like a lot of developer and, I
        pride myself as a frontend engineer who tries to produce nice-looking
        and nice-to-use things. I certainly wouldn’t call myself a designer but
        I try my best. More importantly, I can spot when something doesn't look
        right.
      </p>
      <p className="mb-4">
        Reading through the job description, you described some of the most
        exciting projects I could think of, projects which would influence the
        entire developer community. As a full-stack developer, very experienced
        in React and working with Vue every day, I think I would be the perfect
        fit for helping you release official React and Vue libraries, or adding
        support for multiple themes. While I sometimes brand myself as a
        frontend developer, I’m also more than capable of doing backend work, in
        fact, it’s a large part of my day job at Inscribe. And, while it has
        been a while, I can trace back my backend roots to PHP. I even worked
        with Laravel before, although these days I mostly use Django or Node
        (express) as my go-to backend frameworks.
      </p>
      <p className="mb-4">
        Finally, I am very product-driven, and entrepreneurial, with various
        startup experience already under my belt. I like to be more than just a
        developer (where possible) and actively contribute to the direction of
        the product.
      </p>
      <p className="mb-4">
        Tailwind CSS, Tailwind UI and Refactoring UI really excite me, because
        it’s the first time a practical, easy to understand and beautiful guide
        has been produced, which not only identifies areas you can improve to
        create beautiful UIs but gives you the tools to do it.
      </p>
      <h4>More about me</h4>
      <p className="mb-4">
        I’m currently the lead frontend engineer at Inscribe, a small startup of
        only 9 people spread across Dublin, Ireland and San Fransico. In my
        short 4 months at Inscribe, I have lead the redesign of the primary
        pages in the app (in Vue), developed UI components to make the app
        interface more consistent and moved our frontend project out of a
        Django/Docker deployment and onto a Cloudfront backed CDN with Netlify
        like deploy previews.
      </p>
      <p className="mb-4">
        Prior to Inscribe, I was at HubSpot on the Feedback team for almost two
        years, where I worked almost exclusively in React developing a rather
        complicated feedback survey editor and response management system.
      </p>
      <p className="mb-4">
        In my spare time, I have used Tailwind CSS to;
        <ul>
          <li>
            redesign and open-source my own
            <a
              href="https://github.com/darraghmckay/darraghmckay.com"
              target="_blank"
            >
              website
            </a>
            (this) with React
          </li>
          <li>
            build
            <a href="https://mailcrate.io" target="_blank">
              mailcrate.io
            </a>
            - a
            <a href="https://www.google.com/inbox/?hl=en-GB" target="blank">
              Google Inbox
            </a>
            replacement which uses the Gmail API to replicate as many of the
            features provided by Inbox as possible
          </li>
        </ul>
        As well as;
        <ul>
          <li>
            <HashLink to="/blog/isometric-illusions#top">isomer-route</HashLink>
            , a Javascript canvas-backed isometric drawing tool (primarily for
            creating illusions)
          </li>
          <li>
            An animated
            <a href="https://tessa.darraghmckay.com" target="_blank">
              birthday present
            </a>
            for a friend using only HTML and CSS (and some JS for a Spotify
            integration)
          </li>
          <li>
            <HashLink to="/projects/spotify-albums#top">
              Spotify Albums
            </HashLink>
            - A simple app that restores the functionality of the Spotify album
            library
          </li>
          <li>
            <HashLink to="/projects#top">other projects</HashLink>
            and some
            <a href="https://github.com/darraghmckay/" target="_blank">
              open-source projects
            </a>
          </li>
        </ul>
      </p>
      <p className="mb-4">
        I really enjoy making things, and particularly appreciate tools that
        make that easier.
      </p>
      <IsometricRoute
        height={200}
        width={300}
        drawRoute={route => {
          route
            .setGridSize(6)
            .addColumn(3, DIR.UP, block => block.addEndExtrusion())
            .setOrigin(Point(1, 0, 0))
            .addTrack(5, DIR.X)
            .addTrack(6, DIR.Y)
            .addColumn(3, DIR.DOWN, block => block.addStartExtrusion())
            .draw();
        }}
      />
      <small className="text-center w-full block mb-8">
        A Penrose triangle made with
        <HashLink className="ml-1" to="/projects/isomer-route#top">
          isomer-route
        </HashLink>
      </small>
      <h4>The future at Tailwind UI</h4>
      <p className="mb-4">
        I think Tailwind UI and its associated projects could dramatically
        change how developers write code, and how designers design, even more
        than they have already. I would love nothing more than to be a part of
        that future. I really like the idea of shaping the web development
        landscape and working alongside your great team. I’d like to contribute,
        as much as possible to the open-source projects. I would like to start
        creating more content (something I’ve started doing myself recently) and
        learn a lot more about design and Tailwind.
      </p>
      <h4>What I'm excited about</h4>
      <p className="mb-4">
        It seems like in the last few years a lot of time and effort has gone
        into the development of open-source tools to make working on the
        frontend and developing beautiful interfaces possible. For me, my first
        experience with a design system was Google’s Material UI. Like it or
        not, it was comprehensive and the resulting UI libraries made it easy
        for people to create consistent, familiar, user interfaces with ease.
        Since then the open-source community and the web development community
        as a whole has been iterating and improving, and more and more design
        systems have been open-sourced, with their associated component
        libraries.
      </p>
      <p className="mb-4">
        I’ve spent a large portion of my professional career at HubSpot, a
        company who takes a huge amount of pride in its design and user
        experience. Where I always had the pleasure of having a dedicated
        designer on my team. It was here that made me realise the true value of
        designers. It was also where I first realised the huge value in CSS
        utility classes and an extensive UI library of components. I realised
        that equipped with a UI library such as{' '}
        <a href="https://canvas.hubspot.com/" target="_blank">
          HubSpot's Canvas
        </a>
        and a scattering of CSS utilities, you can quickly create the
        complicated designs that the designer produce, allowing you to focus on
        building functionality because these tools enable you to speak the same
        language.
      </p>
      <p className="mb-4">
        However, most teams, and in particular most solo-devs (like me in my
        spare time) don’t have the budget for dedicated designers, let alone a
        whole UI team to develop a design system and corresponding React
        components. But the tools you’re building at Tailwind UI, empower
        developers to avoid simple mistakes and stick to good design patterns
        through a thorough, well-designed API.
      </p>
      <p className="mb-4">
        This trend truly excites me, because it allows us makers to iterate
        faster, be more consistent and build more complicated applications while
        producing usable interfaces. This is a trend that I think Tailwind UI is
        accelerating and pushing, and something I would love to be a part of it.
      </p>
    </div>
  ),
};

const Tailwind = () => <BlogPage blog={tailwindPost} />;

export default Tailwind;
