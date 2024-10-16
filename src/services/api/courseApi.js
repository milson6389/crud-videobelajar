import axios from "../../axios";

const addCourseToPaidCourse = async (courseId) => {
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
};

const getAllCourseList = async () => {
  try {
    const apiResponse = await axios.get("/kelas");
    localStorage.setItem("kelas", JSON.stringify(apiResponse.data.data));
    return apiResponse.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getAllPaidCourse = async () => {
  if (localStorage.getItem("user")) {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    try {
      const apiResponse = await axios.get(`/course/${userInfo.email}`);
      localStorage.setItem("course", JSON.stringify(apiResponse.data.data));
      return apiResponse.data.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
};

export default {
  addCourseToPaidCourse,
  getAllCourseList,
  getAllPaidCourse,
};
