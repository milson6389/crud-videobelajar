import { create } from "zustand";
import courseApi from "../services/api/courseApi";

const courseStore = (set, get) => ({
  paidCourse: localStorage.getItem("course")
    ? JSON.parse(localStorage.getItem("course"))
    : [],
  classes: localStorage.getItem("kelas")
    ? JSON.parse(localStorage.getItem("kelas"))
    : [],
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

  getAllCourse: async () => {
    const courseData = await courseApi.getAllCourseList();
    set(() => ({
      classes: courseData,
    }));
  },
  filteredClass: (category) => {
    const courses = get().classes;
    if (category !== "") {
      const filtered = courses.filter((c) => c.category == category);
      set({ classes: filtered });
    }
  },
  resetFilter: () =>
    set({ classes: JSON.parse(localStorage.getItem("kelas")) }),

  addToPaidCourse: async (courseId) => {
    await courseApi.addCourseToPaidCourse(courseId);
  },

  getAllPaidCourse: async () => {
    const paidCourseData = await courseApi.getAllPaidCourse();
    set(() => ({
      paidCourse: paidCourseData,
    }));
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

  resetCourseFilter: () => {
    set({ paidCourse: JSON.parse(localStorage.getItem("course")) });
  },
});

const useCourseStore = create(courseStore);
export default useCourseStore;
