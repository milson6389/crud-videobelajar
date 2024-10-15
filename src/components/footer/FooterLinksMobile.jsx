import { useState } from "react";
import { Link } from "react-router-dom";

const FooterLinksMobile = ({ data }) => {
  const [toggleShow, setToggleShow] = useState(false);
  const mobileButtonClickHandler = (e) => {
    e.preventDefault();
    setToggleShow(!toggleShow);
  };

  return (
    <>
      <button
        onClick={mobileButtonClickHandler}
        className="flex justify-between items-center w-full"
      >
        <span className="font-bold ">{data.header}</span>
        {toggleShow ? (
          <i className="fa-solid fa-chevron-down"></i>
        ) : (
          <i className="fa-solid fa-greater-than"></i>
        )}
      </button>
      <ul className={`${toggleShow ? "" : "hidden"}`}>
        {data.child.map((d, id) => {
          return (
            <li key={id}>
              <Link to={d.target}>{d.title}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default FooterLinksMobile;
