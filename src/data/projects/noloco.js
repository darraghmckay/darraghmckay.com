import React from 'react';
import { WEB_DEVELOPMENT } from '../../constants/blogCategories';
import img from '../../imgs/noloco.png';
import coverImg from '../../imgs/noloco-cover.png';

export default {
  title: 'Noloco',
  subTitle: 'Build internal tools for your team without code',
  path: 'noloco',
  href: 'https://noloco.io',
  img,
  coverImg,
  color: '#1e293b',
  createdAt: '2021-01-01',
  category: WEB_DEVELOPMENT,
  body: () => (
    <div>
      <h3>
        <em>
          Easily create internal tools in minutes that perfectly fit your
          workflows without writing a line of code..
        </em>
      </h3>
      <p>
        Noloco provides everything your team needs to build internal tools.
        There's no code and no problem.
        <br />
      </p>
      <h4>Instant apps from your data</h4>
      <p>
        Once you connect your data source like Airtable, PostgreSQL, MySQL or
        Google Sheets, Noloco instantly builds an app for you that enables your
        team to easily view, update and add new data.
      </p>
      <p>
        From there, you can easily customise your app with our drag and drop
        editor without writing a line of code.
      </p>

      <h4>For non-developers</h4>
      <p>
        Noloco is the first no-code builder designed from the ground up for
        non-developers. No writing complex queries.
      </p>
      <p>
        Free up your engineering resources and move faster by enabling your
        Operations, Growth & Support teams to build the tools they need on their
        own.
      </p>

      <h4>What can I build with Noloco?</h4>
      <p>
        Our customers have built hundreds of internal tools with Noloco
        including backoffice tools, project management tools & custom CRMS. All
        without writing a single line of code.
      </p>

      <h4>Create internal tools from your data</h4>
      <p>
        Instantly build internal tools from your data in Postgres, Airtable and
        Google Sheets. Use our Zapier and Make integrations to send data between
        Noloco and all your other software tools.
      </p>
      <h4>Why use Noloco?</h4>
      <p>
        Noloco is a fit if you want to:
        <ul>
          <li>
            Give your team access to data for them to analyse, view or update{' '}
          </li>
          <li>
            Keep tight control over user access and who can see and update
            certain data
          </li>
          <li>
            Build internal tools without having to hire developers or distract
            your developers from building customer-facing products
          </li>
        </ul>
      </p>
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
