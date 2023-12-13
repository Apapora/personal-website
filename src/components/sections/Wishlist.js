import React from "react";
import Resume from "../../resume.json";
import Skill from "../elements/Skill"


function buildSkillsRow(skills, start, end) {
  const batch = skills.slice(start, end);
  let skillsComponents = [];
  batch.forEach((value, indx) => {
    const link = value.x_description ? <a href={value.x_description} target="_blank" rel="noopener noreferrer">{value.x_description}</a> : null;

    skillsComponents.push(
      <div key={indx} className="column is-3">
        <Skill
          text={value.name}
          icon={value.x_icon}
          description={link}
        />
      </div>
    )
  });
  return skillsComponents;
}

function Skills() {
  return (
    <section className="section" id="wishlist">
      <div className="container">
        <h1 className="title">Xmas Wishlist</h1>
        <div className="columns">
          {buildSkillsRow(Resume.wishlist, 0, 4)}
        </div>
        <div className="columns">
          {buildSkillsRow(Resume.wishlist, 4, 8)}
        </div>
      </div>
    </section>
  );
}

export default Skills;
