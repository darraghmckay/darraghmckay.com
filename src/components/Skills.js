import React from 'react';
import experienceList from '../data/experience/work';
import skillsList from '../data/experience/skills';

const Experience = ({ title, subTitle, dateRange }) => (
  <div className="skill-item w-full pl-4 my-3">
    <span className="text-lg mb-0 w-full font-medium block">{title}</span>
    <small className="text-sm mr-4 flex flex-row justify-between">
      <span>{subTitle}</span>
      <span className="ml-2"> {dateRange}</span>
    </small>
  </div>
);

const Skill = ({ name, percentage }) => {
  return (
    <div className="skill-item w-full pl-4 my-3">
      <span className="text-lg mb-0 w-full font-medium block">{name}</span>
      <div className="w-full mt-1 skill-percentage">
        <div style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
};

const Skills = () => {
  return (
    <div className="w-full inline-block py-8 skills" id="experience">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center">Experience</h2>
        <div className="w-full block flex flex-row flex-wrap px-8">
          <div className="my-4 w-full sm:w-1/2">
            <h3>Education</h3>
            <Experience
              title="Engineering (M.A.I)"
              subTitle="Trinity College Dublin"
              dateRange="2013 - 2018"
            />
            <Experience
              title="Leaving Certificate - 605 Points"
              subTitle="Presentation College Bray"
              dateRange="2007 - 2013"
            />
            <h3 className="mt-6">Experience</h3>
            {experienceList.map(experience => (
              <Experience key={experience.title} {...experience} />
            ))}
          </div>
          <div className="my-4 w-full sm:w-1/2">
            <h3>What I use </h3>
            {skillsList.map(skill => (
              <Skill key={skill.name} {...skill} />
            ))}
          </div>
        </div>
        <div className="mt-8 w-full flex flex-row justify-center">
          <button className="light">Download CV</button>
        </div>
      </div>
    </div>
  );
};

export default Skills;
