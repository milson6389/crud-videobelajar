import { useState } from "react";
import Footer from "../components/layout/Footer";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import DashboardFilter from "../components/dashboard/DashboardFilter";
import Card from "../components/ui/Card";
import CourseList from "../components/course/CourseList";
import useCourseStore from "../store/courseStore";

const Classes = () => {
  const resetCourseFilter = useCourseStore((state) => state.resetCourseFilter);
  const filterCourse = useCourseStore((state) => state.filteredCourse);
  const [query, setQuery] = useState("");
  const navLinks = [
    {
      id: 1,
      title: "Semua Kelas",
      code: "",
    },
    {
      id: 2,
      title: "Sedang Berjalan",
      code: "INP",
    },
    {
      id: 3,
      title: "Selesai",
      code: "DONE",
    },
  ];

  const setQueryHandler = (keyword) => {
    setQuery(keyword);
    resetCourseFilter();
    filterCourse(keyword);
  };
  return (
    <>
      <main className="m-5 p-5">
        <div className="flex flex-col md:flex-row w-full gap-5 md:gap-20">
          <DashboardNavbar />
          <Card className="w-full">
            <DashboardFilter
              navData={navLinks}
              queries={setQueryHandler}
              isCategoryFilterOn={false}
            />
            <CourseList />
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Classes;
