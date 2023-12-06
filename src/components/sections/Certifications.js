import React from "react";
import CredlyBadge from "../elements/CredlyBadge";
import Resume from "../../resume.json";

function buildBadges(certificates) {
  let credlyBadges = [];
  let columnSize = 12 / certificates.length;
  let columnClass = "column has-text-centered is-" + columnSize;
  certificates.forEach((cert, index) => {
    credlyBadges.push(
      <div key={index} className={columnClass}>
        <CredlyBadge
          width="186"
          height="186"
          imageId={cert.x_imageId}
          imageName={cert.x_imageName}
          badgeId={cert.x_badgeId}
          badgeName={cert.name + " by " + cert.issuer}
        />
        <h1><b>{cert.name}</b></h1>
      </div>

    );
  });
  return credlyBadges;
}

function Certifications(props) {
  return (
    <section className="section" id="certifications">
      <div className="container">
        <h1 className="title">Certifications</h1>
        <div className="columns is-centered">
          {buildBadges(Resume.certificates)
          
          }
        </div>
      </div>
    </section>
  );
}

export default Certifications;
