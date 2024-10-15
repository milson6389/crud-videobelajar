import { create } from "zustand";
import axios from "../axios";

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
    try {
      const apiResponse = await axios.get("/kelas");
      localStorage.setItem("kelas", JSON.stringify(apiResponse.data.data));
      set(() => ({
        classes: apiResponse.data.data,
      }));
    } catch (error) {
      console.log(error);
    }
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
    if (localStorage.getItem("user")) {
      const userInfo = JSON.parse(localStorage.getItem("user"));
      const courseData = {
        courseId: courseId,
        userId: userInfo.email,
      };
      try {
        await axios.post("/course", courseData);
      } catch (error) {
        console.log(error);
      }
    }
  },

  getAllPaidCourse: async () => {
    if (localStorage.getItem("user")) {
      const userInfo = JSON.parse(localStorage.getItem("user"));
      try {
        const apiResponse = await axios.get(`/course/${userInfo.email}`);
        localStorage.setItem("course", JSON.stringify(apiResponse.data.data));
        set(() => ({
          paidCourse: apiResponse.data.data,
        }));
      } catch (error) {
        console.log(error);
      }
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

  resetCourseFilter: () => {
    set({ paidCourse: JSON.parse(localStorage.getItem("course")) });
  },
});

const useCourseStore = create(courseStore);
export default useCourseStore;
