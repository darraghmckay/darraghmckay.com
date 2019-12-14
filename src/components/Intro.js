import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCode,
  faBicycle,
  faGraduationCap,
} from '@fortawesome/free-solid-svg-icons';
import RectText from './RectText';
import { useInterval } from '../utils/hooks';

const introItems = [
  {
    icon: faGraduationCap,
    title: 'Computer Engineering',
    subTitle: 'Trinity College Dublin',
  },
  {
    icon: faBicycle,
    title: 'Casual Cyclist',
    subTitle: '& Gym-goer',
  },
  {
    icon: faCode,
    title: 'Software Engineer',
    subTitle: 'Hubspot, Dublin',
  },
];

const languages = [
  ['Hi, my name is', 'Darragh', 'I’m an', 'engineer'],
  ['Dia duit,', 'Darragh', ' is anim dom', 'Is innealtóir mé'],
  ['Bonjour, Je m’appelle', 'Darragh', 'Je suis un', 'ingénieur'],
  ['Hola, mi nombre es', 'Darragh', 'Soy un', 'ingeniero'],
  ['Ciao, il mio nome è', 'Darragh', 'Sono un', 'ingegnere'],
  ['こんにちは、私の名前は', 'Darragh', '私は', 'エンジニア'],
  ['Hallo, ich heiße', 'Darragh', 'ich bin ein', 'Ingenieur'],
];

const Intro = () => {
  const [langIndex, setLangIndex] = useState(0);

  useInterval(() => setLangIndex((langIndex + 1) % languages.length), 2000);

  return (
    <React.Fragment>
      <div className="text-center my-12 uppercase inline-block w-full">
        <h1 className="intro-rect leading-none flex flex-col justify-center mx-auto">
          <RectText text={languages[langIndex]} width={400} />
        </h1>
      </div>
      <div className="w-full flex flex-row justify-around my-12 uppercase inline-block">
        {introItems.map(({ icon, subTitle, title }) => (
          <div className="mx-4 text-center" key={title}>
            <FontAwesomeIcon className="my-4" icon={icon} size="8x" />
            <p className="text-xl uppercase">{title}</p>
            <span>{subTitle}</span>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Intro;
