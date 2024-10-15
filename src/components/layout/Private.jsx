import { Navigate } from "react-router-dom";
import useUserStore from "../../store/userStore";

const Private = (props) => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  return isLoggedIn ? <>{props.children}</> : <Navigate to="/" />;
};

export default Private;
