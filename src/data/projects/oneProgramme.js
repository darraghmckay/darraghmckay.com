import React from 'react';
import { WEB_DEVELOPMENT } from '../../constants/blogCategories';

export default {
  title: 'OneProgram.me',
  subTitle: 'Scouting Site for Leaders to Track One Programme Progress',
  href: 'http://oneprogram.me',
  path: 'oneprogramm-me',
  createdAt: '2015-11-23',
  img: 'https://darraghmckay.com:443/couch/uploads/image/oneprogramme.jpg',
  coverImg:
    'https://darraghmckay.com:443/couch/uploads/image/one_prog_full.jpg',
  category: WEB_DEVELOPMENT,
  color: '#00BCD4',
  body: () => (
    <div>
      <p>
        OneProgram.me Is a site I designed and developed on my own with the
        intention of it being used by the Irish Scouting Community either for
        free or a small fee.
      </p>
      <h3>The Idea</h3>
      <p>
        OneProgram.me Solves one very complex problem. The One Programme is a
        'syllabus' of sorts for Irish Scouts and Leaders which takes 9 skills
        and brings you from beginner to absolute expert. Each skill consists of
        9 levels (Level 1 being absolute beginner, level 9 being professional /
        expert in most cases). The problem is, each
        <strong>level</strong>can have between 2 and 14 individual tasks that
        need to be completed (and recorded) before that level can be marked as
        done.
      </p>
      <h3>That's confusing....</h3>
      <p>
        So there are 740+ different tasks which need to be tracked for any given
        scout. If you have more than 10 scouts to keep track of, this can become
        a time consuming task.
      </p>
      <h3>Introducing OneProgram.me</h3>
      <p>
        This website allows scout leaders to register their scout groups, and
        allow their scouts to register on it (so they can track their own
        progress). Leaders can even add scouts to the group themselves, without
        the need for three scout to make an account - for cases where scouts
        could be too young to have internet access.
      </p>
      <p>From the leader dashboard the leader can</p>
      <ul>
        <li>See which scouts have completed each task</li>
        <li>Mark Tasks as done for any given scout</li>
        <li>
          Mark tasks as<u>un</u>done for any given scout
        </li>
        <li>See which scouts have completed a full Skill Level</li>
        <li>Add Scouts to their group</li>
      </ul>
      <img
        className="noshadow"
        src="http://darraghmckay.com/couch/uploads/image/one_prog_desktop.PNG"
      />
      <h3>How it's built</h3>
      <p>
        OneProgram.me is built with bootstrap framework, featuring a completely
        custom design using SASS pre-compiler for CSS. The backend uses PHP to
        communicate with a MySql database.
      </p>
      <h3>Features:</h3>
      <ul>
        <li>Fully Responsive Site</li>
        <li>Group Registration</li>
        <li>User Registration (to specific group - with unique invite code)</li>
        <li>User Login</li>
        <li>
          User Permissions
          <ul>
            <li>A Leader can modify tasks for the entire group.</li>
            <li>
              A Scout can view the scouts in their group but can only update
              their own tasks.
            </li>
            <li>A Guest can only view the group details</li>
          </ul>
        </li>
        <li>Skills and Levels Listing from Database (Large set of data)</li>
        <li>
          Google Maps Integration for Selecting / Displaying Group Location
        </li>
      </ul>
      <img src="http://darraghmckay.com/couch/uploads/image/one_prog_2.PNG" />
      <h3>What I learnt</h3>
      <p>
        I learnt<strong>A LOT</strong>from this project which is still in
        development. However, if I could start over (which I might) I would
        probably re-structure the entire DB differently, and probably use a PHP
        Framework such as<em>Laravel</em>.
      </p>
      <p>
        This was my first project to use Bootstrap too, which I mostly use for
        the Responsive Grid. It was also my first time using SASS which made
        designing in CSS<strong>much</strong>quicker. In fact I haven't gone
        back!
      </p>
      <h3>Aside</h3>
      <p>
        For a while I was actually developing an Android Application that alowed
        scouts to view tasks, sign in and mark tasks as completed, i.e. half the
        functionality of the site. Despite it being almost completed I had to
        stop due to travel and other projects taking priority. Although
        re-writing some methods to return JSON was really quite interesting and
        useful.
      </p>
    </div>
  ),
};
