import React from 'react';
import { WEB_DEVELOPMENT } from '../../constants/blogCategories';
import img from './imgs/spotify-albums.jpg';
import coverImg from './imgs/spotify-albums-cover.png';

export default {
  title: 'Spotify Albums',
  subTitle: 'Restoring the functionality of the Spotify Album Library',
  path: 'spotify-albums',
  href: 'https://albums.darraghmckay.com',
  img,
  coverImg,
  color: '#1DB954',
  createdAt: '2019-07-20',
  body: '',
  category: WEB_DEVELOPMENT,
  sourceCode: 'https://github.com/darraghmckay/spotify-all-albums',
  body: () => (
    <div>
      <h3>
        Spotify albums is an open source Album aggregator/player that I built in
        a single evening.
      </h3>
      <h4>Why</h4>
      <p>
        Spotify's Album page used to include albums that you had explicitely
        liked
        <strong>and albums that you had liked a song from</strong>.
        <br />
        At some point around July 2019 they removed the later part of the
        functionality, showing you only albums that you had explicitely liked.
        <br />
        I don't personally use the &quot;Albums&quot; page, however, it did mean
        that I only had about 6 albums in it.. whereas before I had several
        hundred.
        <br />
        So I didn't build this for me...I built it for my roomate who
        <strong>loved</strong>the album page. He lived in it. And while he did
        save albums, his library halved over night.
      </p>
      <h4>What</h4>
      <p>
        If you login with spotify, It fetches all of your albums, and all of
        your saved songs. It then gets the unique set of albums from these two
        data sources, and orders them by most recently added.
        <br />
        I.e, if you liked a song from an album in 2018, and then another song
        from that album in 2019, it would come back up to the top of the list
        (as it did before Spotify ruined it)
      </p>
      <img
        alt="Spotify Albums screenshot"
        src="https://darraghmckay.com:443/couch/uploads/image/screenshot-2019-11-12-at-16-09-42.png"
      />
      <h4>What's next</h4>
      <p>Probably nothing...</p>
      <p>
        I could have added the same functionality to Artists, pretty easily.
        <br />
        I could have added custom sorting, searching.. etc
        <br />
        But honestly, I set myself the challenge of building this on my couch in
        a single afternoon. And I did.
        <br />
        Feel free to PR it and update it if you have features you'd like to
        contribute
      </p>
    </div>
  ),
};
