import { useState } from "react";
import { Link } from "react-router-dom";
import KelasList from "./KelasList";
import useCourseStore from "../../store/courseStore";

const Kelas = () => {
  const navLinks = [
    {
      id: 1,
      title: "Semua Kelas",
      target: "#all",
      category: "",
    },
    {
      id: 2,
      title: "Pemasaran",
      target: "#mkt",
      category: "Pemasaran",
    },
    {
      id: 3,
      title: "Desain",
      target: "#dsg",
      category: "Desain",
    },
    {
      id: 4,
      title: "Pengembangan Diri",
      target: "#sdv",
      category: "Development",
    },
    {
      id: 5,
      title: "Bisnis",
      target: "#biz",
      category: "Bisnis",
    },
  ];

  const dataKelas = useCourseStore((state) => state.classes);
  const filterKelas = useCourseStore((state) => state.filteredClass);
  const resetFilter = useCourseStore((state) => state.resetFilter);

  const [activeIdx, setActiveIdx] = useState(1);
  const setActiveHandler = (id, ctg = "") => {
    setActiveIdx(id);
    resetFilter();
    filterKelas(ctg);
  };

  return (
    <div className="my-10">
      <h1 className="text-3xl font-bold">
        Koleksi Video Pembelajaran Unggulan
      </h1>
      <p className="text-sm">
        Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!
      </p>
      <div className="mt-5">
        <ul className="flex text-nowrap overflow-x-auto justify-start items-center gap-3">
          {navLinks.map((link) => {
            return (
              <Link
                onClick={() => setActiveHandler(link.id, link.category)}
                key={link.id}
                to={link.target}
                className={`${
                  link.id === activeIdx
                    ? "text-secondary font-bold border-b-secondary border-b-2"
                    : "text-black"
                }`}
              >
                {link.title}
              </Link>
            );
          })}
        </ul>
        <KelasList data={dataKelas} />
      </div>
    </div>
  );
};

export default Kelas;
