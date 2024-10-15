import useCourseStore from "../../store/courseStore";
import CourseListItem from "./CourseListItem";

const CourseList = () => {
  const allPaidClass = useCourseStore((state) => state.paidCourse);

  return (
    <div className="md:m-2">
      {allPaidClass.length > 0 &&
        allPaidClass.map((cls) => {
          return <CourseListItem key={cls.id} data={cls} />;
        })}
    </div>
  );
};

export default CourseList;
