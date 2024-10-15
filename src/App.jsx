import { lazy, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./components/layout/Root";
import Public from "./components/layout/Public";
import Private from "./components/layout/Private";
import useCourseStore from "./store/courseStore";
import useTrxStore from "./store/trxStore";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Profile = lazy(() => import("./pages/Profile"));
const Classes = lazy(() => import("./pages/Classes"));
const Orders = lazy(() => import("./pages/Orders"));
const ClassDetail = lazy(() => import("./pages/ClassDetail"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Payment = lazy(() => import("./pages/Payment"));
const Status = lazy(() => import("./pages/Status"));

function App() {
  const getAllCourse = useCourseStore((state) => state.getAllCourse);
  const getAllPaidCourse = useCourseStore((state) => state.getAllPaidCourse);
  const getAllWop = useTrxStore((state) => state.getAllWop);
  const getAllTrx = useTrxStore((state) => state.getAllTrx);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          index: true,
          element: <Home />,
        },
        {
          path: "/login",
          element: (
            <Public>
              <Login />
            </Public>
          ),
        },
        {
          path: "/register",
          element: (
            <Public>
              <Register />
            </Public>
          ),
        },
        {
          path: "/classes/:id",
          element: <ClassDetail />,
        },
        {
          path: "/checkout/:id",
          element: (
            <Private>
              <Checkout />
            </Private>
          ),
        },
        {
          path: "/payment/:id",
          element: (
            <Private>
              <Payment />
            </Private>
          ),
        },
        {
          path: "/status/:id",
          element: (
            <Private>
              <Status />
            </Private>
          ),
        },
        {
          path: "/profile",
          element: (
            <Private>
              <Profile />
            </Private>
          ),
        },
        {
          path: "/classes",
          element: (
            <Private>
              <Classes />
            </Private>
          ),
        },
        {
          path: "/order",
          element: (
            <Private>
              <Orders />
            </Private>
          ),
        },
      ],
    },
  ]);

  useEffect(() => {
    getAllCourse();
    getAllPaidCourse();
    getAllWop();
    getAllTrx();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
