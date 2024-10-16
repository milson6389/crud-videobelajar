import { Fragment, Suspense } from "react";
import { Outlet } from "react-router-dom";

import NavBar from "./NavBar";
import Spinner from "../ui/Spinner";
import useCourseStore from "../../store/courseStore";

const Root = () => {
  return (
    <Fragment>
      <NavBar />
      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
    </Fragment>
  );
};

export default Root;
