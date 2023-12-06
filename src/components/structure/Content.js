import React from "react";
import AboutMe from "../sections/AboutMe";
import Skills from "../sections/Skills";
import Certifications from "../sections/Certifications";
import Experience from "../sections/Experience";
import Wishlist from "../sections/Wishlist";

function Content() {
  return (
    <main>
      <AboutMe />
      <Skills />
      <Certifications />
      <Experience />
      <Wishlist />
    </main>
  );
}

export default Content;
