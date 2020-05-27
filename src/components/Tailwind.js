import React, { useEffect, useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import DIR from 'isomer-route/src/directions';
import { Point } from 'isomer';
import BlogPage from '../containers/Blog';
import IsometricRoute from './IsometricRoute';
import DeskHeader from './DeskHeader';

const Tailwind = () => {
  const [rotation, setRotation] = useState(0);
  const [nextRotation, setNextRotation] = useState(0);

  useEffect(() => {
    const rotationDelta = nextRotation - rotation;
    if (Math.abs(rotationDelta) > 0.015) {
      setRotation(
        currentRotation => currentRotation + Math.PI * 0.05 * rotationDelta,
      );
    } else if (rotationDelta !== 0) {
      setRotation(nextRotation);
    }
  }, [nextRotation, rotation]);

  const tailwindPost = {
    title: 'Tailwind UI',
    createdAt: '2020-05-26',
    body: () => (
      <div className="tailwind">
        <h4>Why me</h4>
        <p>
          I'm a full stack software developer, with a preference for the
          frontend, a passion for product development and attention to detail. I
          have 8+ years of experience building full stack websites, webapps and
          mobile apps both professionally and in my spare time. I'm a fast
          learner and a motivated worker with a keen interest in all things
          technology, design and frontend.
        </p>
        <p>
          In my spare time, more than anything else, I love to build things. I
          pride myself as a frontend engineer who tries to produce nice-looking
          and nice-to-use things. I certainly wouldn’t call myself a designer
          but I try my best. Most importantly, I can spot when something doesn't
          look right.
        </p>
        <p>
          Reading through the job description, you described some of the most
          exciting projects I could think of, projects which would influence the
          entire developer community. As a full-stack developer, very
          experienced in React and working with Vue every day, I think I would
          be the perfect fit to help you release official React and Vue
          libraries, or adding support for multiple themes. While I often brand
          myself as a frontend developer, I’m not afraid of backend work, in
          fact, it’s a large part of my day job at Inscribe. And, while it has
          been a while, I can trace back my backend roots to PHP. I even worked
          with Laravel before, although these days I mostly use Django or Node
          (express) as my go-to backend frameworks.
        </p>
        <p>
          I am very product-driven, and entrepreneurial by nature, with various
          startup experience already under my belt. I like to be more than just
          a developer (where possible) and actively contribute to the direction
          of the product.
        </p>
        <p>
          Tailwind CSS, Tailwind UI and Refactoring UI really excite me, because
          it’s the first time a practical, easy to understand and beautiful
          guide has been produced, which not only identifies areas you can
          improve to create beautiful UIs but gives you the tools to so.
        </p>
        <div className="my-8 flex flex-col">
          <DeskHeader />
          <small className="text-center w-full block mt-2">
            A meta self-portrait that I use as the header of my website, built
            using only CSS and primitave HTML elements
          </small>
        </div>
        <h4>More about me</h4>
        <p>
          I’m currently the lead frontend engineer at
          <a href="https://inscribe.ai/" target="_blank">
            Inscribe
          </a>
          , a small startup of only 9 people spread across Dublin and San
          Fransico. In my short 4 months at Inscribe, I have lead the redesign
          of the primary pages in the product (in Vue), developed UI components
          to make the app interface more consistent and moved our frontend
          project out of a Django/Docker deployment and onto a Cloudfront backed
          CDN with
          <a
            href="https://www.netlify.com/blog/2016/07/20/introducing-deploy-previews-in-netlify/"
            target="_blank"
          >
            Netlify-like deploy previews
          </a>
          .
        </p>
        <p>
          Prior to Inscribe, I was at
          <a
            href="https://www.hubspot.com/products/service/customer-feedback"
            target="_blank"
          >
            HubSpot on the <em>Feedback</em> team
          </a>
          for almost two years, where I worked almost exclusively in React
          developing a rather complicated feedback survey editor and response
          management system.
        </p>
        <p>In my spare time, I have used Tailwind CSS to;</p>
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
        <p>As well as;</p>
        <ul>
          <li>
            <HashLink to="/blog/isometric-illusions#top">isomer-route</HashLink>
            - a JavaScript canvas-backed isometric drawing tool (primarily for
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
        <p>
          I really enjoy making things, and particularly appreciate tools that
          make that easier.
        </p>
        <div
          onMouseOver={() => setNextRotation(nextRotation + Math.PI / 2)}
          onMouseOut={() => setNextRotation(0)}
        >
          <IsometricRoute
            height={200}
            width={300}
            drawRoute={route => {
              route
                .setRotation(rotation)
                .setGridSize(6)
                .addColumn(3, DIR.UP, block => block.addEndExtrusion())
                .setOrigin(Point(1, 0, 0))
                .addTrack(5, DIR.X)
                .addTrack(6, DIR.Y)
                .addColumn(3, DIR.DOWN, block => block.addStartExtrusion())
                .draw();
            }}
          />
        </div>
        <small className="text-center w-full block mb-8">
          A Penrose triangle made with
          <HashLink className="ml-1" to="/projects/isomer-route#top">
            isomer-route
          </HashLink>
        </small>
        <h4>The future at Tailwind UI</h4>
        <p>
          I think Tailwind UI and its associated projects could dramatically
          change how developers write code, and how designers design, even more
          than they have already. I would love nothing more than to be a part of
          that future. I really like the idea of shaping the web development
          landscape and working alongside your great team. I would like to
          contribute, as much as possible to the open-source projects. I would
          like to start creating more content (something I’ve started doing
          myself recently) and learn a lot more about design and Tailwind.
        </p>
        <h4>What I'm excited about</h4>
        <p>
          It seems like in the last few years a lot of time and effort has gone
          into the development of open-source tools to make working on the
          frontend and developing beautiful interfaces possible. For me, my
          first experience with a design system was Google’s Material UI. Like
          it or not, it was (and is) very comprehensive and the resulting UI
          libraries made it easy for people to create consistent and familiar
          user interfaces with ease. Since then the open-source community and
          the web development community as a whole have been iterating and
          improving, and more design systems have been open-sourced, along with
          their associated component libraries.
        </p>
        <p>
          I’ve spent a large portion of my professional career at HubSpot, a
          company who takes a huge amount of pride in its design and user
          experience. Where I always had the pleasure of having a dedicated
          designer on my team. It was here that made me realise the true value
          of designers. It was also where I first realised the huge value in CSS
          utility classes and an extensive UI library of components. I realised
          that equipped with a UI library such as
          <a href="https://canvas.hubspot.com/" target="_blank">
            HubSpot's Canvas
          </a>
          and a scattering of CSS utilities, you can quickly create the
          complicated designs that the designer produce, allowing you to focus
          on building functionality because these tools enable you to speak the
          same language.
        </p>
        <p>
          However, most teams, and in particular most solo-devs (like me in my
          spare time) don’t have the budget for dedicated designers, let alone a
          whole UI team to develop a design system and corresponding React
          components. But the tools you’re building at Tailwind UI, empower
          developers to avoid simple mistakes and stick to good design patterns
          through a thorough, well-designed API.
        </p>
        <p>
          This trend truly excites me, because it allows us makers to iterate
          faster, be more consistent and build more complicated applications
          while producing usable interfaces. This is a trend that I think
          Tailwind UI is accelerating and pushing, and something I would love to
          be a part of it.
        </p>
        <h4>My bet about the future</h4>
        <p>
          Just as it became cheaper and easier to create custom
          landing/marketing pages with website builders such as Wix, Webflow and
          Squarespace, I believe no-code/low-code tools such as Bubble, Adalo
          and more will lower the barrier to entry for people who want to
          quickly build web apps, that provide value. Just as these tools
          replaced a lot of custom templates due to their nicer, more modern
          designs, I believe there’s a space for a web app builder which
          produces foolproof, easy to build interfaces no matter what level of
          expertise or skill. I see tools like Tailwind and Refactoring UI
          massively contributing to this space.
        </p>
        <h4>What I would love to build</h4>
        <p>
          I’m sure this is the direction that you’re moving in, but building a
          design system as a service would be hugely impactful if done right,
          and I’ve no doubt that this would be the best team to build it, a team
          I would love to be a part of. Generating Sketch/Figma components for
          the designer and matching Vue/React components for the developer,
          based on the theme, font pairings and more. All tailored to the style
          of the project, consistent, beautiful and ready to build.
        </p>
        <br />
        <p>
          I hope you have found this interesting. If you want to learn more
          about me, checkout my
          <a
            href="https://drive.google.com/file/d/0B4fJA5v2VjGfX09RODJjNUw5Ync/view?usp=sharing"
            target="_blank"
          >
            CV
          </a>
          or the rest of <HashLink to="/projects#top">my projects</HashLink>. As
          I've mentioned above, Tailwind and the work you are doing really excit
          me and I would love nothing more than to be a part of that.
        </p>
      </div>
    ),
  };
  return <BlogPage blog={tailwindPost} />;
};

export default Tailwind;
