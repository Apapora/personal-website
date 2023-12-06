import React from "react";

function CredlyBadge(props) {
  let imgSrc =
    "https://images.credly.com/size/" + props.width + "x" + props.height;
  imgSrc += "/images/" + props.imageId + "/" + props.imageName;
  return (
    <figure className="is-inline-block image">
        <img src={imgSrc} alt={props.badgeName} />
    </figure>
  );
}

export default CredlyBadge;
