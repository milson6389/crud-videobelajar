import React from "react";

const Card = (props) => {
  const styleClass = `border border-slate-300 rounded-md shadow-lg p-3 bg-white ${props.className}`;
  return <div className={styleClass}>{props.children}</div>;
};

export default Card;
