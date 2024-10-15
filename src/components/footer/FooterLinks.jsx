import { useState } from "react";
import { Link } from "react-router-dom";
import FooterLinksMobile from "./FooterLinksMobile";

const FooterLinks = ({ data }) => {
  return (
    <>
      <div className="md:flex hidden gap-5">
        {data.map((dt) => {
          return (
            <ul key={dt.uid}>
              <li className="font-bold">{dt.header}</li>
              {dt.child.map((d, id) => {
                return (
                  <li key={id}>
                    <Link to={d.target}>{d.title}</Link>
                  </li>
                );
              })}
            </ul>
          );
        })}
      </div>
      <div className="flex flex-col md:hidden gap-5">
        <ul className="flex flex-col relative">
          {data.map((dt) => {
            return (
              <li key={dt.uid} className="flex flex-col justify-between my-1">
                <FooterLinksMobile data={dt} />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default FooterLinks;
