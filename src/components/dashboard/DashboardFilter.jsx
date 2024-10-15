import { useRef, useState } from "react";

const DashboardFilter = ({
  navData,
  queries,
  categories,
  isCategoryFilterOn = true,
}) => {
  const search = useRef();
  const [activeIdx, setActiveIdx] = useState(1);
  const setActiveHandler = (id, code = "") => {
    setActiveIdx(id);
    if (isCategoryFilterOn) {
      categories(code);
    }
  };
  const userInputHandler = () => {
    queries(search.current.value);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="m-2 w-full md:w-3/4">
          <ul className="flex text-nowrap overflow-x-auto justify-start items-center gap-3">
            {navData.map((link) => {
              return (
                <button
                  onClick={() => setActiveHandler(link.id, link.code)}
                  key={link.id}
                  to={link.target}
                  className={`${
                    link.id === activeIdx
                      ? "text-secondary font-bold border-b-secondary border-b-2"
                      : "text-black"
                  }`}
                >
                  {link.title}
                </button>
              );
            })}
          </ul>
        </div>
        <div className="m-2 w-full md:w-1/4">
          <input
            type="text"
            ref={search}
            onChange={userInputHandler}
            className="border border-slate-300 rounded-md h-8 w-full p-2"
          />
        </div>
      </div>
    </>
  );
};

export default DashboardFilter;
