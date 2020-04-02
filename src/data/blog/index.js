import React from 'react';
import dinoRunImage from '../../imgs/dino-run.jpg';
import oneProgrammeImage from '../../imgs/one-prog.jpg';
import waterPricesImage from '../../imgs/waterprices.jpg';
import mapImage from '../../imgs/map.jpg';
import Permutohedron from './Permutohedron';
import RektText from './RektText';

import * as BlogCategories from '../../constants/blogCategories';

export default [
  {
    title: 'Permutohedron',
    path: 'permutohedron',
    createdAt: '2020-04-02',
    category: BlogCategories.VISUALISATION,
    body: Permutohedron,
    fullWidth: true,
  },
  {
    title: 'Rect Text',
    path: 'rect-text',
    createdAt: '2020-03-08',
    category: BlogCategories.WEB_DESIGN,
    body: RektText,
  },
  {
    title: 'The (Q-Learning) T-Rex',
    path: 'the-q-learning-t-rex',
    createdAt: '2016-01-27',
    category: BlogCategories.WEB_DEVELOPMENT,

    body: () => (
      <React.Fragment>
        <img alt="Q-Learning T-Rex From Chrome Browser" src={dinoRunImage} />

        <p>
          After messing around with some Q-Learning stuff during the summer, and
          developing the{' '}
          <a href="https://github.com/darraghmckay/qlearner.js">qlearner.js</a>{' '}
          library, I've wanted to make some pre-existing game learn. Recently it
          dawned on me that I could extract the 'This webpage is not available'
          page on Google Chrome, which includes a hidden T-Rex running / jumping
          game, that you simply start / play by pressing on the spacebar, and
          make the little T-Rex (whom I've nicknamed Dino) to learn how to avoid
          the cakti (plural for cactus).
        </p>

        <p>
          It was a lot of fun doing it actually. And although it's far from
          perfect, and the qlearner.js library probably isn't the best library
          to use in this sitation,<strong>it still works!!</strong>Addmitedly,
          it takes a really really really long time to make much progress.
        </p>

        <h3>Demo</h3>

        <p>
          Head over to the{' '}
          <a href="http://darraghmckay.github.io/Learning-TRex/">Github Page</a>{' '}
          to see the demo
        </p>

        <p>
          And to see the source code, checkout the{' '}
          <a href="https://github.com/darraghmckay/Learning-TRex">
            Github Repo
          </a>
        </p>
      </React.Fragment>
    ),
  },

  {
    title: 'Facebook Page Photo Gallery Using Facebook API',
    path: 'facebook-photo-gallery',
    createdAt: '2016-01-11',
    category: BlogCategories.WEB_DEVELOPMENT,

    body: () => (
      <React.Fragment>
        <p>
          If you want to build use Facebook's Open Graph API to build a Photo
          Gallery for a page (any public page, you don't even have to manage
          it), then follow these steps.
        </p>

        <p>
          See the working{' '}
          <a href="https://darraghmckay.com/projects/fb-gallery/">
            example / demo
          </a>
        </p>

        <p>
          Download the{' '}
          <a href="https://github.com/darraghmckay/facebook-photo-gallery">
            Source Code
          </a>
        </p>

        <h3>
          <strong>Why?</strong>
        </h3>

        <p>
          I was in the process of changing my hosting from Hostagators Shared
          Hosting to Digital Ocean's VPS. As I was transferring over the files I
          realised I'd need to transfer all of the photos one of my clients
          uploaded to the server, over to the new server. This was bad, because
          there was over 10GB of photos, which I hadn't compressed properly, and
          that would have eaten up over half of my 20GB SSD with Digital Ocean.
          Of course there were / are other solutions but I decided this one was
          the best for the following reaons
        </p>

        <ul>
          <li>
            Hosting Images is eventually going to be expensive when you're
            uploading hundreds weekly
          </li>
          <li>
            The Gallery system on the existing site was SLOW and mostly broken,
            so it needed to be re-done anyway.
          </li>
          <li>
            My client was uploading his photos to Facebook anyway, and they have
            a much nicer interface than I could ever have written.
          </li>
        </ul>

        <p>So that's the why, let's get down to the how.</p>

        <h3>
          <strong>How?</strong>
        </h3>

        <ul>
          <li>
            Using just a Facebook (FB) page id, you can get a JSON formatted
            result of all the albums a page has publicly listed (
            <a
              href="https://developers.facebook.com/docs/graph-api/reference/page/albums/"
              target="_blank"
            >
              more
            </a>
            )
          </li>
          <li>
            From there you can get the Album Name, the Cover Photo and (
            <a href="https://developers.facebook.com/docs/graph-api/reference/album/">
              more
            </a>
            )
          </li>
          <li>
            From there you can get high-res and low-res copies of each image in
            thre album (
            <a href="https://developers.facebook.com/docs/graph-api/reference/photo/">
              more
            </a>
            )
          </li>
        </ul>

        <p>
          To get started, create a new text file{' '}
          <span className="code variable">index.php</span>
        </p>

        <p>
          We are going to be loading the albums dynamically with an AJAX request
          so make a Javascript Function <sub>getAlbums()</sub>
        </p>

        <code>
          {`
    <script type="text/javascript"></p>
      // Makes An AJAX Request On Load which retrieves the albums
      function getAlbums() {
        $.ajax({
          type: 'post',
          url: 'scripts/loadGallery.php',
          data: {
              
          },
          success: function( data ) {
          //Hide The Spinner
            document.getElementById("spinner").style.display = "none";
            //Put the Data in the Div
            document.getElementById("galleryDiv").innerHTML = data;
          }
        });
      }
    </script>`}
        </code>

        <p>
          Then in the opening<sub>body</sub>tag, call<sub>getAlbums</sub>on load
        </p>

        <p>
          <sub>{`<body onload="getAlbums(')">`}</sub>
        </p>

        <p>
          Create a new file called<sub>loadGallery.php</sub>in the
          <sub>scripts/</sub>directory.
        </p>

        <p>In this file you need to 4 do things</p>

        <ol>
          <li>Include your FB App Details (I'll cover this in a minute)</li>
          <li>
            Create a function to make the Facebook <sub>GET</sub>request
          </li>
          <li>Get the Albums for the given Page</li>
          <li>Process thos Albums and Get Their Cover Photos</li>
        </ol>

        <hr />

        <p>
          Create a new text file called<sub>config.txt</sub>in that file include
          the following
        </p>

        <code>
          {`
    <?php
      $fb_page_id = "##############";
      $access_token = "#############|#######################";</p>

      <p> $albums_per_page = 12;
      $pics_per_page = 16;</p>

      <p> $show_all = FALSE;  //Set to TRUE to show Timelime Photos, Cover Photos & Profile Pictures
    ?>
  `}
        </code>

        <p>As I said above, we'll find and fill in these details later.</p>

        <p>
          Next, go back to<sub>loadGallery.php</sub>and incude that
          configuration file as follows:
        </p>

        <code>
          {`
    <?php 
      include('../config.txt');</p>

      ...
  `}
        </code>

        <p>
          Include a function called<sub>curl_get_contents($url)</sub>which will
          return the content of any url we pass into it.
        </p>

        <code>
          {`
    <?php 
			include('../config.txt');</p>

			function curl_get_contents($url) {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        $data = curl_exec($ch);
        curl_close($ch);
        return $data;
      }
      ...
  `}
        </code>

        <p>
          Next, we need to outline the fields which we want the FB API to return
        </p>

        <code>
          {`
    $fields = "id,count,cover_photo,created_time,description,link,name";
  `}
        </code>

        <p>And the link which will return the albums</p>

        <code>
          {`
              $json_link = "https://graph.facebook.com/{$fb_page_id}/albums/?access_token={$access_token};
            `}
        </code>
        <p>
          Now, get the returned data, decode it, and loop through each album
        </p>

        <code>
          {`
              $json = json_decode(curl_get_contents($json_link));
			        $count = 0;
			        for($i=1; $i<= sizeof($json->data) ; $i++):
                $album = $json->data[$i-1];
                //var_dump($album);
                if(isset($album->cover_photo) && (($album->name != "Cover Photos" && $album->name != "Profile Pictures" && $album->name != "Timeline Photos" ) || $show_all)):</p>

                $fields="id,height,images,width,link,name,picture";
                $album_link = "https://graph.facebook.com/{$album->cover_photo->id}/?access_token={$access_token}&fields={$fields}";
                $album_json = json_decode(curl_get_contents($album_link));
                //var_dump($album_json);
                if(isset($album_json->images[3]->source)){
                  $cover_ind = 3;
                  $cover = $album_json->images[$cover_ind]->source;
                }
                else {
                  $cover_ind = 0;
                  $cover = $album_json->images[0]->source;
                }
                  if($album_json->images[$cover_ind]->height < $album_json->images[$cover_ind]->width){
                  $orientation = "landscape";
                  }
                  else{
                  $orientation = "portrait";
                  }
                $count++;
              ?>

                <div className="col-sm-5 col-sm-offset-1 col-md-offset-0 col-md-3 album-cover">
                  <div className="portfolio-item">
                    <a href="album.php?id=<?php echo $album->id ?>">
                      <img className="img-responsive <?php echo $orientation;?>" src="<?php echo $cover; ?>" alt="<?php echo $album->name; ?>">      
                    </a>
                  </div>
                  <div className="img-label"><?php echo $album->name; ?></div>
                </div>
                <?php if($count%4 == 0) : ?>
                  </div>
                  <div className="row">
                <?php endif;?>
              <?php endif;?>
            <?php endfor; ?>
          </div> <!-- End of Row -->
          `}
        </code>

        <p>
          This will output all of the Album images and their titles, in a
          Bootstrap-ready layout.
        </p>

        <p>
          <span>
            Clicking on Any of the Album Covers should bring you to a new page
            called <sub>album.php</sub>so go ahead and create that new file,
            it's very similar to the previous steps so I won't repeat much
          </span>
        </p>

        <p>
          As before you'll want to include your config files and your
          <sub>CURL</sub>function, so that we can get the album Title (and date
          if you so wished) on the Album Page
        </p>

        <code>
          {`
    <?php
			       
			include('config.txt');</p>

			// CURL Function which gets the data from FB
      function curl_get_contents($url) {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        $data = curl_exec($ch);
        curl_close($ch);
        return $data;
      }
  `}
        </code>

        <p>
          Next we need to get the <sub>ID</sub>of the album, which we passed
          through with it in the URL.
        </p>

        <p>
          If the ID variable exists, we get the name etc, otherwise we kill the
          page (or redirect to an error page)
        </p>

        <code>
          {`
    // If the Album ID is set in the URL, get it and get the data from facebook
    if(isset($_GET['id'])){
      $fields = "count,created_time,description,link,name";
      $id = $_GET['id'];
      $json_link = "https://graph.facebook.com/".$_GET['id']."/?access_token={$access_token}&fields={$fields}";
      
      $album = json_decode(curl_get_contents($json_link));
    } else {
      // If there's no ID set, DIE
      die();
    }
  `}
        </code>

        <p>
          Once again, in the Head of the HTML Document, we will have an AJAX
          call that is called <sub>onload</sub>
        </p>

        <code>
          {`
    $.ajax({
      type: 'post',
      url: 'scripts/loadAlbum.php',
      data: {
      id: '<?php echo $id;?>',
        album_name: '<?php echo $album->name;?>'
      },
      success: function( data ) {
        document.getElementById("spinner").style.display = "none";
        document.getElementById("galleryDiv").innerHTML = data;
      }
    });
    
    </script>

		<body onload="getAlbum()">

		...

		  <!-- Page Content -->
      <div className="container"></p>

		    <!-- Page Heading -->
        <div className="row" >
          <div className="col-lg-12">
            <h1 className="page-header"><?php echo $album->name; ?>
              <a href="index.php"><small>Gallery</small></a>
            </h1>
          </div>
        </div>

			  <!-- Projects Row -->
        <div id="galleryDiv">
			   <div className="row">
            <div className="col-xs-2 col-xs-offset-5" id="spinner">
			        <div className="loader" >Loading Albums...</div>
            </div>
          </div> <!--End Row --></p>
			   </div>
      </div>  
    
    ...
  `}
        </code>

        <p>
          Create a new file<sub>loadAlbum.php</sub>in the<sub>scripts/</sub>
          directory
        </p>

        <p>
          This file is very similar to before in<sub>loadGallery.php</sub>
        </p>

        <ol>
          <li>Include the Configuration File</li>
          <li>
            Get The album ID &amp; The Album Name from the <sub>POST</sub>
          </li>
          <li>
            Create the<sub>CURL</sub>function
          </li>
          <li>Get The photos in the Album</li>
          <li>
            Get Each Image in Hi-Res and Low-Res and display them in the gallery
          </li>
        </ol>

        <code>
          {`
    <?php  
      include('../config.txt');</p>

			$id = $_POST['id'];
      $extra_params = $_POST['extra_params'] . "&limit=" . $pics_per_page;
      $album_name= $_POST['album_name'];</p>


			function curl_get_contents($url) {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        $data = curl_exec($ch);
        curl_close($ch);
        return $data;
			}

			// Get Album Photos
      // $fields = "id,count,cover_photo,created_time,description,link,name";
      $json_link = "https://graph.facebook.com/{$id}/photos/?access_token={$access_token}". $extra_params;
      // echo $json_link;

			$json = json_decode(curl_get_contents($json_link));
      $count = 0;
      for($i=1; $i<= sizeof($json->data) ; $i++):
        $photo = $json->data[$i-1];

        $fields="id,height,images,width,link,name,picture";
        $album_link = "https://graph.facebook.com/{$photo->id}/?access_token={$access_token}&fields={$fields}";
        $album_json = json_decode(curl_get_contents($album_link));

        if(isset($album_json->images[4]->source)) {
          $cover_ind = 4;
          $pic = $album_json->images[$cover_ind]->source;
        } else {
          $cover_ind = 0;
          $pic = $album_json->images[0]->source;
        }
        
        if($album_json->images[$cover_ind]->height < $album_json->images[$cover_ind]->width) {
          $orientation = "landscape";
        } else{
          $orientation = "portrait";
        }

        if(isset($album_json->images[1])) {
          $large = $album_json->images[1]->source;
        } else {
          $large = $album_json->images[0]->source;
        }

        $count++;
    ?>

      <div className="col-xs-10 col-xs-offset-1 col-sm-5 col-sm-offset-1 col-md-offset-0 col-md-3 album-cover" >
        <a href="<?php echo $pic; ?>" data-toggle="lightbox" data-title="<?php echo $count ."/". sizeof($json->data) . " ".$album_name; ?>" data-footer="FB API Gallery - Created By <a href='darraghmckay.com' target='_blank'>Darragh Mc Kay</a>" data-gallery="popupgallery">
          <div className="portfolio-item">
            <img className="img-responsive <?php echo $orientation;?>" src="<?php echo $pic; ?>" >         
          </div>
        </a>
      </div>
      <?php if($count%4 == 0) : ?>
        </div>
        <div className="row">
      <?php endif;?>
			      
    <?php endfor; ?></p>
  `}
        </code>

        <p>That should be enough to get your started.</p>

        <p>
          The full working demo can be seen{' '}
          <a href="https://darraghmckay.com/projects/fb-gallery/">here</a>
        </p>

        <p>
          The Code is available to Download on My github{' '}
          <a href="https://github.com/darraghmckay/facebook-photo-gallery">
            here
          </a>
        </p>

        <p>
          The Repository contains instruction on how to set up the example and
          how to obtain a FB App ID and a FB App Secret.
        </p>

        <p>
          The working examplel (and the Github Repo) also contains extra
          features such as:
        </p>

        <ul>
          <li>a Loading 'Spinnner'</li>
          <li>A working Lightbox</li>
          <li>
            Pagination, so you can limit how many pictures / albums are
            downloaded
          </li>
        </ul>

        <p>
          I hope this tutorial has helped you set up a Facebook Photo Gallery
          like it did for me. If you have any questions please just send me an
          email using the form below.
        </p>
      </React.Fragment>
    ),
  },

  {
    title: 'Fun with CSS Animations [Codepen]',
    path: 'fun-with-css-animations-codepen',
    createdAt: '2015-12-06',
    category: BlogCategories.WEB_DESIGN,

    body: () => (
      <React.Fragment>
        <p>
          Yesterday I wantd a distraction so I decided to go oevr to
          dribbble.com to find some inspiration for an animation I could
          <strong>recreate</strong>in HTML and CSS. It's Called the Early Bird,
          one birds struggle to catch his worm. Here's the original
          <a
            href="https://dribbble.com/shots/2381213-The-early-bird"
            target="_blank"
          >
            on Dribbble
          </a>
          .
          <img
            alt="The Early Bird - Dribble @ MUTI"
            src="https://cdn.dribbble.com/users/59947/screenshots/2381213/muti-1.gif"
          />
        </p>

        <p>
          And here is what I managed to Create on codepen, using the following
        </p>

        <ul>
          <li>
            SASS Mixins so animations and transitions were created cross-browser
          </li>
          <li>No Javascript - All the animations are done with CSS</li>
        </ul>
        <h3>Why</h3>
        <p>
          There aren't many practical reasons to do this, except to get away
          from depending on flash and gifs,<strong>however</strong>it's more of
          a challenge to myself and a learning excercise. It definitely pushed
          my limits of what I could do with SASS animations before.
        </p>
        <p
          data-height="504"
          data-theme-id="0"
          data-slug-hash="GoRwWB"
          data-default-tab="result"
          data-user="darrraghmckay"
          className="codepen"
        />
      </React.Fragment>
    ),
  },

  {
    title: 'China: Hong Kong is not an Island',
    path: 'china-hong-kong-is-not-an-island',
    createdAt: '2015-08-18',
    category: BlogCategories.TRAVEL,

    body: () => (
      <React.Fragment>
        <p>
          I'm over half way through my time here in China, and it's been over a
          week since my last post. Needless to say I've been very busy.
        </p>

        <p>
          Last week started with a visit to the British council where we had
          talks on doing business in China and the pros and cons of it.
        </p>

        <p>
          Tuesday morning we had a talk with ARUP, who built the famous CCTV
          building in Beijing amoung other things. It was interesting to hear
          how their project cycle worked, sketching, designing, small 3D models,
          then large 3D models, as well as earthquake testing then finally the
          construction.
        </p>

        <p>
          <img alt="" src="http://i.imgur.com/L8QRfPZ.jpg" />
        </p>

        <p>
          That evening our last evening in Beijing, we were taken to a Hot-Pot
          restaurant by our tour guide Maria. Hot-Pot is a well known type of
          meal in Beijing, where two pots of seasoned water / sauce are placed
          in the middle of the table. Then you dip raw meat into the pots to
          cook them, then season them with your personal choice of herbs and
          spices.
        </p>

        <p>
          <img alt="" src="http://i.imgur.com/e5zVjnm.jpg" />
        </p>

        <p>
          The next morning we were up early for our 3 hour flight from Beijing
          to Shenzhen which officially brought a close to our time in Beijing. I
          do miss the hustle and bustle of Beijing but it's great that I can see
          some of the other parts of the country too.
        </p>

        <p>
          <img alt="" src="http://i.imgur.com/XF8ZLZ1.jpg" />
        </p>

        <p>
          Wednesday evening, after touching down in Shenzhen we were brought to
          our hotel. The swimming pool on the way into the hotel got our spirits
          high and our expectations even higher. We thought that this hotel
          would be spectacular. However on entering my room I was a little
          disappointed, the room is grand but not the 4-Star quality I had
          expected.
        </p>

        <p>
          Thursday morning started with a tour of one of the Huawei
          manufacturing plants. The amount of automation shocked me. There were
          lots of workers there but at the same time machines did most of the
          work while people just double-checked the work.
        </p>

        <p>
          That afternoon we were brought around the F1 and G1 Exhibition Hall.
          Basically Huawei's Exhibition rooms for their consumer products
          (phones, routers etc..) And their Enterprise products (Servers,
          security systems, video conferencing etc..) and their Commercial
          products such as their 4G network solutions.
        </p>

        <p>
          That evening we went to the OCT Loft, a busy night-life center in
          Shenzhen for some expensive drinks and to celebrate Connors birthday.
          It was one of the sweatiest evenings I've ever experienced. Some of us
          bought drinks and sat outside, but despite the fact that we were doing
          nothing we all ended up soaked in sweat. Incredibly uncomfortable...
        </p>

        <p>
          Friday morning wasn't incredibly interesting, kicking off our ICT
          Course, but I did win two boxes of decorative chop sticks, but it was
          Friday evening that was much more interesting.
        </p>

        <p>
          A group of us had decided to take advantage of our free weekend, and
          our double entry visas to spend the weekend in Hong Kong!! So the
          minute class was over on Friday afternoon we ran back to the hotel,
          grabbed our go-bags and got in Taxis to the subway station.
        </p>

        <p>
          <img alt="" src="http://i.imgur.com/Ph1iN7S.jpg" />
        </p>

        <p>
          It took about three hours to get through border control as well as
          getting several subways but eventually we surfaces in the TST region
          around 9pm in the middle of the High Rise buildings and flashing LED
          lights of Hong Kong.
        </p>

        <p>
          Hong Kong is incredibly different to mainland China. It was amazing to
          see such contrasting cities so close to each other. People in Hong
          Kong express themselves, they have Hipsters there, they like different
          clothes and listen to different music. There are many foreigners in
          Hong Kong, unlike in China. They have lots of British people and lots
          of Indians / Pakistanis. In mainland China there are little to no
          foreigners. So much so that often they ask to take photos with us.
        </p>

        <p>
          That evening, after dinner we went to the waterfront to take photos of
          Hong Kongs beautiful skyline, making the most of the night mode on our
          new Honor 6 Plus. After taking hundreds of photos of the same thing we
          went back to our hostel and went to bed (boring I know). Our hostel
          was in a building called Chung King Mansion. Fabled in Hong Kong. The
          building itself looked quite nice from the outside, having LED lights
          on its front which lit up in sync changing colours, the Hostel itself
          was clean and cool (due to the excessive use of the AC) however the
          building itself, on the inside, was quite the opposite.
        </p>

        <p>
          <img
            alt="Ocean Guest House, ChungKing Mansions, Hong Kong"
            src="http://i.imgur.com/VDUdLnj.jpg"
          />
        </p>

        <p>
          Aside from being dirty, grotty and warm, the building houses many
          small shops owned by foreigners selling everything from water to
          electronics to fake DVDs. Among the shops were men offering all sorts
          of services including but not limited; every type of drug imaginable,
          tailor services, watches, scarves, massages and the mysterious
          'Guesthouse'. It was quite the experience and a little bit
          intimidating but the Hostel was cheap and incredibly central so we
          couldn't really complain.
        </p>

        <p>
          The next morning we woke up in the middle of a heavy rain storm. Being
          the tourists we are we ventured for a market only to learn that it was
          exclusively a night market.
        </p>

        <p>
          After buying poorly constructed ponchos we decided to make our way out
          to the Ten Thousands Buddahs Monastery. Despite the heavy rain we
          managed to find the steps up to the Monastery. We were pleasantly
          surprised (given we had no idea what to expect). The steps to the
          Monastery were lined with hundreds of full sized golden statues of
          Buddhist Monks, all striking different poses. When we reached the top
          we found a room which housed over 12800 small Buddhist Monk statues,
          each about 15cm tall. We had assumed the name Ten Thousands Buddhist
          Monks was an exaggeration so we were a bit shocked to find out that it
          was actually an under exaggeration. That room was magnificent. Each
          statue was more or less unique and perfectly placed on its shelf.
          Incredibly impressive stuff.
        </p>

        <p>
          <img
            alt="Ten Thousand Buddahs - Hong Kong"
            src="http://i.imgur.com/6j3R8Ua.jpg"
          />
        </p>

        <p>
          <img
            alt="Ten Thousand Buddhas - Hong Kong"
            src="http://i.imgur.com/aqOTjs5.jpg"
          />
        </p>

        <p>
          After taking many pictures with the statues and gasping at the sights
          we went to look for food. What looked like a shopping center was
          actually a home department store. Thankfully we found an IKEA on the
          top floor. We bought meatballs. It was shameful, but so so tasty.
        </p>

        <p>
          After a quick trip back to the Chung King Mansion we made our way to
          the International Commerce Building and paid &euro;20 to make it to
          the 100th floor, 360m high we overlooked the whole city. We went at a
          great time where the sun was setting. Despite the cloud, we still
          managed to get great shots of the city at day and night.
        </p>

        <p>
          <img
            alt="View from the Sky100, the 100th floor of the International Commerce Center, Hong Kong"
            src="http://i.imgur.com/VsH7pBA.jpg"
          />
        </p>

        <p>
          The next morning we woke up early (ish) with great hopes of going up
          to Victoria Peak. The highest point in Hong Kong, with breathtaking
          views of the city. We queued for about an hour to get the tram up. In
          the process I managed to drop and break my gopro lens.
        </p>

        <p>
          After getting up to the top we took a few quick pictures but were too
          hungry to appreciate the views so we decided to take lunch. This was
          where we went wrong. After five minutes of sitting down into our lunch
          the clouds rolled in and suddenly the whole Peak was in a cloud. We
          couldn't see a thing. The beautiful views were instead replaced by
          thick grey fog.
        </p>

        <p>
          It was disappointing but it was still something to do I guess and it
          drew a close to our great time in Hong Kong.
        </p>

        <p>
          <img
            alt="Our View from Victoria Peak - Hong Kong, Hong Kong"
            src="http://i.imgur.com/etZdomm.jpg"
          />
        </p>
      </React.Fragment>
    ),
  },

  {
    title: 'China: 1 Week In Beijing',
    path: 'china-1-week-in-beijing',
    createdAt: '2015-08-09',
    category: BlogCategories.TRAVEL,

    body: () => (
      <React.Fragment>
        <p>
          I've finished my first week in Beijing. I'm much less shocked by the
          traffic and the sheer amount of people there are everywhere, and the
          cheap cheap prices of drinks and taxis.
        </p>

        <p>
          I've done so much in the last week that it's hard to know what to
          mention, it feels like much more than a week.
        </p>

        <p>
          Wednesday night, we all went on a mad one. The night club down the
          street had an open bar for 50Juan for men and 20Juan for women. Of
          course when we arrived with 8 guys and 2 girls, the girls were let in
          for free and the guys had to pay a mere 40Juan (&euro;6). The alcohol
          wasn't all that strong but the drinks were actually 100% free and the
          music was good. To our shame around 12.30 we decided that another
          night of KTV would be a great idea (it was). We laid for an hour, by
          which point almost all 40 of us were there, then when they went to
          kick us out around 2am some hero paid for another hour.{' '}
          <span>Which lead to a terrible Thursday morning.</span>
        </p>

        <p>
          <span>
            Thursday evening we visited the Irish Embassy where we chatted to
            the Embassador Paul Kavanagh again, and the man who looks after
            Irish food imports into China. They also gave us a good
            western-style dinner buffet wih wines and beers.
          </span>
        </p>

        <p>
          <img
            alt="Podium in the Irish Embassy in Beijing"
            src="https://igcdn-photos-f-a.akamaihd.net/hphotos-ak-xfa1/t51.2885-15/11427386_955881447805381_118167734_n.jpg"
          />
        </p>

        <p>
          <span>
            That evening a few of the Irish guys and I went to a lovely
            lake-side bar district. We just rambled around the shops for a while
            and stood in awe at the amount of LED lights and angry rick-shaw
            drivers.
          </span>
        </p>

        <p>
          Friday morning we finished our time in BCLU with a quick revision and
          an assessment. Of course I aced it. Which we followed up with a quick
          talent show featuring Edmund rapping<em>as Gaeilge</em>, Paul Glitter
          (Keelin) who did a card trick and an interesting improv story about
          mexicans in the desert.
        </p>

        <p>
          That evening all 40 of us set off in rickshaws through the
          <em>houtong's</em>of Beijing on 20 odd rickshaws being driven by the
          sweatiest, most strong willed chinese men I'd ever seen. It was a
          fascinating trip, and equally as exhilirating due to the amount of
          near-misses which occured.
        </p>

        <p>
          <img
            alt="Rickshaw Tour through the Houtongs of Beijing"
            src="https://scontent-atl1-1.cdninstagram.com/hphotos-xfa1/t51.2885-15/11376236_126785180996821_195867635_n.jpg"
          />
        </p>

        <p>
          After the rickshaw tour we were ushered into the back room of some
          locals house where we had a Q&A session with her. It was pretty
          interesting to get a locals opinions on some issues such as owning
          property and travelling.{' '}
        </p>

        <p>
          That evening we went for drinks in the bar district, and like well
          behaved students we set off to get taxis at 10:30pm to be in bed by
          11:00pm<strong>but</strong>luck was not on our side. We got out of the
          bar district at a quiet area and quickly realised that no taxi would
          pick us up from there so we walked in the direction of our hotel (a
          good 11km away). This is where the mistakes began. After maybe 35
          minutes of walking and hailing half of our group got into a taxi. So
          we assumed we wouldn't be long getting a taxi so we kept walking.
          <strong>Mistake Number 2.</strong>We ended up at a massive
          intersection (which intersections tend to be in China) which meant
          taxis might not be in the correct lanes to bring us to where we want,
          also we'd have to dash out into traffic to get a taxi. To make a
          <strong>long</strong>story short, it took us almost 2 hours in total
          to get a taxi, even with the kind help of some chinese man who got out
          of taxi we tried to get into, and the concierge of a very fancy hotel,
          who walked about 10 minutes away from his hotel with us to basically
          just hail cabs for us, despite him not having any English whatsoever.
          We realise that most of this was entirely our faults and we learnt
          quite a lot from it but we were mostly just relieved to be in bed by
          1am. Yes, 1am. Two entire hours after our expect and much anticipated
          bed time.
        </p>

        <p>
          Saturday morning marked the end of our first week in Beijing and the
          start of the most stressful and sweatiest cultural experience we've
          ever been in.
        </p>

        <p>
          We kicked off he morning by getting a coach to the Great Wall of
          China. It was the most picturesque thing I've ever seen, locatet high
          in the mountains. However it was packed with thousands of people.
        </p>

        <p>
          Who knew the Great Wall was so steep. I was kinda expecting some steps
          but mostly flat walk, but it's basically a stepped out walkway up the
          mountain and back around. Sweaty doesn't begin to describe how sweaty
          we were. But as a reward to myself I bought myself a traditional rice
          farmer hat.
        </p>

        <p>
          After bailing back onto the bus, dripping in sweat we headed back to
          the Summer Palace, a beautiful Palace grounds built around a lake. The
          lake was filled with pedalos and tourist tour boats. To get to the
          temple, we needed to climb many many stepsz obviously nothing compared
          to the amount of steps on the Great Wall, but when we got to the top
          the view was magnificent.
        </p>

        <p>
          The palace overlooked the entire lake, which was backed by the
          topography of the city, silhouetted by the sun. Definitely worth the
          climb.
        </p>
      </React.Fragment>
    ),
  },

  {
    title: 'China: Culture Shock',
    path: 'china-culture-shock',
    createdAt: '2015-08-06',
    category: BlogCategories.TRAVEL,

    body: () => (
      <React.Fragment>
        <p>
          I've been here in Beijing for 5 days now but I'm still surprised and
          amazed by this crazy city!
        </p>

        <p>
          After class on Tuesday we chatted to some Chinese mature students who
          were learning English in BCLU,
          <em>Beijing Culture & Language University.</em>Naturally we talked
          mostly about the cultural differences between living in China and
          living in Ireland / The UK. Basically the cost of living here is
          incredibly low, or maybe the cost of living back home is incredibly
          high but that didn't really shock us, I was more surprised to hear how
          not one of them drove, they'd never left China nor even seen any of
          the tourist attractions the Beijing is famour for and the baidu.com,
          theChineses <i>Google</i>equivalent is actually quite impressive. It
          has basically all of the common features
          <em>Google</em>has - Search, Images, Translation, Maps. I guess when
          you've a population of over a<strong>billion</strong>people as your
          target market it's easy to be a big company yet not expand beyond
          China. Of course exchanged<em>WeChat</em>numbers so if I ever need
          anything in China I know who to call!!
        </p>

        <p>
          After chatting with them for the biggest part of 3 hours we dashed
          accross the city in taxis to the Olympic Village. The taxis are even
          scarier from the inside but it was quite the experience none the less.
          It cost us under &pound;2 (divided between 3 of us) to go about 6km it
          was amazing.
        </p>

        <p>
          <img
            alt=""
            src="https://igcdn-photos-f-a.akamaihd.net/hphotos-ak-xfa1/t51.2885-15/11311610_489822684505981_750038992_n.jpg"
          />
        </p>

        <p>
          We had big dreams of hitting up the water park in
          <em>The Cube (T</em>he Aquatic Centre) but we got conned with normal
          swiming tickets which cost us a rip-off price of &euro;9! Although
          water park tickets were &pound;20 / &euro;30 so we weren't incredibly
          keen even when we did figure it out. Anway to add insult to injury the
          swimming pool was only the warm-up pool which would have been used for
          the olympics and half of it was reserved for members for lane
          swimming. This resulted in 14 of us standing in water which was barely
          1 meter deep (our normal 1.2m shallow end would be too deep for the
          Chinese - we assume) with approximately 500 other Chinese people. But
          we made the best of it.
        </p>

        <p>
          <img
            alt="Rooftop Dinner at a Houtong in Beijing "
            src="https://igcdn-photos-g-a.akamaihd.net/hphotos-ak-xpa1/t51.2885-15/10732031_1464903007168022_1900472215_n.jpg"
          />
        </p>
      </React.Fragment>
    ),
  },

  {
    title: 'China: Huawei Seeds of The Future',
    path: 'china-huawei-seeds-of-the-future',
    createdAt: '2015-08-04',
    category: BlogCategories.TRAVEL,

    body: () => (
      <React.Fragment>
        <p>
          <strong>I'm in China.</strong>It's weird.
        </p>

        <p>
          I've spent the last two days now in Beijing, the capital of China. I
          was very lucky to be offered a place on Huawei's '
          <em>Seeds of the Future'</em>Programme in which they have brought 10
          Irish Students and over 30 British Students over to China to
          experience Chinese culture, learn the language, visit their
          head-quarters and make some other industrial visits.
        </p>

        <p>
          <img
            alt="Confuscious' Temple - Beijing"
            src="https://igcdn-photos-c-a.akamaihd.net/hphotos-ak-xfa1/t51.2885-15/11244029_102657720086258_823776793_n.jpg"
          />
        </p>

        <p>
          I landed on Saturday 4pm local time after over 16 hours of travelling.
          Since then I've<em>'mastered'</em>the art of eating with chopsticks,
          experienced very peculiar foods, and seens some of the craziest
          driving I think I'll ever see. Stop lights mean very little here, and
          road lines and lanes mean even less. Mopeds and bikes zoom around
          seemingly following different (or no) laws, while cars beep and lane
          change around them. Crossing these roads is an exhilirating experience
          in itself. Yesterday (Monday), we started learning Mandarin Chinese.
          It's something else! The noises required for the language are like
          nothing we have in the Engligh language but so far it's been very fun
          and I can now confidentifly say <em>hello</em>,<em> thank you</em>,{' '}
          <em>sorry </em>and <em>goodbye.</em>I was also given a Chinese
          translation of my name -<em>'Mai Kai'.</em>
        </p>

        <p>
          Yesterday evening, after class we suited-up and visited the British
          Embassador's residency, where she talked to us, along with Paul
          Kavanagh, the Irish Embassador, who's residency we'll be visiting on
          Thursday. The house was quite beautiful and both Embassador's were
          quite interesting.
        </p>

        <p>
          <img
            alt="British Embassy"
            src="https://igcdn-photos-e-a.akamaihd.net/hphotos-ak-xpa1/t51.2885-15/1527740_1456462718012636_1983178370_n.jpg"
          />
          <span>
            After the visit we changed back into more comfortable clothes and
            headed out for dinner, which we followed up with drinks and the
            fabled
          </span>
          <em>KTV - Kareoke.</em>
          <span>
            It's a crazy phenomenon where you can rent private booths and belt
            out all the ballads and smash hits of the 90s and early 2000's! If
            you're ever in China it's somehthing you should do at least once!!
          </span>
        </p>

        <p>
          <img
            alt="KTV - Beijing"
            src="https://igcdn-photos-a-a.akamaihd.net/hphotos-ak-xfa1/t51.2885-15/11849906_1689262854636752_5230480_n.jpg"
          />
        </p>
      </React.Fragment>
    ),
  },

  {
    title: 'Introducing oneprogram.me',
    path: 'introducing-oneprogram-me',
    createdAt: '2015-02-15',
    category: BlogCategories.WEB_DESIGN,
    image: oneProgrammeImage,

    body: () => (
      <React.Fragment>
        <p>
          <strong>It's Launched!</strong>
          Oneprogram.me read One Programme is an on-line progress tracker of
          Scouting Ireland's 'One Programme'. The 'One Programme' is terribly
          complicated to follow. And using paper to track an individual scouts
          progress is expensive and difficult, particularly if you have 30+
          Scouts to look after. This is where Oneprogram.me comes into play. On
          the new website, Sections or Troops can register so that when their
          scouts register they can join their section online. This opens up
          loads of opportunities for leaders. When a leader completes a task (or
          a few) with several scouts on a night, they log-in, go to their
          section, select which Skill, Stage and Task the scouts completed, then
          simply 'mark' that task as done for whichever scouts it applies to.
          This is far easier than asking scouts to remember log books, or even
          keeping log books. This also means that leaders no longer need to
          carry around the 'One Programme' coursebook, because all the tasks to
          specific stages are available at a glance. I could go on more, it's
          packed full of features for both leader and scouts.
        </p>

        <p>
          The plan is to make it free for scouts to join, so long as their
          Section / Troop have registered. However Sections / Troops will need
          to pay a small fee to register. However their first three months will
          be free. Check it out here -{' '}
          <a href="http://oneprogram.me">OneProgram.me</a>
          And please let me know what you think.
        </p>
      </React.Fragment>
    ),
  },

  {
    title: 'Valentines Day - A Card for you [Codepen]',
    path: 'happy-valentines-day-a-card-for-you',
    createdAt: '2015-02-14',
    category: BlogCategories.WEB_DESIGN,
    body: () => (
      <React.Fragment>
        <p>
          It's Valentines Day and as part of a surprise I decided to put my CSS
          skills to their test and see if I could make a simple Valentines Day
          card which opens and closes with only CSS (and HTML of course) I
          started looking for cards, and I quite liked the simplicity of this .
          So that's what I made and frankly I'm pretty happy with it, but why
          don't you judge it for yourself.
        </p>

        <p>
          <em>Tip: You have to hover over the card for it to open</em>
        </p>

        <p>I had fun doing this, so I might even make it a seasonal thing</p>
        <p
          data-height="468"
          data-theme-id="0"
          data-slug-hash="MwwReo"
          data-default-tab="result"
          data-user="darrraghmckay"
          className="codepen"
        />
      </React.Fragment>
    ),
  },

  {
    title: 'Making Progress - Almost Ready To Launch',
    path: 'making-progress-almost-ready-to-launch',
    createdAt: '2015-02-12',
    category: BlogCategories.NEWS,
    body: () => (
      <React.Fragment>
        <p>
          So the mysterious project I previously posted about is almost ready.
          I'm just tweaking the mobile version of the site, which was made a lot
          easier with Bootstrap V3. This morning I bought the domain name and
          I'm pretty happy with it. Now to get it online. It's fair to say I'm
          pretty excited. For this project I have done my beat to use as little
          JavaScript as possible and rely mostly on CSS tricks - which was made
          easier with the powers of SASS. The site is fully responsive, and
          beautifully flat. I can't wait to launch it.
        </p>
      </React.Fragment>
    ),
  },

  {
    title: 'I Have Started Something New',
    path: 'i-have-started-something-new',
    createdAt: '2015-01-21',
    category: BlogCategories.NEWS,

    body: () => (
      <React.Fragment>
        <p>
          As of two days ago, I have started an exciting new project. So far I
          am making decent progress with it as I have got most of the backend
          done. I can not really say what its about other than its about Scout
          Badges and the extremely over-complicated system. The plan is to
          simplify the system and provide it as a service to the public. That is
          all I want to say for now in case it does not really come together.
          But I think it will this time. I just have to tie up all the loose
          ends and make it stupid-proof first. I can not wait!!
        </p>
      </React.Fragment>
    ),
  },

  {
    title: 'Waterprices.ie - Update',
    path: 'waterprices-ie-update',
    createdAt: '2014-11-23',
    category: BlogCategories.WEB_DESIGN,
    image: waterPricesImage,

    body: () => (
      <React.Fragment>
        <p>
          We have some news: First of all, the Government changed the water
          metering prices last week to be a fixed annual charge instead of based
          on your usage. What does this mean?
        </p>

        <p>
          1) If you live alone you will pay a maximum of &euro;160 / year. 2)If
          there is more than one adult in the household you will pay a maximum
          of &euro;260 / year.
        </p>

        <p>
          3)If you have a water meter installed and you use less than
          &euro;160/260 per year then water is billed at &euro;3.70 per 1000
          litres - this is cheaper than before.
        </p>

        <p>4)Children are now free.</p>

        <p>
          Like before if you only use either the water supply or the water waste
          system (people using personal treatment systems etc..) you the prices
          are exactly half of what is outlined above.
        </p>

        <p>
          Secondly, What does this mean for waterprices.ie 1)Although there is
          less of an emphasis on water consumption if you conserve water using
          the tips found on waterprices.ie you could end up saving money.
        </p>

        <p>
          2) You can still calculate how much your usage might cost and you can
          see what you can do to bring your usage down.
        </p>

        <p>
          I am a little bit disappointed to have to announce this news as it
          certainly does mean that for now, waterprices.ie is less useful to the
          general public. But I do intend on continuing its development,
          improving its accuracy and getting more traffic.
        </p>
      </React.Fragment>
    ),
  },

  {
    title: 'Beach, Beaters and Bumpers',
    path: 'beach-beaters-and-bumpers',
    createdAt: '2014-08-13',
    category: BlogCategories.TRAVEL,

    body: () => (
      <React.Fragment>
        <p>
          This morning was the worst. Due to our unofficial residency we had to
          leave our beds at 6am. The sun still had not risen. The grass was wet.
          We were tired and freezing. Nonetheless we soldiered on in search of
          the mystical and unforgiving Avenue Vert. After twenty kilometers we
          took a well deserved break, we spread out on a back road as Matthew
          fixed another puncture. When we did find the Avenue Vert we were
          surprised at how beautiful she looked in comparison to her southern
          cousin. 50km of flat, even tarmacadam. We thought we were in heaven.
          The day flew by as we overtook many tourists to then stop and fix
          punctures and watch those tourists overtake us once again. But the sun
          was shining, we were delighted. Even the vicious headwind on the way
          into Dieppe could not hold us back. It was not long until we were
          strolling around in our beaters with our frisbee, causing havoc on the
          bumper cars.
        </p>
      </React.Fragment>
    ),
  },

  {
    title: 'I Just Can&#039;t Even',
    path: 'i-just-cant-even',
    createdAt: '2014-08-12',
    category: BlogCategories.TRAVEL,

    body: () => (
      <React.Fragment>
        <p>
          Today <strong>started</strong> well. Matthew scoffed down two pain au
          raisons for breakfast while I destroyed a pain au chocolate and some
          almondy, pastry goodness. But it went quickly downhill, or should I
          say uphill. I just can not even. Everything that could have gone
          wrong, did. Punctures, hills, steps, poor roads, rain and worst of
          all; after cycling 95km, it wasn't until 11:20pm that we arrived at
          our destination. The destination which no longer existed. Half an hour
          later we had our tent pitched, in some field with no water, no
          electricity, very little light and no idea if the farmer would find us
          or not. Or weather he would be friendly when he did.
        </p>
      </React.Fragment>
    ),
  },

  {
    title: 'Paris, Paris the City of Love and Tired Legs',
    path: 'paris-paris-the-city-of-love-and-tired-legs',
    createdAt: '2014-08-11',
    category: BlogCategories.TRAVEL,

    body: () => (
      <React.Fragment>
        <p>
          We woke up the next morning tired, but with Paris in our sights we set
          off once again. The first 20km were on back roads, but once we arrived
          in Etamps it was going to be dual-carriageway all the way to Paris. Of
          course it wasn't as simple as that. We set off without any breakfast,
          and as we rolled into Etamps I got a puncture. Of course we had to
          stop and change the tube, but not more than 10km later Matthew got a
          puncture. We pulled in at the edge of the busy road, fixed his
          puncture and set off again. We were determined to make it to the city
          before dinner time because Matthew's granddad had kindly offered to
          pay for a hotel for us. After making it to the hotel, we found the
          nearest restaurant, ate-up then hit the hay. The next morning we lay
          in as long as possible. We were wrecked. Leaving our bikes and luggage
          in the hotel we went exploring the big city. Matthew saw himself as a
          bit of a Parisian so he was our tour guide for the day. Le Louvre, Le
          Tour d'Eifel, the standard but the highlight of the day was of course
          finishing the day by racing down the Champs de l'Essey, screaming
          nonsense like, <strong>HARD LINES and VITE VITE VITE!!</strong> Then
          stopping and taking a photo under the Arc De Triumph - only to be
          asked to leave by the Police national.
        </p>
      </React.Fragment>
    ),
  },

  {
    title: 'We Were Due an Upgrade',
    path: 'we-were-due-an-upgrade',
    createdAt: '2014-08-10',
    category: BlogCategories.TRAVEL,

    body: () => (
      <React.Fragment>
        <p>
          We left the fair town of Blois, from our riverside camp-site and made
          our way up to Orleans. As I rolled into the town centre I realized
          that there was a wobble in my wheel. So as Matthew pulled into Lidl
          and purchased 12 twix ice cream bars, I hopped on Google Maps and
          searched for a Decathlon. We were in luck - kinda. Two twix bars down
          and after finding Decathlon we were told that the closest shop that
          would fix my wheel was another 6km out of our way. So with my wheel
          strapped to the back of Matthews bike I set off, alone, leaving
          Matthew awe-struck in Decathlon.
        </p>

        <p>
          When I returned, wheel fixed and sporting a new set of panniers - a
          necessary upgraded due to a rupture en-route earlier that day, I found
          Matthew giddy with the thoughts of buying a new tent. It didn't take
          much convincing to get him to buy the spacious, good value tent. So we
          set off, with a spare tent, giddy as ever after finishing all six twix
          ice creams each - although they were quite soft by that time.
        </p>

        <p>
          We were on a high and smashed another 50km before realizing that we
          were running out of water and had no food. Desperate for a supermarket
          we struck out and ended up treating ourselves to kebabs and chips.
          Still 25km away from the nearest camp-site we head off once again into
          the setting sun.
        </p>

        <p>
          After what seemed like forever Matthew eventually eventually announced
          that we had arrived. We got off the road and walked our bikes down a
          ridiculous dirt track only to be met by the most French man ever -
          jeans sandals and braces with two small barking dogs. But he kindly
          told us that there was a camp-site 1km away. So in complete darkness
          we set off once more. As it turned out it was no word of a lie. 120km
          down - with an extra 12km for me due to my trip to the bike shop, we
          eventually arrived at the camp-site.
        </p>
      </React.Fragment>
    ),
  },

  {
    title: '98% Chance of Rain',
    path: '98-chance-of-rain',
    createdAt: '2014-08-08',
    category: BlogCategories.TRAVEL,

    body: () => (
      <React.Fragment>
        <p>
          That is what we we were told. There is a campsite by the farm. But
          could we find the aforementioned farm? Nope. Nope. Nope - at least not
          initially.
        </p>

        <p>
          But when we did find the farm we collapsed victoriously. Marking the
          finish of Day One, with a big 85km under our belt.
        </p>

        <p>
          Yesterday did not go as smoothly as planned. I disembarked on time, in
          Cherbourg and I managed to buy some lighter fluid for our stove.
          Feeling great I boarded my train to Paris. No problems until Paris.
          Where it almost went wrong. As I toured around Paris (solo) I felt
          amazing. I stumbled upon Le Louvre, but carried on in search of bigger
          things - the Eiffel Tower. Of course I got hopelessly lost and to make
          matters worse it started to pour rain. So I scampered back in search
          for the train station, soaking wet. I boarded my train with a minute
          to spare, when it dawns on me. My ticket doesn't allow me to carry a
          bike. A &euro;37.10 fine later and I arrive in Poitiers wet and
          grumpy. But meeting Matthew soon cheered me up.
        </p>

        <p>
          We woke up at our own leisure this morning. Lied to some man about how
          fit we were, then set out. It has been easier than expected. The
          things I have learned. Cheap ice creams come in packs of six so it's
          okay to have three a day. Tourist office girls do not mind if you're
          incredibly sweaty and confused as you get their help. A pool and a
          swim after 65km is key. Nobody knows where the farm is but they know
          it exists.
        </p>
      </React.Fragment>
    ),
  },

  {
    title: 'There is a Camp Site by the Farm',
    path: 'there-is-a-camp-site-by-the-farm',
    createdAt: '2014-08-07',
    category: BlogCategories.TRAVEL,

    body: () => (
      <React.Fragment>
        <p>
          That is what we we were told. There is a campsite by the farm. But
          could we find the aforementioned farm? Nope. Nope. Nope - at least not
          initially.
        </p>

        <p>
          But when we did find the farm we collapsed victoriously. Marking the
          finish of Day One, with a big 85km under our belt.
        </p>

        <p>
          Yesterday did not go as smoothly as planned. I disembarked on time, in
          Cherbourg and I managed to buy some lighter fluid for our stove.
          Feeling great I boarded my train to Paris. No problems until Paris.
          Where it almost went wrong. As I toured around Paris (solo) I felt
          amazing. I stumbled upon Le Louvre, but carried on in search of bigger
          things - the Eiffel Tower. Of course I got hopelessly lost and to make
          matters worse it started to pour rain. So I scampered back in search
          for the train station, soaking wet. I boarded my train with a minute
          to spare, when it dawns on me. My ticket doesn't allow me to carry a
          bike. A &euro;37.10 fine later and I arrive in Poitiers wet and
          grumpy. But meeting Matthew soon cheered me up.
        </p>

        <p>
          We woke up at our own leisure this morning. Lied to some man about how
          fit we were, then set out. It has been easier than expected. The
          things I have learned. Cheap ice creams come in packs of six so it's
          okay to have three a day. Tourist office girls do not mind if you're
          incredibly sweaty and confused as you get their help. A pool and a
          swim after 65km is key. Nobody knows where the farm is but they know
          it exists.
        </p>
      </React.Fragment>
    ),
  },

  {
    title: 'Departing - Cycle Trip Part 1',
    path: 'departing-cycle-trip-part-1',
    createdAt: '2014-08-05',
    category: BlogCategories.TRAVEL,
    image: mapImage,

    body: () => (
      <React.Fragment>
        <p>
          So today is the day, my cycling trip with Matthew Cockerill begins. It
          started this morning with some last minute packing, followed by a
          train to Rosslare - which linked up amazingly with the ferry time,
          three hours early for check in!! After strolling around Rosslares
          SuperValu and trusting my bike to be safe behind a church, I
          eventually rolled down to the ferry terminal. To my surprise I had to
          board the ferry with the cars. So I queued up with the cars and the
          motorbikes. For now I'm taking refuge on the floor of the one of the
          rooms with the chairs. Tonight's sleep should be interesting.
        </p>
      </React.Fragment>
    ),
  },
];
