import React, { useState } from "react";
import Resume from "../../resume.json";
import axios from "axios";

const AboutMe = () => {
  return (
    <section className="section has-background-info-35" id="aboutMe">
      <div className="container has-text-centered">
        <figure className="image container is-180x180">
          <img
            width="180px"
            height="180px"
            src={Resume.basics.picture}
            alt={Resume.basics.name}
            className="is-rounded"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = Resume.basics.x_pictureFallback;
            }}
          />
        </figure>
        <p className="subtitle is-4 has-text-white has-text-weight-bold">
          {Resume.basics.x_title}
        </p>
        <div
          className="subtitle is-5 has-text-white has-text-weight-light"
          dangerouslySetInnerHTML={{ __html: Resume.basics.summary }}
        />
      </div>
    </section>
  );
};

export default AboutMe;
