import React from "react";
import VisitorCounter from "../elements/VisitorCounter";
function Footer() {
  
  return (
    <footer className="footer has-background-link">
      <div className="content has-text-centered has-text-white">
        <p>
          Thanks for stopping by. <i class="fa-solid fa-heart"></i>
        </p>
      </div>
      <div className="has-text-white has-text-centered">
      <VisitorCounter />
      </div>
    </footer>
  );
}

export default Footer;
