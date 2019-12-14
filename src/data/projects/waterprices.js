import React from 'react';
import { WEB_DEVELOPMENT } from '../../constants/blogCategories';

export default {
  title: 'Waterprices.ie',
  subTitle: 'Water Charges Calculator Web App',
  path: 'waterprices',
  createdAt: '2015-11-23',
  img: 'https://darraghmckay.com:443/couch/uploads/image/waterprices.jpg',
  coverImg:
    'https://darraghmckay.com:443/couch/uploads/image/water_full-2.png',
  category: WEB_DEVELOPMENT,
  color: '#E91E63',
  body: () => (
    <div>
      <h2>The Idea</h2>
      <p>
        Waterprices.ie was a quick project I worked on at the end of 2014,
        around the time the Water Charges were being introduced in Ireland
        (which have since been postponed, which resulted in waterprices.ie being
        more or less redundant)
      </p>
      <p>
        The idea was to create a calculator based on average consumption levels
        of certain apliances so the Irish people could get a good estimate on
        how much the water charges were going to cost them on a monthly basis.
      </p>
      <h3>How it works</h3>
      <p>It was made to be simple, and work across all devices.</p>
      <ol>
        <li>Select an appliance from the side-list</li>
        <li>Set the quantity / usage of that appliance</li>
        <li>Repeat for all the appliances which are used daily</li>
      </ol>
      <p>
        Then you can toggle between Daily cost, monthly cost, annual cost (and
        consumption in litres).
      </p>
      <p>You can even share your result to twitter.</p>
      <h3>Why?</h3>
      <p>
        The Water Charges being introduced in Ireland were a subject of national
        debate. A hugely contraversial topic. Contreversey aside, the charges
        were being introduced and most people had no idea how much it would
        actually cost them.
      </p>
      <h3>Result</h3>
      <p>
        The simple web app got decent feedback and even picked up close to 1000
        unique hits in its first weekend. Some people were shocked at how little
        it was going to cost them, others were shocked at how much.
      </p>
      <img src="http://darraghmckay.com/couch/uploads/image/water_screen.PNG" />
      <h3>How its built</h3>
      <p>
        The actual calculator is built in Javascript, using session storage. The
        rest of the site is built using a responsive CSS framework and HTML5.
      </p>
      <p>And most of the graphics were designed by me in photoshop.</p>
      <h3>Challenges</h3>
      <p>
        The most challenging part of building this web app was to maintain
        functionality across Dektop, Tablets and Mobile. Mobile was particularly
        difficult as I needed a way to display the 'usage' as well as the unit
        cost and total cost. Although in the end I figured it out.
      </p>
      <img
        alt="Responsive Examples of Waterprices.ie"
        className="noshadow"
        src="http://darraghmckay.com/couch/uploads/image/responsive_water_prices.jpg"
      />
    </div>
  ),
};
