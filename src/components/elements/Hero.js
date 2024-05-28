import React from "react";
import NavBar from "./NavBar";
import Resume from "../../resume.json";
import App from "./Particle";

function Hero() {
  return (
    <section className="hero is-fullheight is-dark has-bg-image">
      <div className="hero-head">
        <NavBar />
      </div>
      <div><App /></div>
      <div className="hero-body">
        <div className="container">
          <p className="subtitle is-5">Hello, I'm an</p>
          <h1 className="title">{Resume.basics.label}</h1>
          <h2 className="subtitle">
            {Resume.basics.location.region}, {Resume.basics.location.country}
          </h2>
        </div>
      </div>
      <div className="hero-foot" style={{ paddingBottom: "20px" }}>
        <div className="columns is-mobile">
          <div className="column"></div>
          {Resume.basics.profiles.map((value, index) => {
            return (
              <div key={index} className="column has-text-centered pb-4">
                <a
                  href={value.url}
                  target="blank"
                  className="is-hovered"
                  title={value.network}
                >
                  <span className="icon is-medium has-text-primary">
                    <i className={value.x_icon}></i>
                  </span>
                </a>
              </div>
            );
          })}
          <div className="column"></div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
