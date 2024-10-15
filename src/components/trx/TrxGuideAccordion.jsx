import { useState } from "react";
import Card from "../ui/Card";

const TrxGuideAccordion = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const setIsOpenHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Card className="mb-3">
      <div className="flex justify-between items-center my-2">
        <h1 className="text-black font-bold">{data.title}</h1>
        <button onClick={setIsOpenHandler}>
          {isOpen ? (
            <i className="fa-solid fa-chevron-up"></i>
          ) : (
            <i className="fa-solid fa-chevron-down"></i>
          )}
        </button>
      </div>
      <ul>
        {isOpen &&
          data.desc.map((dt, id) => {
            return <li key={id}>{dt}</li>;
          })}
      </ul>
    </Card>
  );
};

export default TrxGuideAccordion;
