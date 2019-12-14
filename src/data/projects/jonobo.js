import React from 'react';
import { APP_DEVELOPMENT } from '../../constants/blogCategories';

export default {
  title: 'Jonobo',
  subTitle: 'Your personalised drinking game',
  href: 'https://jonobo.darraghmckay.com/',
  path: 'jonobo',
  createdAt: '2019-02-10',
  img:
    'https://darraghmckay.com:443/couch/uploads/image/jonobo-portfolio-cover-1.png',
  coverImg: 'https://darraghmckay.com:443/couch/uploads/image/cover.png',
  category: APP_DEVELOPMENT,
  color: '#6d57ea',
  downloadLink:
    'https://play.google.com/store/apps/details?id=com.darraghmckay.jonobo',
  body: () => (
    <div>
      <p>Looking for a new way to liven up a party or predrinks?</p>
      <p>
        Add each player's name and Jonobo will look after you for the rest of
        the night.
      </p>
      <p>
        As a group, follow the cards, no matter how spicy they get! A
        combination of all your usual drinking games, including truth or drink,
        dare or drink, spin the bottle, higher or lower, most likely to...,
        never have I ever and much more. Except Jonobo is in control.
      </p>
      <p>
        Jonobo will add a bit of spice to your night/pregame, however hot you're
        feeling. We've got three fun levels, Jalape&ntilde;o, Habanero, and
        Ghost. So, whether you're in a bar, home drinking with friends, or
        getting ready for a big night on the town, this game is the perfect
        addition to your evening.
      </p>
      <img src="https://darraghmckay.com:443/couch/uploads/image/appwrap-template-201810062311273.png" />
      <p>
        Forget learning the rules to something new and the same old classic
        games, Jonobo is all you need. You just need to bring the drinks.
      </p>
      <p>
        Available on Android for now, written in react native using
        SQLitestorage and integrated with Google in-app purchases. Coming soon
        to iOS
      </p>
    </div>
  ),
};
