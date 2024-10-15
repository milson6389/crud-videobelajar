import { useState } from "react";
import Card from "../ui/Card";

const KelasAccordion = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const setIsOpenHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="flex justify-between items-center my-2">
        <h1 className="text-primary font-bold">{data.title}</h1>
        <button onClick={setIsOpenHandler}>
          {isOpen ? (
            <i className="fa-solid fa-chevron-up"></i>
          ) : (
            <i className="fa-solid fa-chevron-down"></i>
          )}
        </button>
      </div>
      {isOpen && (
        <ul>
          {data.sub_material.map((dt, id) => {
            return (
              <li key={id}>
                <Card className="flex justify-between items-center my-1">
                  <span className="font-bold">{dt.title}</span>
                  <div className="flex items-center text-slate-500">
                    <span className="mx-1">
                      <i className="fa-solid fa-circle-play mx-1"></i>
                      Video
                    </span>
                    <span className="mx-1">
                      <i className="fa-regular fa-clock mx-1"></i>
                      {dt.duration} Menit
                    </span>
                  </div>
                </Card>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default KelasAccordion;
