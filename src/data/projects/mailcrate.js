import React from 'react';
import { WEB_DEVELOPMENT } from '../../constants/blogCategories';
import img from '../../imgs/mailcrate.jpg';
import coverImg from '../../imgs/mailcrate-cover.png';

export default {
  title: 'mailcrate.io',
  subTitle: 'Your mailbox, evolved - Google Inbox revived',
  path: 'mailcrate',
  href: 'https://mailcrate.io',
  img,
  coverImg,
  color: '#549af0',
  createdAt: '2019-09-30',
  category: WEB_DEVELOPMENT,
  body: () => (
    <div>
      <h3>
        <em>
          Inspired by Google Inbox, with evolutionary features that you love,
          and lost
        </em>
      </h3>
      <p>
        Mailcrate was devoped to replace the hole
        <a href="https://www.google.co.uk/inbox/" target="_blank">
          Google Inbox
        </a>
        left in my heart
      </p>
      <p>
        it's a web-app, written with React, that heavily and smartly utilises
        the Gmail API and Google Calendar API to recreate the look, feel and
        features of Google Inbox.
      </p>
      <h4>Crates</h4>
      <p>
        Crates (previously bundles) allow you to group your messages by labels
        and scan them all in their own timeline, all within your inbox. Simply
        specify which of your labels you want to turn into crates.
      </p>
      <img
        alt="Mailcrate timeline"
        className="circle"
        src="https://mailcrate.io/static/media/bundle-timeline.f486186c.png"
      />
      <h4>Bulk Actions</h4>
      <p>
        Forget moving emails around one-by-one. Mark all emails in a crate as
        done, pin them all for later, or even delete them all - just one click
        away.
      </p>
      <img
        alt="Mailcrate bulk actions"
        className="circle"
        src="https://mailcrate.io/static/media/bulk-actions.caef4d9d.png"
      />
      <h4>Timeline</h4>
      <p>
        View your inbox as it happened, where the most recent and most important
        items are on the top, and each crate is viewed as its own timeline -
        allowing you to see what happened when.
      </p>
      <h4>Attachements</h4>
      <p>
        Bringing attachments front and centre. See all attachments in a thread
        from your inbox, and preview most formats before downloading them
      </p>
      <img
        alt="Mailcrate attachments"
        className="circle"
        src="https://mailcrate.io/static/media/attachments.9070117e.png"
      />
      <h4>Event Invites</h4>
      <p>
        See who else has accepted the event invite, respond directly from your
        email and see what other events are happening around it. Because how
        else can you know if you can make it?
      </p>
      <h3>Security and Privacy</h3>
      <p>
        The brilliance of mailcrate is that it's a standalone browser client.
        Which means, your data never leavs your browser. Mailcrate doesn't and
        won't store or process any of your email data on our servers (because we
        don't have any). One you sign out, it's gone.
        <br />
        <br />
        Mailcrate will also never distribute or sell your personal data to
        anyone else - your emails and your privacy are our biggest concern.
      </p>
    </div>
  ),
};
