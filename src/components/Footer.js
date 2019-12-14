import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faCodepen, faLinkedin, faTwitter  } from '@fortawesome/free-brands-svg-icons';

const Footer = () => (
  <div className="w-full footer">
    <div className="lg:max-w-2xl mx-auto py-8 flex flex-row flex-wrap justify-between">
      <div className="flex flex-col">
        <div className="flex flex-row items-center my-2">
        <FontAwesomeIcon className="mr-3 text-2xl" icon={faEnvelope} color="white"/>
        <span>darraghmckay@gmail.com</span>
        </div>
         <div className="flex flex-row items-center my-2">
        <FontAwesomeIcon className="mr-3 text-2xl" icon={faTwitter} color="white"/>
        <a href="https://twitter.com/darraghmckay">@darraghmckay</a>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row items-center my-2">
          <FontAwesomeIcon className="mr-3 text-2xl" icon={faCodepen} color="white"/>
          <a href="https://copdepen.io/darraghmckay">copdepen.io/darraghmckay</a>
        </div>
        <div className="flex flex-row items-center my-2">
        <FontAwesomeIcon className="mr-3 text-2xl" icon={faLinkedin} color="white"/>
          <a href="https://www.linkedin.com/in/darraghmckay/">in/darraghmckay</a>
        </div>
      </div>      
    </div>
  </div>
);

export default Footer;