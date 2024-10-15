import { create } from "zustand";

import DataKelas from "../data/kelas.json";
import DataKelasDetail from "../data/kelasMaterials.json";

const courseStore = (set, get) => ({
  paidCourse: localStorage.getItem("course")
    ? JSON.parse(localStorage.getItem("course"))
    : [],
  classes: DataKelas,
  classDetail: DataKelasDetail,
  classPackage: [
    {
      id: 1,
      content: (
        <>
          <i className="fa-regular fa-file"></i>
          Ujian Akhir
        </>
      ),
    },
    {
      id: 2,
      content: (
        <>
          <i className="fa-solid fa-video"></i>
          49 Video
        </>
      ),
    },
    {
      id: 3,
      content: (
        <>
          <i className="fa-regular fa-file-word"></i>7 Dokumen
        </>
      ),
    },
    {
      id: 4,
      content: (
        <>
          <i className="fa-regular fa-newspaper"></i>
          Sertifikat
        </>
      ),
    },
    {
      id: 5,
      content: (
        <>
          <i className="fa-regular fa-pen-to-square"></i>
          Pretest
        </>
      ),
    },
  ],
  filteredClass: (category) => {
    const courses = get().classes;
    if (category !== "") {
      const filtered = courses.filter((c) => c.category == category);
      set({ classes: filtered });
    }
  },
  filteredCourse: (keyword) => {
    const courses = get().paidCourse;
    if (keyword !== "") {
      const filtered = courses.filter((c) =>
        c.title.toLowerCase().includes(keyword.toLowerCase())
      );
      set({ paidCourse: filtered });
    }
  },
  resetFilter: () => set({ classes: DataKelas }),
  setPaidClassList: (arrKelasId) => {
    const allClasses = get().classes;
    const temp = allClasses.filter((x) => arrKelasId.includes(x.id.toString()));
    localStorage.setItem("course", JSON.stringify([...new Set(temp)]));
    set(() => ({ paidCourse: [...new Set(temp)] }));
  },
  addCourse: (kelas_id) => {
    const allClasses = get().classes;
    const existingCourse = get().paidCourse;
    const kelas = allClasses.find((cls) => cls.id == kelas_id);
    if (existingCourse.length == 0) {
      const temp = [];
      temp.push(kelas);
      localStorage.setItem("course", JSON.stringify(temp));
      set((state) => ({
        paidCourse: [...state.paidCourse, ...temp],
      }));
    } else {
      const temp2 = JSON.parse(localStorage.getItem("course"));
      temp2.push(kelas);
      localStorage.setItem("course", JSON.stringify(temp2));

      set((state) => ({
        paidCourse: [...state.paidCourse, kelas],
      }));
    }
  },
  resetCourseFilter: () => {
    const data = localStorage.getItem("course")
      ? JSON.parse(localStorage.getItem("course"))
      : [];
    set(() => ({
      paidCourse: data,
    }));
  },
});

const useCourseStore = create(courseStore);
export default useCourseStore;
