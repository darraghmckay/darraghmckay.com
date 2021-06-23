import React from 'react';
import { WEB_DEVELOPMENT } from '../../constants/blogCategories';
import img from '../../imgs/noloco.png';
import coverImg from '../../imgs/noloco-cover.png';

export default {
  title: 'noloco.io',
  subTitle: 'Build truly custom web apps.\n' +
    'Without Code.',
  path: 'noloco',
  href: 'https://noloco.io',
  img,
  coverImg,
  color: '#111826',
  createdAt: '2021-01-01',
  category: WEB_DEVELOPMENT,
  body: () => (
    <div>
      <h3>
        <em>
          The complete no-code solution for professionals.
        </em>
      </h3>
      <p>
        Developing a web app is hard - but it doesn’t have to be.
        <br />
        Noloco looks after all the boring parts like authentication and API creation so that you can focus on what matters most - making your project unique.
      </p>
      <h4>Your data, your way</h4>
      <p>Model your data however you want. Easily add collections and define relationships between them all on our built-in database. Import your data or start from scratch with dedicated client CMS functionality.</p>

      <h4>Dream it, design it</h4>
      <p>You're in full control of your design. Start from scratch or drag in ready-made blocks. With our responsive builder, you can ensure that your app is pixel perfect across all screen sizes.</p>

      <h4>Supercharge your app with actions & automations</h4>
      <p>Allow your users to trigger complex workflows that can create and update data, hit external APIs, send emails or trigger third-party automations like Zapier or Integromat.</p>

      <h4>Deploy your app in one click</h4>
      <p>Your apps are hosted on the Noloco cloud. Preview changes in your personal sandbox before launching. And when you’re ready to go, connect your custom domain to showcase your project.</p>

      <br />
      <a
        className="button"
        href="https://noloco.io?ref=darraghmckay"
        target="_blank"
        rel="noopener noreferrer"
      >
        Start building
      </a>
    </div>
  ),
};
