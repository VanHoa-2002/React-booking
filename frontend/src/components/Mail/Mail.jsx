import React from "react";

const Mail = ({ url }) => {
  return (
    <button className="btn">
      <a href={url}>Click me</a>
    </button>
  );
};

export default Mail;
