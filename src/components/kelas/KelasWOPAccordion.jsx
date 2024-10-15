import { useState } from "react";
import Card from "../ui/Card";
import useTrxStore from "../../store/trxStore";

const KelasWOPAccordion = ({ data }) => {
  const selectedWOP = useTrxStore((state) => state.selectedWOP.code);
  const setSelectedWOP = useTrxStore((state) => state.setSelectedWOP);
  const [isOpen, setIsOpen] = useState(true);

  const setIsOpenHandler = () => {
    setIsOpen(!isOpen);
  };

  const setSelectedHandler = (wopObj) => {
    setSelectedWOP(wopObj);
  };

  return (
    <>
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
          data.sub.map((dt, id) => {
            return (
              <li key={id} onClick={() => setSelectedHandler(dt)}>
                <Card className="flex justify-between items-center my-1">
                  <span className="flex items-center gap-5 font-bold">
                    <img
                      src={dt.img}
                      alt={dt.title}
                      className="w-[50px] h-12 object-contain"
                      loading="lazy"
                    />
                    {dt.title}
                  </span>
                  {selectedWOP == dt.code && (
                    <i className="fa-regular fa-circle-check text-red-500"></i>
                  )}
                </Card>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default KelasWOPAccordion;
